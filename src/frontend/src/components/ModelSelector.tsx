import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { AiModel } from "../backend";

export interface ModelOption {
  id: AiModel;
  label: string;
  provider: string;
  description: string;
  color: string;
  badge: string;
}

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: AiModel.gpt4o,
    label: "GPT-4o",
    provider: "OpenAI",
    description: "Most capable model for complex reasoning & creativity",
    color: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: AiModel.claude,
    label: "Claude 3.5",
    provider: "Anthropic",
    description: "Expert at nuanced writing, analysis & coding",
    color: "text-orange-600",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    id: AiModel.deepseekV3,
    label: "DeepSeek V3",
    provider: "DeepSeek",
    description: "Open-source powerhouse with strong coding skills",
    color: "text-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: AiModel.grok,
    label: "Grok",
    provider: "xAI",
    description: "Real-time knowledge & witty personality by xAI",
    color: "text-purple-600",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

export function getModelOption(id: AiModel): ModelOption {
  return MODEL_OPTIONS.find((m) => m.id === id) ?? MODEL_OPTIONS[0];
}

interface ModelSelectorProps {
  value: AiModel;
  onChange: (model: AiModel) => void;
  compact?: boolean;
  disabled?: boolean;
}

export function ModelSelector({
  value,
  onChange,
  compact = false,
  disabled = false,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const selected = getModelOption(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-ocid="model.selector.button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "gap-2 border-border bg-card hover:bg-muted/60 transition-smooth font-normal",
            compact ? "h-8 text-xs px-2.5" : "h-9 text-sm px-3",
          )}
        >
          <span className={cn("font-semibold", selected.color)}>
            {selected.label}
          </span>
          {!compact && (
            <span className="text-muted-foreground text-xs">
              {selected.provider}
            </span>
          )}
          <ChevronDown className="size-3 text-muted-foreground ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        data-ocid="model.selector.popover"
        align="start"
        className="w-80 p-1.5"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
          Choose a model
        </p>
        <div className="flex flex-col gap-0.5">
          {MODEL_OPTIONS.map((m) => (
            <button
              key={m.id}
              type="button"
              data-ocid={`model.option.${m.id}`}
              onClick={() => {
                onChange(m.id);
                setOpen(false);
              }}
              className={cn(
                "flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-smooth hover:bg-muted/60 group",
                value === m.id && "bg-primary/5",
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={cn("text-sm font-semibold", m.color)}>
                    {m.label}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] h-4 px-1.5 border", m.badge)}
                  >
                    {m.provider}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {m.description}
                </p>
              </div>
              {value === m.id && (
                <Check className="size-4 text-primary mt-0.5 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
