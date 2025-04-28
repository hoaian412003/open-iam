// lib/oidc.ts
import { Provider } from "oidc-provider";
import { PrismaClient } from "@prisma/client";
import { host } from "@/utils/host";

const prisma = new PrismaClient();

class PrismaAdapter {
  constructor() { }

  async find(id: string) {
    const client = await prisma.client.findUnique({
      where: { clientId: id },
    });

    if (!client) return undefined;

    return {
      client_id: client.clientId,
      client_secret: client.clientSecret,
      redirect_uris: client.redirectUris,
      grant_types: client.grantTypes,
      response_types: client.responseTypes,
    };
  }

  async upsert() { }
  async destroy() { }
  async consume() { }
  async findByUserCode() { }
  async findByUid() { }
}

const configuration = {
  adapter: PrismaAdapter,
  features: {
    devInteractions: { enabled: false },
  },
  pkce: {
    required: () => false,
  },
  findAccount: async (ctx: any, id: any) => ({
    accountId: id,
    async claims() {
      return { sub: id, name: "Demo User" };
    },
  }),
};

export const oidc = new Provider(host, configuration as any);
