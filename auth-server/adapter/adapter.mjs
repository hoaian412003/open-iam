import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const types = [
  "Session",
  "AccessToken",
  "AuthorizationCode",
  "RefreshToken",
  "DeviceCode",
  "ClientCredentials",
  "Client",
  "InitialAccessToken",
  "RegistrationAccessToken",
  "Interaction",
  "ReplayDetection",
  "PushedAuthorizationRequest",
  "Grant",
  "BackchannelAuthenticationRequest",
].reduce((map, name, i) => {
  map[name] = i + 1;
  return map;
}, {});

const prepare = (doc) => {
  const isPayloadJson =
    doc.payload &&
    typeof doc.payload === "object" &&
    !Array.isArray(doc.payload);

  const payload = isPayloadJson ? doc.payload : {};

  return {
    ...payload,
    ...(doc.consumedAt ? { consumed: true } : undefined),
  };
};

const expiresAt = (expiresIn) =>
  expiresIn ? new Date(Date.now() + expiresIn * 1000) : null;

export class PrismaAdapter {
  constructor(name) {
    this.type = name;
  }

  async upsert(id, payload, expiresIn) {
    const data = {
      type: this.type,
      payload,
      grantId: payload.grantId,
      userCode: payload.userCode,
      uid: payload.uid,
      expiresAt: expiresAt(expiresIn),
    };

    await prisma.oidcModel.upsert({
      where: {
        id_type: {
          id,
          type: this.type,
        },
      },
      update: {
        ...data,
      },
      create: {
        id,
        ...data,
      },
    });
  }

  async find(id) {
    const doc = await prisma.oidcModel.findUnique({
      where: {
        id_type: {
          id,
          type: this.type,
        },
      },
    });

    if (!doc || (doc.expiresAt && doc.expiresAt < new Date())) {
      return undefined;
    }


    return prepare(doc);
  }

  async findByUserCode(userCode) {
    const doc = await prisma.oidcModel.findFirst({
      where: {
        userCode,
      },
    });

    if (!doc || (doc.expiresAt && doc.expiresAt < new Date())) {
      return undefined;
    }

    return prepare(doc);
  }

  async findByUid(uid) {
    const doc = await prisma.oidcModel.findUnique({
      where: {
        uid,
      },
    });

    if (!doc || (doc.expiresAt && doc.expiresAt < new Date())) {
      return undefined;
    }

    return prepare(doc);
  }

  async consume(id) {
    await prisma.oidcModel.update({
      where: {
        id_type: {
          id,
          type: this.type,
        },
      },
      data: {
        consumedAt: new Date(),
      },
    });
  }

  async destroy(id) {
    await prisma.oidcModel.delete({
      where: {
        id_type: {
          id,
          type: this.type,
        },
      },
    });
  }

  async revokeByGrantId(grantId) {
    await prisma.oidcModel.deleteMany({
      where: {
        grantId,
      },
    });
  }
}
