"use client";

import SettingsPanel from "../components/settings-panel";
import TextInputPanel from "../components/text-input-panel";
import TextToSpeechForm from "../components/text-to-speech-form";
import type { TTSFormValues } from "@/lib/types";
import { useTRPC } from "@/trpc/client";
import { useQueries } from "@tanstack/react-query";
import TTSVoicesProvider from "../contexts/tts-voices-context";
import VoicePreviewPanel from "../components/voice-preview-panel";
import VoicePreviewMobile from "../components/voice-preview-mobile";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

type Props = {
  generationId: string;
};

export default function TextToSpeechDetailView({ generationId }: Props) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason);

      if (/signal is aborted without reason/i.test(message)) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  const trpc = useTRPC();

  const [generationQuery, voicesQuery] = useQueries({
    queries: [
      {
        ...trpc.generations.getById.queryOptions({
          id: generationId,
        }),
        retry: false,
      },
      {
        ...trpc.voices.getAll.queryOptions(),
        retry: false,
      },
    ],
  });

  if (generationQuery.isPending || voicesQuery.isPending)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Badge
          variant={"outline"}
          className="gap-2 bg-background/90 px-3 py-1.5 text-sm text-foreground shadow-sm"
        >
          <Spinner className="size-5" />
          <span>Processing...</span>
        </Badge>
      </div>
    );

  const generationErrorCode =
    generationQuery.error &&
    typeof generationQuery.error === "object" &&
    "data" in generationQuery.error
      ? (generationQuery.error.data as { code?: string } | undefined)?.code
      : undefined;

  const voicesErrorCode =
    voicesQuery.error &&
    typeof voicesQuery.error === "object" &&
    "data" in voicesQuery.error
      ? (voicesQuery.error.data as { code?: string } | undefined)?.code
      : undefined;

  if (
    generationErrorCode === "UNAUTHORIZED" ||
    voicesErrorCode === "UNAUTHORIZED"
  )
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Badge
          variant={"outline"}
          className="gap-2 bg-background/90 px-3 py-1.5 text-sm text-foreground shadow-sm"
        >
          <span>Please sign in to access this generation...</span>
        </Badge>
      </div>
    );

  if (generationQuery.isError || voicesQuery.isError || !generationQuery.data)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Badge
          variant={"outline"}
          className="gap-2 bg-background/90 px-3 py-1.5 text-sm text-foreground shadow-sm"
        >
          <span>
            Sorry...We are unable to access this generation for the time
            being...
          </span>
        </Badge>
      </div>
    );

  const data = generationQuery.data;
  const { custom: customVoices, system: systemVoices } = voicesQuery.data;
  const allVoices = [...customVoices, ...systemVoices];
  const fallbackVoiceId = allVoices[0]?.id ?? "";

  const resolvedVoiceId =
    data?.voiceId && allVoices.some((v) => v.id === data.voiceId)
      ? data.voiceId
      : fallbackVoiceId;

  const defaultValues: TTSFormValues = {
    text: data.text,
    voiceId: resolvedVoiceId,
    temperature: data.temperature,
    topP: data.topP,
    topK: data.topK,
    repetitionPenalty: data.repetitionPenalty,
  };

  const generationVoice = {
    id: data.voiceId ?? undefined,
    name: data.voiceName,
  };

  return (
    <TTSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            <VoicePreviewMobile
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
            <VoicePreviewPanel
              audioUrl={data.audioUrl}
              voice={generationVoice}
              text={data.text}
            />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
}
