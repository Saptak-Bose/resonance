"use client";

import { Button } from "@/components/ui/button";
import VoiceAvatar from "@/components/voice-avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { VoicePreviewPanelVoice as VoicePreviewMobileVoice } from "@/lib/types";
import { Download, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  audioUrl: string;
  voice: VoicePreviewMobileVoice | null;
  text: string;
};

export default function VoicePreviewMobile({ audioUrl, voice, text }: Props) {
  const isMobile = useIsMobile();
  const selectedVoiceName = voice?.name ?? null;
  const selectedVoiceSeed = voice?.id ?? null;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.pause();
    audio.currentTime = 0;

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!isMobile) return audioRef.current?.pause();
  }, [isMobile]);

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) return audio.pause();
    else return audio.play();
  };

  const handleDownload = () => {
    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase() || "speech";

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${safeName}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!audioUrl) return null;

  return (
    <div className="border-t p-4 lg:hidden">
      <audio ref={audioRef} src={audioUrl} />
      <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{text}</p>
          {selectedVoiceName && (
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <VoiceAvatar
                seed={selectedVoiceSeed ?? selectedVoiceName}
                name={selectedVoiceName}
                className="shrink-0"
              />
              <span className="truncate">{selectedVoiceName}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant={"ghost"} size={"icon"} onClick={handleDownload}>
            <Download className="size-4" />
          </Button>
          <Button
            variant={"default"}
            size={"icon-lg"}
            className="rounded-full"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="fill-background" />
            ) : (
              <Play className="fill-background" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
