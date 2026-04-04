"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";
import VoicesViewSkeleton from "../components/voices-view-skeleton";
import VoicesList from "../components/voices-list";
import { useQueryState } from "nuqs";
import { voicesSearchParams } from "@/lib/constants";
import VoicesToolbar from "../components/voices-toolbar";

type Props = {
  query?: string;
};

const VoicesContent = ({ query }: Props) => {
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const trpc = useTRPC();
  const [nQuery] = useQueryState("query", voicesSearchParams.query);
  const normalizedNQuery = (nQuery ?? "").trim() || undefined;
  const effectiveQuery = isHydrated ? normalizedNQuery : query;

  const voicesQuery = useQuery({
    ...trpc.voices.getAll.queryOptions({ query: effectiveQuery }),
    retry: false,
    enabled: isHydrated,
  });

  if (!isHydrated) return <VoicesViewSkeleton />;

  const errorCode =
    voicesQuery.error &&
    typeof voicesQuery.error === "object" &&
    "data" in voicesQuery.error
      ? (voicesQuery.error.data as { code?: string } | undefined)?.code
      : undefined;

  if (voicesQuery.isPending) return <VoicesViewSkeleton />;
  if (errorCode === "UNAUTHORIZED") return <VoicesViewSkeleton />;
  if (voicesQuery.isError || !voicesQuery.data) return <VoicesViewSkeleton />;

  const data = voicesQuery.data;

  return (
    <>
      <VoicesList title="Team Voices" voices={data.custom} />
      <VoicesList title="Built-in Voices" voices={data.system} />
    </>
  );
};

export default function VoicesView({ query }: Props) {
  return (
    <div className="flex-1 space-y-10 overflow-y-auto p-3 lg:p-6">
      <VoicesToolbar />
      <VoicesContent query={query} />
    </div>
  );
}
