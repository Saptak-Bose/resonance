import { LucideIcon } from "lucide-react";
import * as z from "zod";
import { ttsFormSchema } from "./constants";
import { appRouter } from "@/trpc/routers/_app";
import type { VoiceCategory } from "@/generated/prisma/client";
import { inferRouterOutputs } from "@trpc/server";
import { RefObject } from "react";

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

export type TTSVoiceItem =
  inferRouterOutputs<AppRouter>["voices"]["getAll"]["custom"][number];

export type TTSVoicesContextValue = {
  customVoices: TTSVoiceItem[];
  systemVoices: TTSVoiceItem[];
  allVoices: TTSVoiceItem[];
};

export type VoicePreviewPanelVoice = {
  id?: string;
  name: string;
};

export type UseWaveSurferOptions = {
  url?: string;
  autoplay?: boolean;
  onReady?: () => void;
  onError?: (error: Error) => void;
};

export type UseWaveSurferReturn = {
  containerRef: RefObject<HTMLDivElement | null>;
  isPlaying: boolean;
  isReady: boolean;
  currentTime: number;
  duration: number;
  togglePlayPause: () => void;
  seekForward: (seconds?: number) => void;
  seekBackward: (seconds?: number) => void;
};
