"use server";

import { redirect } from "next/navigation";
import { AuthorizationCode } from "simple-oauth2";

import { prisma } from "@/config/prisma";

export const getOauthProvider = async (name: string) => {
  const credentialProvider = await prisma.credentialProvider.findFirst({
    where: { name },
  });

  if (!credentialProvider) throw new Error("Not found credential");

  const config = {
    client: {
      id: credentialProvider.clientId,
      secret: credentialProvider.clientSecret,
    },
    auth: {
      tokenHost: credentialProvider.tokenUrl,
      authorizePath: credentialProvider.authorizeUrl,
      tokenPath: credentialProvider.tokenUrl,
    },
  };

  return {
    client: new AuthorizationCode(config),
    config: credentialProvider,
  };
};

export const oauthLogin = async (name: string, state: string) => {
  const { client, config } = await getOauthProvider(name);

  const authorizationUri = client.authorizeURL({
    redirect_uri: `http://localhost:3000/interaction/callback/${name}`,
    scope: config.scope,
    state,
  });

  redirect(authorizationUri);
};
