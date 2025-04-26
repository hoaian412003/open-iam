import { prisma } from "@/config/prisma";
import { prepareDocument } from "@/utils/prepareDocument";

export const getInteraction = async (id: string) => {
  const interaction = await prisma.oidcModel.findFirst({
    where: {
      id,
      type: "Interaction",
    },
  });

  return prepareDocument(interaction);
};

export const getClient = async (id: string) => {
  const client = await prisma.oidcModel.findFirst({
    where: {
      id,
      type: "Client",
    },
  });

  return prepareDocument(client);
};

export const getSession = async (uid: string) => {
  const session = await prisma.oidcModel.findFirst({
    where: {
      uid,
      type: "Session",
    },
  });

  return prepareDocument(session);
};
