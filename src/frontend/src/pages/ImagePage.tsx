import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Download,
  History,
  ImageIcon,
  Sparkles,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  type GeneratedImage,
  type ImageSize,
  type ImageStyle,
  useImageGeneration,
} from "../hooks/useImageGeneration";

// ─── Constants ────────────────────────────────────────────────────────────────

const STYLE_OPTIONS: { value: ImageStyle; label: string; emoji: string }[] = [
  { value: "photorealistic", label: "Photorealistic", emoji: "📷" },
  { value: "digital-art", label: "Digital Art", emoji: "🎨" },
  { value: "cartoon", label: "Cartoon", emoji: "✏️" },
  { value: "sketch", label: "Sketch", emoji: "🖊️" },
  { value: "3d-render", label: "3D Render", emoji: "🧊" },
];

const SIZE_OPTIONS: {
  value: ImageSize;
  label: string;
  sub: string;
  aspect: string;
}[] = [
  { value: "1024x1024", label: "Square", sub: "1024 × 1024", aspect: "1/1" },
  {
    value: "1792x1024",
    label: "Landscape",
    sub: "1792 × 1024",
    aspect: "16/9",
  },
  {
    value: "1024x1792",
    label: "Portrait",
    sub: "1024 × 1792",
    aspect: "9/16",
  },
];

const EXAMPLE_PROMPTS = [
  "A futuristic cityscape at dusk with glowing teal skyscrapers and flying vehicles",
  "A serene mountain lake at golden hour with reflections of pine trees",
  "An abstract geometric composition in electric teal, coral orange, and midnight indigo",
  "A cozy bookshop interior with warm candlelight and overstuffed shelves",
  "A majestic polar bear standing on ice under the aurora borealis",
  "A macro close-up of a dewdrop on a spider web at sunrise",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ImageCardDisplay({
  image,
  onRemove,
  compact = false,
}: {
  image: GeneratedImage;
  onRemove?: (id: string) => void;
  compact?: boolean;
}) {
  function handleDownload() {
    const a = document.createElement("a");
    a.href = image.url;
    a.download = `bricherds-${image.id}.png`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }

  const styleLabel =
    STYLE_OPTIONS.find((s) => s.value === image.style)?.label ?? image.style;
  const sizeLabel =
    SIZE_OPTIONS.find((s) => s.value === image.size)?.label ?? image.size;

  if (compact) {
    return (
      <Card className="overflow-hidden group hover:shadow-elevated hover:border-accent/30 transition-smooth">
        <div className="relative overflow-hidden bg-muted">
          <img
            src={image.url}
            alt={image.prompt}
            className="w-full h-40 object-cover group-hover:scale-105 transition-smooth"
          />
          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-2 gap-1">
            <Button
              size="sm"
              variant="secondary"
              className="text-xs h-7 gap-1"
              onClick={handleDownload}
            >
              <Download className="size-3" />
              Save
            </Button>
            {onRemove && (
              <Button
                size="sm"
                variant="secondary"
                className="text-xs h-7 gap-1"
                onClick={() => onRemove(image.id)}
              >
                <Trash2 className="size-3" />
              </Button>
            )}
          </div>
        </div>
        <div className="p-2">
          <p className="text-xs text-foreground line-clamp-2 mb-1">
            {image.prompt}
          </p>
          <div className="flex gap-1 flex-wrap">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {styleLabel}
            </Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {sizeLabel}
            </Badge>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-card">
      <div className="relative bg-muted overflow-hidden">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full object-contain max-h-[520px]"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            data-ocid="image.download.button"
            size="sm"
            variant="secondary"
            className="gap-1.5 shadow-elevated"
            onClick={handleDownload}
          >
            <Download className="size-3.5" />
            Download
          </Button>
        </div>
      </div>
      <div className="p-4 border-t border-border">
        <p className="text-sm text-foreground leading-relaxed mb-3">
          {image.prompt}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="font-medium text-foreground">Model:</span>
            {image.model}
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            <span className="font-medium text-foreground">Size:</span>
            {image.size}
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            <span className="font-medium text-foreground">Style:</span>
            {styleLabel}
          </span>
        </div>
      </div>
    </Card>
  );
}

function GeneratingPlaceholder({ size }: { size: ImageSize }) {
  const aspect = SIZE_OPTIONS.find((s) => s.value === size)?.aspect ?? "1/1";
  return (
    <Card
      data-ocid="image.loading_state"
      className="overflow-hidden shadow-card"
    >
      <div className="bg-muted flex items-center justify-center p-8">
        <Skeleton
          className="w-full rounded-lg"
          style={{ aspectRatio: aspect }}
        />
      </div>
      <div className="p-4 border-t border-border space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Sparkles className="size-4 text-primary" />
          </motion.div>
          <span>DALL·E 3 is painting your vision…</span>
        </div>
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ImagePage() {
  const { isAuthenticated, login } = useAuth();
  const {
    isGenerating,
    error,
    history,
    currentImage,
    generateImage,
    clearError,
    removeFromHistory,
  } = useImageGeneration();

  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] =
    useState<ImageStyle>("photorealistic");
  const [selectedSize, setSelectedSize] = useState<ImageSize>("1024x1024");

  const canGenerate = prompt.trim().length > 0 && !isGenerating;

  function handleGenerate() {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!canGenerate) return;
    generateImage({
      prompt: prompt.trim(),
      style: selectedStyle,
      size: selectedSize,
    });
  }

  function handleExampleClick(exPrompt: string) {
    setPrompt(exPrompt);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && canGenerate) {
      handleGenerate();
    }
  }

  const showEmptyState = !isGenerating && currentImage === null;

  return (
    <div className="min-h-full bg-background">
      {/* ── Hero / Input Section ── */}
      <section className="bg-card border-b border-border px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="inline-flex items-center justify-center size-10 rounded-xl bg-primary/10">
                <ImageIcon className="size-5 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Image Studio
              </h1>
              <Badge
                variant="outline"
                className="border-accent/30 text-accent bg-accent/5 text-xs"
              >
                DALL·E 3
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mb-6 pl-[52px]">
              Describe any image and AI will bring it to life. Press{" "}
              <kbd className="px-1 py-0.5 rounded bg-muted text-xs font-mono">
                ⌘ Enter
              </kbd>{" "}
              to generate.
            </p>

            {/* Prompt textarea */}
            <div className="bg-background rounded-xl border border-border p-4 shadow-card focus-within:border-primary/50 focus-within:shadow-elevated transition-smooth">
              <Textarea
                data-ocid="image.prompt.textarea"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="A glowing bioluminescent jellyfish drifting through deep ocean with soft teal light rays…"
                className="resize-none min-h-[88px] border-0 shadow-none focus-visible:ring-0 text-sm p-0 bg-transparent"
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {prompt.length > 0
                    ? `${prompt.length} chars`
                    : "Enter a prompt above"}
                </span>
                <Button
                  data-ocid="image.generate.primary_button"
                  onClick={handleGenerate}
                  className="gap-2 gradient-primary text-white border-0 self-end sm:self-auto"
                  disabled={!prompt.trim() || isGenerating}
                >
                  <Wand2 className="size-4" />
                  {isGenerating
                    ? "Generating…"
                    : isAuthenticated
                      ? "Generate"
                      : "Sign in & Generate"}
                </Button>
              </div>
            </div>

            {/* Style + Size options */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Style */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                  Style
                </Label>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="image.style.toggle"
                >
                  {STYLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      data-ocid={`image.style.${opt.value}`}
                      onClick={() => setSelectedStyle(opt.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth ${
                        selectedStyle === opt.value
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-background text-foreground border-border hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <span>{opt.emoji}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                  Size
                </Label>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="image.size.toggle"
                >
                  {SIZE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      data-ocid={`image.size.${opt.value}`}
                      onClick={() => setSelectedSize(opt.value)}
                      className={`flex flex-col px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth leading-tight ${
                        selectedSize === opt.value
                          ? "bg-accent text-accent-foreground border-accent shadow-sm"
                          : "bg-background text-foreground border-border hover:border-accent/40 hover:bg-accent/5"
                      }`}
                    >
                      <span className="font-semibold">{opt.label}</span>
                      <span className="opacity-70 text-[10px]">{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Error Banner ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            data-ocid="image.error_state"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 py-0 bg-destructive/5 border-b border-destructive/20"
          >
            <div className="max-w-3xl mx-auto flex items-center justify-between py-3 text-sm text-destructive">
              <span>⚠️ {error}</span>
              <button
                type="button"
                onClick={clearError}
                className="ml-4 text-destructive/70 hover:text-destructive"
                aria-label="Dismiss error"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Result Area ── */}
      <section className="px-6 py-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div
                key="generating"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <GeneratingPlaceholder size={selectedSize} />
              </motion.div>
            )}
            {!isGenerating && currentImage && (
              <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                data-ocid="image.result.card"
              >
                <ImageCardDisplay image={currentImage} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {showEmptyState && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-ocid="image.empty_state"
              className="text-center py-10"
            >
              <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/5 border border-primary/10 mb-4">
                <Wand2 className="size-8 text-primary/50" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                Your canvas is ready
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                Describe any scene, style, or concept above to generate a
                stunning AI image powered by DALL·E 3.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto text-left">
                {EXAMPLE_PROMPTS.map((ep, idx) => (
                  <button
                    key={ep}
                    type="button"
                    data-ocid={`image.example.item.${idx + 1}`}
                    onClick={() => handleExampleClick(ep)}
                    className="p-3 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-smooth text-xs text-muted-foreground text-left hover:text-foreground leading-relaxed"
                  >
                    <Sparkles className="size-3 text-accent inline mr-1 shrink-0" />
                    {ep}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── History Grid ── */}
      {history.length > 0 && (
        <section className="px-6 py-8 bg-muted/30 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2
                className="font-semibold text-foreground flex items-center gap-2"
                data-ocid="image.history.section"
              >
                <History className="size-4 text-primary" />
                Session History
                <Badge variant="secondary" className="text-xs">
                  {history.length}
                </Badge>
              </h2>
            </div>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              data-ocid="image.history.list"
            >
              <AnimatePresence>
                {history.map((img, idx) => (
                  <motion.div
                    key={img.id}
                    data-ocid={`image.history.item.${idx + 1}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <ImageCardDisplay
                      image={img}
                      compact
                      onRemove={removeFromHistory}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer Info ── */}
      <section className="px-6 py-6 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ImageIcon className="size-3.5" />
            Powered by{" "}
            <span className="font-semibold text-foreground">DALL·E 3</span> via
            OpenAI — images expire after 1 hour
          </span>
          {!isAuthenticated && (
            <Button
              data-ocid="image.signin.button"
              size="sm"
              variant="outline"
              onClick={login}
              className="gap-1.5"
            >
              Sign in to save your work
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
