"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { makeQueryClient } from "./query-client";
import { ReactNode, useState } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { AppRouter } from "@/lib/types";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let browserQueryClient: QueryClient;
function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();

  return browserQueryClient;
}

const getUrl = () => {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.APP_URL) return process.env.APP_URL;

    return "http://localhost:3000";
  })();

  return `${base}/api/trpc`;
};

export const TRPCReactProvider = (props: { children: Readonly<ReactNode> }) => {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: getUrl(),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};
