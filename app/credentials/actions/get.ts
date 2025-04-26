"use server";

import { prisma } from "@/config/prisma";

export const getCredentialProviders = async () => {
  return prisma.credentialProvider.findMany({});
};
