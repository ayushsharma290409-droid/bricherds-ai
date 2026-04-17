import { useState } from "react";

export type ImageStyle =
  | "photorealistic"
  | "digital-art"
  | "cartoon"
  | "sketch"
  | "3d-render";

export type ImageSize = "1024x1024" | "1792x1024" | "1024x1792";

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: ImageStyle;
  size: ImageSize;
  model: string;
  createdAt: Date;
}

export interface GenerateImageArgs {
  prompt: string;
  style: ImageStyle;
  size: ImageSize;
}

const STYLE_PROMPT_SUFFIX: Record<ImageStyle, string> = {
  photorealistic:
    ", photorealistic, high detail, 8K photography, real-world lighting",
  "digital-art":
    ", digital art, vibrant colors, highly detailed illustration, concept art",
  cartoon: ", cartoon style, bold outlines, flat colors, animated, playful",
  sketch: ", pencil sketch, hand-drawn lines, charcoal texture, monochrome",
  "3d-render":
    ", 3D render, octane render, studio lighting, highly detailed 3D art",
};

export function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);

  async function generateImage(args: GenerateImageArgs): Promise<void> {
    setIsGenerating(true);
    setError(null);

    try {
      const enhancedPrompt = args.prompt + STYLE_PROMPT_SUFFIX[args.style];

      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY ?? ""}`,
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: args.size,
            response_format: "url",
            quality: "standard",
          }),
        },
      );

      if (!response.ok) {
        const errData = (await response.json()) as {
          error?: { message?: string };
        };
        throw new Error(
          errData.error?.message ?? `Request failed: ${response.status}`,
        );
      }

      const data = (await response.json()) as {
        data: Array<{ url: string; revised_prompt?: string }>;
      };

      const imageUrl = data.data[0]?.url;
      if (!imageUrl) throw new Error("No image returned from API");

      const generated: GeneratedImage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        url: imageUrl,
        prompt: args.prompt,
        style: args.style,
        size: args.size,
        model: "dall-e-3",
        createdAt: new Date(),
      };

      setCurrentImage(generated);
      setHistory((prev) => [generated, ...prev]);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Image generation failed";
      setError(msg);
    } finally {
      setIsGenerating(false);
    }
  }

  function clearError() {
    setError(null);
  }

  function removeFromHistory(id: string) {
    setHistory((prev) => prev.filter((img) => img.id !== id));
    if (currentImage?.id === id) setCurrentImage(null);
  }

  return {
    isGenerating,
    error,
    history,
    currentImage,
    generateImage,
    clearError,
    removeFromHistory,
  };
}
