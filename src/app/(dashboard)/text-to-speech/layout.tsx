import TextToSpeechLayout from "@/features/text-to-speech/views/text-to-speech-layout";
import { ReactNode } from "react";

export default function TextToSpeechRootLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return <TextToSpeechLayout>{children}</TextToSpeechLayout>;
}
