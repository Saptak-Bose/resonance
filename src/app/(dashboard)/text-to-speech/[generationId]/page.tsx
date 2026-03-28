import TextToSpeechDetailView from "@/features/text-to-speech/views/text-to-speech-detail-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

type Props = {
  params: Promise<{ generationId: string }>;
};

export default async function TextToSpeechDetailPage({ params }: Props) {
  const { generationId } = await params;

  await Promise.allSettled([
    prefetch(
      trpc.generations.getById.queryOptions({
        id: generationId,
      }),
    ),
    prefetch(trpc.generations.getAll.queryOptions()),
  ]);

  return (
    <HydrateClient>
      <TextToSpeechDetailView generationId={generationId} />
    </HydrateClient>
  );
}
