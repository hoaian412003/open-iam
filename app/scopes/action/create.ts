'use server';

import { prisma } from "@/config/prisma";


export const createScope = async (data: any) => {
  return prisma.scope.create(data);
}
