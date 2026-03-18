import TextToSpeechView from "@/features/text-to-speech/views/text-to-speech-view";
import type { Metadata } from "next";

type Props = object;

export const metadata: Metadata = {
  title: "Text to Speech",
};

export default function TextToSpeechPage({}: Props) {
  return <TextToSpeechView />;
}
