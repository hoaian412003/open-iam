'use server';

import { prisma } from "@/config/prisma"

export const updateScope = async (where: any, data: any) => {
  return prisma.scope.updateMany({
    where,
    data
  })
}
