import { LucideIcon } from "lucide-react";
import * as z from "zod";
import { ttsFormSchema } from "./constants";
import { appRouter } from "@/trpc/routers/_app";
import type { VoiceCategory } from "@/generated/prisma/client";

export type MenuItem = {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
};

export type NavSectionProps = {
  label?: string;
  items: MenuItem[];
  pathname: string;
};

export type QuickAction = {
  title: string;
  description: string;
  gradient: string;
  href: string;
};

export type Slider = {
  id: "temperature" | "topP" | "topK" | "repetitionPenalty";
  label: string;
  leftLabel: string;
  rightLabel: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
};

export type TTSFormValues = z.infer<typeof ttsFormSchema>;
export type AppRouter = typeof appRouter;

export type UploadAudioOptions = {
  buffer: Buffer;
  key: string;
  contentType?: string;
};

export type VoiceMetadata = {
  description: string;
  category: VoiceCategory;
  language: string;
};
