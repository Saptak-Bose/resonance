"use client";

import { useAppForm } from "@/hooks/use-app-form";
import {
  defaultTTSValues,
  ttsFormOptions,
  ttsFormSchema,
} from "@/lib/constants";
import { TTSFormValues } from "@/lib/types";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "sonner";

type Props = {
  children: Readonly<ReactNode>;
  defaultValues?: TTSFormValues;
};

export default function TextToSpeechForm({ children, defaultValues }: Props) {
  const trpc = useTRPC();
  const router = useRouter();
  const createMutation = useMutation(
    trpc.generations.create.mutationOptions({}),
  );

  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const data = await createMutation.mutateAsync({
          text: value.text.trim(),
          voiceId: value.voiceId,
          temperature: value.temperature,
          topP: value.topP,
          topK: value.topK,
          repetitionPenalty: value.repetitionPenalty,
        });

        toast.success("Audio generated successfully!");
        router.push(`/text-to-speech/${data?.id}`);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to generate audio...";

        toast.error(message);
      }
    },
  });

  return <form.AppForm>{children}</form.AppForm>;
}
