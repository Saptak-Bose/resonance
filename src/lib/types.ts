import { LucideIcon } from "lucide-react";
import * as z from "zod";
import { ttsFormSchema } from "./constants";

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
