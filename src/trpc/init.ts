import { cache } from "react";
import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "@clerk/nextjs/server";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {});

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const authProcedure = t.procedure.use(async ({ next }) => {
  const { orgId, userId } = await auth();

  if (!userId)
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });

  return next({
    ctx: {
      userId,
      orgId,
    },
  });
});

export const orgProcedure = t.procedure.use(async ({ next }) => {
  const { orgId, userId } = await auth();

  if (!userId)
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });

  if (!orgId)
    throw new TRPCError({
      code: "FORBIDDEN",
      message:
        "User does not belong to an organization. An organization is required to perform this action.",
    });

  return next({
    ctx: {
      userId,
      orgId,
    },
  });
});
