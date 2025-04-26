"use server";

import { prisma } from "@/config/prisma";

export const editCredentail = async (id: string, data: any) => {
  console.log(id, data);
  return prisma.credentialProvider.update({
    where: { id },
    data
  });
};
