"use client";

import { useAppForm } from "@/hooks/use-app-form";
import {
  defaultTTSValues,
  ttsFormOptions,
  ttsFormSchema,
} from "@/lib/constants";
import { TTSFormValues } from "@/lib/types";
import { ReactNode } from "react";

type Props = {
  children: Readonly<ReactNode>;
  defaultValues?: TTSFormValues;
};

export default function TextToSpeechForm({ children, defaultValues }: Props) {
  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onSubmit: ttsFormSchema,
    },
    onSubmit: async () => {},
  });

  return <form.AppForm>{children}</form.AppForm>;
}
