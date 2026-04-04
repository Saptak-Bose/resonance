import {
  AudioLines,
  BookOpen,
  Brain,
  Clapperboard,
  Gamepad2,
  Headphones,
  Home,
  Languages,
  LayoutGrid,
  Mic,
  Podcast,
  Settings,
  Smile,
  Volume2,
} from "lucide-react";
import type {
  MenuItem,
  PromptSuggestion,
  QuickAction,
  Slider,
  TTSFormValues,
  VoiceMetadata,
} from "./types";
import * as z from "zod";
import { formOptions } from "@tanstack/react-form";
import type { VoiceCategory } from "@/generated/prisma/client";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import locales from "locale-codes";

export const mainMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Explore Voices",
    url: "/voices",
    icon: LayoutGrid,
  },
  {
    title: "Text to Speech",
    url: "/text-to-speech",
    icon: AudioLines,
  },
  {
    title: "Voice Cloning",
    icon: Volume2,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const otherMenuItems = (clerk: any): MenuItem[] => [
  {
    title: "Settings",
    icon: Settings,
    onClick: () => clerk.openOrganizationProfile(),
  },
  {
    title: "Help and Support",
    url: SUPPORT_EMAIL_LINK,
    icon: Headphones,
  },
];

export const TEXT_MAX_LENGTH = 5000;

export const quickActions: QuickAction[] = [
  {
    title: "Narrate a Story",
    description: "Bring characters to life with expressive AI narration",
    gradient: "from-cyan-400 to-cyan-50",
    href: "/text-to-speech?text=In a village tucked between mist-covered mountains, there lived an old clockmaker whose clocks never told the right time — but they always told the truth. One rainy evening, a stranger walked in and asked for a clock that could show him his future.",
  },
  {
    title: "Record an Ad",
    description: "Create professional advertisements with lifelike AI voices",
    gradient: "from-pink-400 to-pink-100",
    href: "/text-to-speech?text=Introducing BrightBean Coffee — the smoothest roast you'll ever taste. Sourced from high-altitude farms, slow-roasted to perfection, and delivered fresh to your door every single week. Wake up to something extraordinary. Try BrightBean today and get your first bag free.",
  },
  {
    title: "Direct a Movie Scene",
    description: "Generate dramatic dialogue for film and video",
    gradient: "from-violet-500 to-violet-100",
    href: "/text-to-speech?text=The rain hammered against the window as she turned to face him. You knew, didn't you? she whispered, her voice barely holding together. He stepped forward, jaw clenched. I did what I had to do. The silence between them was louder than the storm outside.",
  },
  {
    title: "Voice a Game Character",
    description: "Build immersive worlds with dynamic character voices",
    gradient: "from-orange-400 to-orange-100",
    href: "/text-to-speech?text=Listen up, adventurer. The realm of Ashenvale is crumbling, and the Crystal of Eternity has been shattered into seven pieces. You are the only one who can reassemble it. Gather your courage, sharpen your blade, and meet me at the Gates of Dawn. Time is not on our side.",
  },
  {
    title: "Introduce Your Podcast",
    description: "Hook your listeners from the very first second",
    gradient: "from-blue-500 to-blue-100",
    href: "/text-to-speech?text=Hey everyone, welcome back to another episode of The Curious Mind — the podcast where we dig into the stories, science, and strange ideas that shape our world. I'm your host, and today we have an incredible guest who's going to challenge everything you thought you knew.",
  },
  {
    title: "Guide a Meditation",
    description: "Craft soothing, calming audio for wellness content",
    gradient: "from-lime-400 to-lime-100",
    href: "/text-to-speech?text=Close your eyes and take a deep breath in. Hold it gently... and release. Feel the weight of the day slowly melting away. With each breath, you're sinking deeper into calm. There is nowhere else you need to be. Just here. Just now. Breathe in peace, breathe out tension.",
  },
];

export const PRICE_PER_UNIT = 0.007;
export const SUPPORT_EMAIL_LINK =
  "mailto:cunningsap002+resonancesupport@gmail.com";

export const sliders: Slider[] = [
  {
    id: "temperature",
    label: "Creativity",
    leftLabel: "Consistent",
    rightLabel: "Expressive",
    min: 0,
    max: 2,
    step: 0.1,
    defaultValue: 0.8,
  },
  {
    id: "topP",
    label: "Voice Variety",
    leftLabel: "Stable",
    rightLabel: "Dynamic",
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: 0.95,
  },
  {
    id: "topK",
    label: "Expression Range",
    leftLabel: "Subtle",
    rightLabel: "Dramatic",
    min: 1,
    max: 10000,
    step: 100,
    defaultValue: 1000,
  },
  {
    id: "repetitionPenalty",
    label: "Natural Flow",
    leftLabel: "Rhythmic",
    rightLabel: "Varied",
    min: 1,
    max: 2,
    step: 0.1,
    defaultValue: 1.2,
  },
];

export const ttsFormSchema = z.object({
  text: z.string().min(1, "Please enter some text..."),
  voiceId: z.string().min(1, "Please select a voice..."),
  temperature: z.number(),
  topP: z.number(),
  topK: z.number(),
  repetitionPenalty: z.number(),
});

export const defaultTTSValues: TTSFormValues = {
  text: "",
  voiceId: "",
  temperature: 0.8,
  topP: 0.95,
  topK: 1000,
  repetitionPenalty: 1.2,
};

export const ttsFormOptions = formOptions({
  defaultValues: defaultTTSValues,
});

export const tabTriggerClassName =
  "flex-1 h-full gap-2 bg-transparent rounded-none border-x-0 border-t-0 border-b-px border-b-transparent shadow-none data-[state=active]:border-b-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none";

export const CANONICAL_SYSTEM_VOICE_NAMES = [
  "Aaron",
  "Abigail",
  "Anaya",
  "Andy",
  "Archer",
  "Brian",
  "Chloe",
  "Dylan",
  "Emmanuel",
  "Ethan",
  "Evelyn",
  "Gavin",
  "Gordon",
  "Ivan",
  "Laura",
  "Lucy",
  "Madison",
  "Marisol",
  "Meera",
  "Walter",
] as const;

export const VOICE_CATEGORY_LABELS: Record<VoiceCategory, string> = {
  AUDIOBOOK: "Audiobook",
  ADVERTISING: "Advertising",
  CHARACTERS: "Characters",
  PODCAST: "Podcast",
  CONVERSATIONAL: "Conversational",
  CORPORATE: "Corporate",
  CUSTOMER_SERVICE: "Customer Service",
  GENERAL: "General",
  MEDITATION: "Meditation",
  MOTIVATIONAL: "Motivational",
  NARRATIVE: "Narrative",
  VOICEOVER: "Voiceover",
};

export const VOICE_CATEGORIES = Object.keys(
  VOICE_CATEGORY_LABELS,
) as VoiceCategory[];

export const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  B2_KEY_ID: z.string().min(1),
  B2_APP_KEY: z.string().min(1),
  B2_BUCKET_NAME: z.string().min(1),
  B2_REGION: z.string().min(1),
  B2_ENDPOINT: z.string().min(1),
});

export const systemVoiceMetadata: Record<string, VoiceMetadata> = {
  Aaron: {
    description: "Soothing and calm, like a self-help audiobook narrator",
    category: "AUDIOBOOK",
    language: "en-US",
  },
  Abigail: {
    description: "Friendly and conversational with a warm, approachable tone",
    category: "CONVERSATIONAL",
    language: "en-GB",
  },
  Anaya: {
    description: "Polite and professional, suited for customer service",
    category: "CUSTOMER_SERVICE",
    language: "en-IN",
  },
  Andy: {
    description: "Versatile and clear, a reliable all-purpose narrator",
    category: "GENERAL",
    language: "en-US",
  },
  Archer: {
    description: "Laid-back and reflective with a steady, storytelling pace",
    category: "NARRATIVE",
    language: "en-US",
  },
  Brian: {
    description: "Professional and helpful with a clear customer support tone",
    category: "CUSTOMER_SERVICE",
    language: "en-US",
  },
  Chloe: {
    description: "Bright and bubbly with a cheerful, outgoing personality",
    category: "CORPORATE",
    language: "en-AU",
  },
  Dylan: {
    description:
      "Thoughtful and intimate, like a quiet late-night conversation",
    category: "GENERAL",
    language: "en-US",
  },
  Emmanuel: {
    description: "Nasally and distinctive with a quirky, cartoon-like quality",
    category: "CHARACTERS",
    language: "en-US",
  },
  Ethan: {
    description: "Polished and warm with crisp, studio-quality delivery",
    category: "VOICEOVER",
    language: "en-US",
  },
  Evelyn: {
    description: "Warm Southern charm with a heartfelt, down-to-earth feel",
    category: "CONVERSATIONAL",
    language: "en-US",
  },
  Gavin: {
    description: "Calm and reassuring with a smooth, natural flow",
    category: "MEDITATION",
    language: "en-US",
  },
  Gordon: {
    description: "Warm and encouraging with an uplifting, motivational tone",
    category: "MOTIVATIONAL",
    language: "en-US",
  },
  Ivan: {
    description: "Deep and cinematic with a dramatic, movie-character presence",
    category: "CHARACTERS",
    language: "ru-RU",
  },
  Laura: {
    description: "Authentic and warm with a conversational Midwestern tone",
    category: "CONVERSATIONAL",
    language: "en-US",
  },
  Lucy: {
    description: "Direct and composed with a professional phone manner",
    category: "CUSTOMER_SERVICE",
    language: "en-US",
  },
  Madison: {
    description: "Energetic and unfiltered with a casual, chatty vibe",
    category: "PODCAST",
    language: "en-US",
  },
  Marisol: {
    description: "Confident and polished with a persuasive, ad-ready delivery",
    category: "ADVERTISING",
    language: "en-US",
  },
  Meera: {
    description: "Friendly and helpful with a clear, service-oriented tone",
    category: "CUSTOMER_SERVICE",
    language: "en-IN",
  },
  Walter: {
    description: "Old and raspy with deep gravitas, like a wise grandfather",
    category: "NARRATIVE",
    language: "en-US",
  },
};

export const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    label: "Narrate a story",
    prompt:
      "In a village tucked between mist-covered mountains, there lived an old clockmaker whose clocks never told the right time — but they always told the truth. One rainy evening, a stranger walked in and asked for a clock that could show him his future.",
    icon: BookOpen,
  },
  {
    label: "Tell a silly joke",
    prompt:
      "Why don't scientists trust atoms? Because they make up everything! And honestly, I once asked an atom if it was positive about that — it said it had lost an electron. I said, are you sure? It replied, I'm positive!",
    icon: Smile,
  },
  {
    label: "Record an advertisement",
    prompt:
      "Introducing BrightBean Coffee — the smoothest roast you'll ever taste. Sourced from high-altitude farms, slow-roasted to perfection, and delivered fresh to your door every single week. Wake up to something extraordinary. Try BrightBean today and get your first bag free.",
    icon: Mic,
  },
  {
    label: "Speak in different languages",
    prompt:
      "Hello and welcome! Today we're going on a journey around the world. Bonjour, comment allez-vous? Hola, bienvenidos a todos. Guten Tag, willkommen bei uns. Ciao a tutti, benvenuti. Let's celebrate the beauty of language together.",
    icon: Languages,
  },
  {
    label: "Direct a dramatic movie scene",
    prompt:
      "The rain hammered against the window as she turned to face him. You knew, didn't you? she whispered, her voice barely holding together. He stepped forward, jaw clenched. I did what I had to do. The silence between them was louder than the storm outside.",
    icon: Clapperboard,
  },
  {
    label: "Hear from a video game character",
    prompt:
      "Listen up, adventurer. The realm of Ashenvale is crumbling, and the Crystal of Eternity has been shattered into seven pieces. You are the only one who can reassemble it. Gather your courage, sharpen your blade, and meet me at the Gates of Dawn. Time is not on our side.",
    icon: Gamepad2,
  },
  {
    label: "Introduce your podcast",
    prompt:
      "Hey everyone, welcome back to another episode of The Curious Mind — the podcast where we dig into the stories, science, and strange ideas that shape our world. I'm your host, and today we have an incredible guest who's going to challenge everything you thought you knew.",
    icon: Podcast,
  },
  {
    label: "Guide a meditation class",
    prompt:
      "Close your eyes and take a deep breath in. Hold it gently... and release. Feel the weight of the day slowly melting away. With each breath, you're sinking deeper into calm. There is nowhere else you need to be. Just here. Just now. Breathe in peace, breathe out tension.",
    icon: Brain,
  },
];

export const voicesSearchParams = {
  query: parseAsString.withDefault(""),
};

export const voicesSearchParamsCache =
  createSearchParamsCache(voicesSearchParams);

export const createVoiceSchema = z.object({
  name: z.string().min(1, "Voice name is required..."),
  category: z.enum(VOICE_CATEGORIES as [VoiceCategory, ...VoiceCategory[]]),
  language: z.string().min(1, "Language is required..."),
  description: z.string().nullish(),
});

export const MAX_UPLOAD_SIZE_BYTES = 20 * 1024 * 1024;
export const MIN_AUDIO_DURATION_SECONDS = 10;

export const LANGUAGE_OPTIONS = locales.all
  .filter((l) => l.tag && l.tag.includes("-") && l.name)
  .map((l) => ({
    value: l.tag,
    label: l.location ? `${l.name} (${l.location})` : l.name,
  }));

export const voiceCreateFormSchema = z.object({
  name: z.string().min(1, "Voice name is required..."),
  file: z
    .instanceof(File, {
      message: "Audio file is required...",
    })
    .nullable()
    .refine((f) => f !== null, "Audio file is required..."),
  category: z.string().min(1, "Category is required..."),
  language: z.string().min(1, "Language is required..."),
  description: z.string(),
});
