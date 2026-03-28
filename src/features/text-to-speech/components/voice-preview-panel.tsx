"use client";

import { Button } from "@/components/ui/button";
import VoiceAvatar from "@/components/voice-avatar";
import { VoicePreviewPanelVoice } from "@/lib/types";
import { Download, Pause, Play, Redo, Undo } from "lucide-react";
import { useState } from "react";
import { useWaveSurfer } from "../hooks/use-wavesurfer";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type Props = {
  audioUrl: string;
  voice: VoicePreviewPanelVoice | null;
  text: string;
};

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

export default function VoicePreviewPanel({ audioUrl, voice, text }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const selectedVoiceName = voice?.name ?? null;
  const selectedVoiceSeed = voice?.id ?? null;

  const {
    containerRef,
    currentTime,
    duration,
    isPlaying,
    isReady,
    seekBackward,
    seekForward,
    togglePlayPause,
  } = useWaveSurfer({
    url: audioUrl,
    autoplay: true,
  });

  const handleDownload = () => {
    setIsDownloading(true);

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

    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="h-full gap-8 flex-col border-t hidden flex-1 lg:flex">
      <div className="p-6 pb-0">
        <h3 className="font-semibold text-foreground">Voice Preview</h3>
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        {!isReady && (
          <div className="absolute inset-0 z-10 flex justify-center items-center">
            <Badge
              variant={"outline"}
              className="gap-2 bg-background/90 px-3 py-1.5 text-sm text-muted-foreground shadow-sm"
            >
              <Spinner className="size-4" />
              <span>Processing audio...</span>
            </Badge>
          </div>
        )}
        <div
          ref={containerRef}
          className={cn(
            "w-full cursor-pointer transition-opacity duration-200",
            !isReady && "opacity-0",
          )}
        />
      </div>
      <div className="flex items-center justify-center">
        <p className="text-3xl font-semibold tabular-nums tracking-tight text-foreground">
          {formatTime(currentTime)}{" "}
          <span className="text-muted-foreground">
            / {formatTime(duration)}
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center p-6">
        <div className="grid w-full grid-cols-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-sm font-medium text-foreground">
              {text}
            </p>
            {selectedVoiceName && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <VoiceAvatar
                  seed={selectedVoiceSeed ?? selectedVoiceName}
                  name={selectedVoiceName}
                  className="shrink-0"
                />
                <span className="truncate">{selectedVoiceName}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              variant={"ghost"}
              size={"icon-lg"}
              className="flex-col"
              onClick={() => seekBackward(10)}
              disabled={!isReady}
            >
              <Undo className="size-4 -mb-1" />
              <span className="text-[10px] font-medium">10</span>
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
            <Button
              variant={"ghost"}
              size={"icon-lg"}
              className="flex-col"
              onClick={() => seekForward(10)}
              disabled={!isReady}
            >
              <Redo className="size-4 -mb-1" />
              <span className="text-[10px] font-medium">10</span>
            </Button>
          </div>
          <div className="flex justify-end">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="size-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
