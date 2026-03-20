import { prisma } from "@/lib/db";
import { createTRPCRouter, orgProcedure } from "../init";
import * as z from "zod";
import { TRPCError } from "@trpc/server";
import { deleteAudio } from "@/lib/b2";

export const voicesRouter = createTRPCRouter({
  getAll: orgProcedure
    .input(
      z
        .object({
          query: z.string().trim().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const searchFilter = input?.query
        ? {
            OR: [
              {
                name: {
                  contains: input.query,
                  mode: "insensitive" as const,
                },
              },
              {
                description: {
                  contains: input.query,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {};

      const [custom, system] = await Promise.all([
        prisma.voice.findMany({
          where: {
            variant: "CUSTOM",
            orgId: ctx.orgId,
            ...searchFilter,
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            name: true,
            description: true,
            variant: true,
            language: true,
            category: true,
          },
        }),
        prisma.voice.findMany({
          where: {
            variant: "SYSTEM",
            ...searchFilter,
          },
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            name: true,
            description: true,
            variant: true,
            language: true,
            category: true,
          },
        }),
      ]);

      return {
        custom,
        system,
      };
    }),

  delete: orgProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const voice = await prisma.voice.findUnique({
        where: {
          id: input.id,
          variant: "CUSTOM",
          orgId: ctx.orgId,
        },
        select: {
          id: true,
          b2ObjectKey: true,
        },
      });

      if (!voice)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Voice does not exist...",
        });

      await prisma.voice.delete({
        where: {
          id: voice.id,
        },
      });

      if (voice.b2ObjectKey)
        return await deleteAudio(voice.b2ObjectKey).catch(() => {});

      return { success: true };
    }),
});
