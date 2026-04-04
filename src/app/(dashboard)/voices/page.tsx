import VoicesView from "@/features/voices/views/voices-view";
import { voicesSearchParamsCache } from "@/lib/constants";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";

type Props = {
  searchParams: Promise<SearchParams>;
};

export const metadata: Metadata = {
  title: "Voices",
};

export default async function VoicesPage({ searchParams }: Props) {
  const { query } = await voicesSearchParamsCache.parse(searchParams);
  const normalizedQuery = query.trim() || undefined;

  await Promise.allSettled([
    prefetch(trpc.voices.getAll.queryOptions({ query: normalizedQuery })),
  ]);

  return (
    <HydrateClient>
      <VoicesView query={normalizedQuery} />
    </HydrateClient>
  );
}
