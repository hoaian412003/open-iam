"use server";

import { prisma } from "@/config/prisma";

export const createCredential = async (data: any) => {
  return prisma.credentialProvider.create({ data });
};
