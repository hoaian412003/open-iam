"use server";

import { prisma } from "@/config/prisma";

export const editCredentail = async (id: string, data: any) => {
  return prisma.credentialProvider.update({
    where: { id },
    data
  });
};
