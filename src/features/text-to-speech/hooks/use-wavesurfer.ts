"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { UseWaveSurferOptions, UseWaveSurferReturn } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export const useWaveSurfer = ({
  autoplay,
  url,
  onReady,
  onError,
}: UseWaveSurferOptions): UseWaveSurferReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const isMobile = useIsMobile();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const autoplayRef = useRef(autoplay);
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);

  const isAbortError = (error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    return /abort/i.test(message);
  };

  useEffect(() => {
    autoplayRef.current = autoplay;
    onReadyRef.current = onReady;
    onErrorRef.current = onError;
  }, [autoplay, onReady, onError]);

  useEffect(() => {
    if (!containerRef.current) return;

    let disposed = false;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#96999d",
      progressColor: "#4a8a9a",
      cursorColor: "#4a8a9a",
      cursorWidth: 2,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      barMinHeight: 4,
      height: "auto",
      normalize: true,
    });

    waveSurferRef.current = ws;

    ws.on("ready", () => {
      if (disposed) return;

      setIsReady(true);
      setDuration(ws.getDuration());

      if (autoplayRef.current) {
        void ws.play().catch(() => {});
      } else {
        onReadyRef.current?.();
      }
    });

    ws.on("play", () => {
      if (!disposed) setIsPlaying(true);
    });

    ws.on("pause", () => {
      if (!disposed) setIsPlaying(false);
    });

    ws.on("finish", () => {
      if (!disposed) setIsPlaying(false);
    });

    ws.on("timeupdate", (time) => {
      if (!disposed) setCurrentTime(time);
    });

    ws.on("error", (error) => {
      if (disposed || isAbortError(error)) return;

      setIsReady(false);
      setIsPlaying(false);
      onErrorRef.current?.(new Error(String(error)));
    });

    return () => {
      disposed = true;
      waveSurferRef.current = null;

      try {
        const destroyResult = ws.destroy();
        void Promise.resolve(destroyResult).catch((error) => {
          if (!isAbortError(error)) {
            onErrorRef.current?.(new Error(String(error)));
          }
        });
      } catch {}
    };
  }, [isMobile]);

  useEffect(() => {
    const ws = waveSurferRef.current;

    if (!ws || !url) return;

    try {
      const loadResult = ws.load(url);
      void Promise.resolve(loadResult).catch((error) => {
        if (!isAbortError(error)) {
          onErrorRef.current?.(new Error(String(error)));
        }
      });
    } catch (error) {
      if (!isAbortError(error)) onErrorRef.current?.(new Error(String(error)));
    }
  }, [url]);

  const togglePlayPause = useCallback(() => {
    waveSurferRef.current?.playPause();
  }, []);

  const seekForward = useCallback((seconds = 5) => {
    const ws = waveSurferRef.current;
    if (!ws) return;

    const total = ws.getDuration();
    if (!total || Number.isNaN(total)) return;

    const newTime = Math.min(ws.getCurrentTime() + seconds, total);
    ws.seekTo(newTime / total);
  }, []);

  const seekBackward = useCallback((seconds = 5) => {
    const ws = waveSurferRef.current;
    if (!ws) return;

    const total = ws.getDuration();
    if (!total || Number.isNaN(total)) return;

    const newTime = Math.max(ws.getCurrentTime() - seconds, 0);
    ws.seekTo(newTime / total);
  }, []);

  return {
    containerRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    togglePlayPause,
    seekForward,
    seekBackward,
  };
};
