"use client";

import { Badge } from "@/components/ui/badge";
import { PROMPT_SUGGESTIONS } from "@/lib/constants";

type Props = {
  onSelect: (prompt: string) => void;
};

export default function PromptSuggestions({ onSelect }: Props) {
  return (
    <div className="space-y-2.5">
      <p className="text-sm text-muted-foreground">Get Started with</p>
      <div className="flex flex-wrap gap-2">
        {PROMPT_SUGGESTIONS.map((suggestion) => (
          <Badge
            key={suggestion.label}
            variant={"outline"}
            className="cursor-pointer gap-1.5 py-1 px-2.5 text-xs hover:bg-accent rounded-md"
            onClick={() => onSelect(suggestion.prompt)}
          >
            <suggestion.icon className="size-3.5 shrink-0" />
            {suggestion.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
