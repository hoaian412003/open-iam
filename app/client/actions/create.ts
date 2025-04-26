"use server";

import { prisma } from "@/config/prisma";

export const createClient = async (data: any) => {
  return prisma.oidcModel.create({
    data: { id: data.client_id, type: "Client", payload: data },
  });
};
