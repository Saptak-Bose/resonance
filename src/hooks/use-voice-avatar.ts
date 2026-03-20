import { useMemo } from "react";
import { glass } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export const useVoiceAvatar = (seed: string) =>
  useMemo(() => {
    return createAvatar(glass, {
      seed,
      size: 128,
    }).toDataUri();
  }, [seed]);
