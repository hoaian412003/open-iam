import { prisma } from "@/config/prisma"

export const getScopes = () => {
  return prisma.scope.findMany();
}
