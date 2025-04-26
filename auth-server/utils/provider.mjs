import { PrismaClient } from "@prisma/client";
import { AuthorizationCode } from 'simple-oauth2';


export const getProvider = async (name = "") => {

  const prisma = new PrismaClient();
  const credentialProvider = await prisma.credentialProvider.findFirst({
    where: {
      name
    }
  })
  if (!credentialProvider) throw new Error("Not found credential provider");
  const config = {
    client: {
      id: credentialProvider.clientId,
      secret: credentialProvider.clientSecret
    },
    auth: {
      tokenHost: credentialProvider.tokenUrl,
      authorizePath: credentialProvider.authorizeUrl,
      tokenPath: credentialProvider.tokenUrl,
    },
  }

  return { client: new AuthorizationCode(config), provider: credentialProvider };
}
