import express from 'express';
import next from 'next';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { Provider } from 'oidc-provider';
import { PrismaAdapter } from './adapter/adapter.mjs';
import { getProvider } from './utils/provider.mjs';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const prisma = new PrismaClient();

const configuration = {
  adapter: PrismaAdapter,
  features: {
    devInteractions: { enabled: false },
    introspection: { enabled: true },
    revocation: { enabled: true },
    backchannelLogout: {
      enabled: true
    }
  },
  pkce: {
    required: () => false,
  },
  findAccount: async (ctx, id, token) => {
    const user = await prisma.user.findUnique({
      where: { username: id },
    });

    return {
      accountId: id,
      async claims(use, scope, claims, rejected) {
        return {
          sub: user.username,
          name: user.profile.name,
          email: user.profile.email,
          roles: ['admin', 'user'],
          permissions: ['read', 'write'],
          avatar: user.profile.avatar,
        };
      },
    };
  },
  claims: {
    address: ['address'],
    email: ['email', 'email_verified'],
    phone: ['phone_number', 'phone_number_verified'],
    profile: [
      'birthdate',
      'family_name',
      'gender',
      'given_name',
      'locale',
      'middle_name',
      'name',
      'nickname',
      'avatar',
      'preferred_username',
      'profile',
      'updated_at',
      'website',
      'zoneinfo',
    ],
    policy: ['roles', 'permissions']
  },
};

app.prepare().then(async () => {
  const server = express();

  server.use(['/oidc', '/interaction'], cookieParser());
  server.use(['/oidc', '/interaction'], bodyParser.urlencoded({ extended: false }));
  server.use(['/oidc', '/interaction'], bodyParser.json());


  const oidc = new Provider('http://localhost:3000/oidc', configuration);

  oidc.on('server_error', (ctx, error) => {
    console.error('OIDC server error', error);
  });

  server.use('/oidc', oidc.callback());

  server.post('/interaction/:uid/confirm', async (req, res) => {
    const interactionDetails = await oidc.interactionDetails(req, res);
    const { prompt: { name, details }, params, session: { accountId } } = interactionDetails;

    if (name !== 'consent') {
      throw new Error("Invalid interaction");
    }

    let { grantId } = interactionDetails;
    let grant;

    if (grantId) {
      grant = await oidc.Grant.find(grantId);
    } else {
      grant = new oidc.Grant({
        accountId,
        clientId: params.client_id,
      });
    }

    if (details.missingOIDCScope) {
      grant.addOIDCScope(details.missingOIDCScope.join(' '));
    }
    if (details.missingOIDCClaims) {
      grant.addOIDCClaims(details.missingOIDCClaims);
    }
    if (details.missingResourceScopes) {
      for (const [indicator, scopes] of Object.entries(details.missingResourceScopes)) {
        grant.addResourceScope(indicator, scopes.join(' '));
      }
    }

    grantId = await grant.save();

    const consent = {};
    if (!interactionDetails.grantId) {
      consent.grantId = grantId;
    }

    const result = { consent };
    await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: true });
  });


  // NOTE: Handle login with multiple provider
  server.post(`/interaction/:uid/:provider`, async (req, res) => {
    const { provider, uid } = req.params;

    const interactionDetails = await oidc.interactionDetails(req, res);
    const { prompt: { name } } = interactionDetails;

    if (name !== 'login') {
      throw new Error("Invalid interaction");
    }

    if (provider === 'password') {
      const { username, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          username, password
        }
      })
      if (!user) throw new Error("Invalid account");
      const result = {
        login: {
          accountId: user.username,
          remember: true
        }
      }
      await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    } else {
      const { provider } = req.params;
      const { client, provider: config } = await getProvider(provider);
      const { code } = req.body;

      const option = {
        code,
        redirect_uri: `http://localhost:3000/interaction/callback/${provider}`,
        scope: config.scope
      };

      const { token } = await client.getToken(option);
      const oauthUser = await axios.get(config.userInfoUrl, {
        headers: {
          Authorization: `Bearer ${token.access_token}`
        }
      }).then(res => res.data).catch(error => {
        console.log(error);
      })

      const userNameFields = await prisma.scope.findMany({
        where: {
          group: provider,
          outputs: {
            has: 'username'
          }
        }
      });
      let username = '';

      userNameFields.map(({ name }) => {
        username = username || oauthUser[name];
      })

      let profile = {};
      const fields = await prisma.scope.findMany({
        where: {
          group: provider,
        }
      })

      fields.map(({ name, outputs }) => {
        outputs.map((output) => {
          profile[output] = profile[output] || oauthUser[name];
        })
      })

      let user = await prisma.user.findFirst({
        where: {
          username
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            username,
            profile
          }
        })
      }

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          profile: {
            ...user.profile,
            ...profile
          }
        }
      })

      const result = {
        login: {
          accountId: user.username,
          remember: false,
        },
      };

      await oidc.interactionFinished(req, res, result, { mergeWithLastSubmission: false });
    }
  })


  server.all('/{*any}', (req, res) => handle(req, res));

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
    console.log('> OIDC issuer: http://localhost:3000/oidc');
  });
});
