/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";

import { cache, ReactNode } from "react";
import { makeQueryClient } from "./query-client";
import {
  createTRPCOptionsProxy,
  TRPCQueryOptions,
} from "@trpc/tanstack-react-query";
import { createTRPCContext } from "./init";
import { appRouter } from "./routers/_app";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const HydrateClient = (props: { children: Readonly<ReactNode> }) => {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
};

export const prefetch = <T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) => {
  const queryClient = getQueryClient();

  if (queryOptions.queryKey[1]?.type === "infinite")
    return void queryClient.prefetchInfiniteQuery(queryOptions as any);
  else return void queryClient.prefetchQuery(queryOptions);
};
