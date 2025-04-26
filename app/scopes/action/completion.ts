'use server';

import { prisma } from "@/config/prisma";
import { ask } from "@/utils/ai";
import { z } from "zod";

export const completionScope = async (group: string) => {
  const response = z.object({
    name: z.string()
  });
  const { results } = await ask(
    `Give me all field of user info can response when login with ${group}`, response
  );
  await Promise.all(results.map((name: string) => {
    return prisma.scope.upsert({
      where: {
        name_group: {
          name,
          group
        }
      },
      update: {},
      create: {
        group,
        name
      }
    })
  }))
  return prisma.scope.findMany({
    where: {
      group
    }
  })
}
