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
    // rpInitiatedLogout: {
    //   enabled: true,
    //   async logoutSource(ctx, form) {
    //     return `<!DOCTYPE html>
    //     <html>
    //     <head>
    //       <title>Logout Request</title>
    //       <style>/* css and html classes omitted for brevity, see lib/helpers/defaults.js */</style>
    //     </head>
    //     <body>
    //       <div>
    //         <h1>Do you want to sign-out from ${ctx.host}?</h1>
    //         ${form}
    //         <button autofocus type="submit" form="op.logoutForm" value="yes" name="logout">Yes, sign me out</button>
    //         <button type="submit" form="op.logoutForm">No, stay signed in</button>
    //       </div>
    //     </body>
    //     </html>`
    //   },
    //   async postLogoutSuccessSource(ctx) {
    //     console.log(ctx)
    //     // @param ctx - koa request context
    //     const display = ctx.oidc.client?.clientName || ctx.oidc.client?.clientId;
    //     ctx.body = `<!DOCTYPE html>
    //       <html>
    //       <head>
    //         <title>Sign-out Success</title>
    //         <style>/* css and html classes omitted for brevity, see lib/helpers/defaults.js */</style>
    //       </head>
    //       <body>
    //         <div>
    //           <h1>Sign-out Success</h1>
    //           <p>Your sign-out ${display ? `with ${display}` : ''} was successful.</p>
    //         </div>
    //       </body>
    //       </html>`;
    //   }
    // }
  },
  pkce: {
    required: () => false,
  },
  findAccount: async (ctx, id, token) => {
    const user = await prisma.user.findUnique({
      where: { username: id },
      include: { profile: true },
    });

    return {
      accountId: id,
      async claims(use, scope, claims, rejected) {
        return {
          sub: user.username,
          name: user.profile?.name,
          email: user.email,
          roles: ['admin', 'user'],
          permissions: ['read', 'write'],
          picture: user.profile?.avatar,
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
      'picture',
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
      const { code, userNameField } = req.body;

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

      const username = oauthUser[userNameField];

      let user = await prisma.user.findFirst({
        where: {
          username
        }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            username
          }
        })
      }

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
