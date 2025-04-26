import { CredentialProvider } from "@prisma/client";

export const getAuthUrl = (provider: CredentialProvider, state: string) => {
  const url = new URL(provider.authorizeUrl);

  url.searchParams.set("client_id", provider.clientId);
  url.searchParams.set("redirect_uri", provider.callbackUrl);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", provider.scope);
  url.searchParams.set("state", state);

  return url.toString();
};
