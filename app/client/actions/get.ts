"use server";

import { prisma } from "@/config/prisma";
import { Client } from "@/types/client";

export const getClients = async () => {
  const oidcResources = await prisma.oidcModel.findMany({
    where: {
      type: "Client",
    },
  });

  const clients: Array<Client> = oidcResources.map((oidcResource: any) => {
    return oidcResource.payload as Client;
  });

  return clients;
};

export const getClient = async (id: string) => {
  const oidcResource = await prisma.oidcModel.findFirst({
    where: {
      id,
      type: "Client",
    },
  });

  const client = oidcResource?.payload as Client;

  return client;
};
