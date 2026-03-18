import PageHeader from "@/components/global/page-header";
import { ReactNode } from "react";

export default function TextToSpeechLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title="Text to Speech" />
      {children}
    </div>
  );
}
