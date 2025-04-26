"use server";

import { prisma } from "@/config/prisma";

export const Login = async (username: string, password: string) => {
  return await prisma.user.findFirst({
    where: {
      username,
      password,
    },
  });
};
