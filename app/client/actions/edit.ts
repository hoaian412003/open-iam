"use server";

import { prisma } from "@/config/prisma";

export const updateClient = async (id: string, data: any) => {
  // return prisma.oidcModel.create({ data: { id: data.client_id, type: 'Client', payload: data } });
  return prisma.oidcModel.update({
    where: {
      id_type: {
        id,
        type: "Client",
      },
    },
    data: {
      id: data.client_id,
      payload: data,
    },
  });
};
