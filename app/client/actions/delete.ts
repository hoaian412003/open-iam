"use server";

import { prisma } from "@/config/prisma";

export const deleteClient = async (id: string) => {
  return prisma.oidcModel.deleteMany({
    where: {
      id,
      type: "Client",
    },
  });
};
