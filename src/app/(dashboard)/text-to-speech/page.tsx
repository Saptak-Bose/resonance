import TextToSpeechView from "@/features/text-to-speech/views/text-to-speech-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import type { Metadata } from "next";

type Props = {
  searchParams: Promise<{
    text?: string;
    voiceId?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Text to Speech",
};

export default async function TextToSpeechPage({ searchParams }: Props) {
  const { text, voiceId } = await searchParams;

  await Promise.allSettled([
    prefetch(trpc.voices.getAll.queryOptions()),
    prefetch(trpc.generations.getAll.queryOptions()),
  ]);

  return (
    <HydrateClient>
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </HydrateClient>
  );
}
