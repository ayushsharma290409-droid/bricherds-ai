import { c as createLucideIcon, r as reactExports, u as useAuth, j as jsxRuntimeExports, m as motion, O as Image, b as Button, Q as AnimatePresence, S as Skeleton, T as Trash2 } from "./index-Dcr_jcQM.js";
import { B as Badge } from "./badge-D5uulW1x.js";
import { C as Card } from "./card-Dof3mbnS.js";
import { W as WandSparkles, L as Label } from "./label-ChjFZY1K.js";
import { T as Textarea } from "./textarea-BcDF1U6w.js";
import { X } from "./x-DmeE1Swz.js";
import { S as Sparkles } from "./sparkles-Dng1ye8p.js";
import { H as History } from "./history-BrfW0uqy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
const STYLE_PROMPT_SUFFIX = {
  photorealistic: ", photorealistic, high detail, 8K photography, real-world lighting",
  "digital-art": ", digital art, vibrant colors, highly detailed illustration, concept art",
  cartoon: ", cartoon style, bold outlines, flat colors, animated, playful",
  sketch: ", pencil sketch, hand-drawn lines, charcoal texture, monochrome",
  "3d-render": ", 3D render, octane render, studio lighting, highly detailed 3D art"
};
function useImageGeneration() {
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const [currentImage, setCurrentImage] = reactExports.useState(null);
  async function generateImage(args) {
    var _a, _b;
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
            Authorization: `Bearer ${""}`
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: args.size,
            response_format: "url",
            quality: "standard"
          })
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          ((_a = errData.error) == null ? void 0 : _a.message) ?? `Request failed: ${response.status}`
        );
      }
      const data = await response.json();
      const imageUrl = (_b = data.data[0]) == null ? void 0 : _b.url;
      if (!imageUrl) throw new Error("No image returned from API");
      const generated = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        url: imageUrl,
        prompt: args.prompt,
        style: args.style,
        size: args.size,
        model: "dall-e-3",
        createdAt: /* @__PURE__ */ new Date()
      };
      setCurrentImage(generated);
      setHistory((prev) => [generated, ...prev]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Image generation failed";
      setError(msg);
    } finally {
      setIsGenerating(false);
    }
  }
  function clearError() {
    setError(null);
  }
  function removeFromHistory(id) {
    setHistory((prev) => prev.filter((img) => img.id !== id));
    if ((currentImage == null ? void 0 : currentImage.id) === id) setCurrentImage(null);
  }
  return {
    isGenerating,
    error,
    history,
    currentImage,
    generateImage,
    clearError,
    removeFromHistory
  };
}
const STYLE_OPTIONS = [
  { value: "photorealistic", label: "Photorealistic", emoji: "📷" },
  { value: "digital-art", label: "Digital Art", emoji: "🎨" },
  { value: "cartoon", label: "Cartoon", emoji: "✏️" },
  { value: "sketch", label: "Sketch", emoji: "🖊️" },
  { value: "3d-render", label: "3D Render", emoji: "🧊" }
];
const SIZE_OPTIONS = [
  { value: "1024x1024", label: "Square", sub: "1024 × 1024", aspect: "1/1" },
  {
    value: "1792x1024",
    label: "Landscape",
    sub: "1792 × 1024",
    aspect: "16/9"
  },
  {
    value: "1024x1792",
    label: "Portrait",
    sub: "1024 × 1792",
    aspect: "9/16"
  }
];
const EXAMPLE_PROMPTS = [
  "A futuristic cityscape at dusk with glowing teal skyscrapers and flying vehicles",
  "A serene mountain lake at golden hour with reflections of pine trees",
  "An abstract geometric composition in electric teal, coral orange, and midnight indigo",
  "A cozy bookshop interior with warm candlelight and overstuffed shelves",
  "A majestic polar bear standing on ice under the aurora borealis",
  "A macro close-up of a dewdrop on a spider web at sunrise"
];
function ImageCardDisplay({
  image,
  onRemove,
  compact = false
}) {
  var _a, _b;
  function handleDownload() {
    const a = document.createElement("a");
    a.href = image.url;
    a.download = `bricherds-${image.id}.png`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  }
  const styleLabel = ((_a = STYLE_OPTIONS.find((s) => s.value === image.style)) == null ? void 0 : _a.label) ?? image.style;
  const sizeLabel = ((_b = SIZE_OPTIONS.find((s) => s.value === image.size)) == null ? void 0 : _b.label) ?? image.size;
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden group hover:shadow-elevated hover:border-accent/30 transition-smooth", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: image.url,
            alt: image.prompt,
            className: "w-full h-40 object-cover group-hover:scale-105 transition-smooth"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-2 gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "secondary",
              className: "text-xs h-7 gap-1",
              onClick: handleDownload,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3" }),
                "Save"
              ]
            }
          ),
          onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "secondary",
              className: "text-xs h-7 gap-1",
              onClick: () => onRemove(image.id),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground line-clamp-2 mb-1", children: image.prompt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px] px-1.5 py-0", children: styleLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] px-1.5 py-0", children: sizeLabel })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-muted overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: image.url,
          alt: image.prompt,
          className: "w-full object-contain max-h-[520px]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "image.download.button",
          size: "sm",
          variant: "secondary",
          className: "gap-1.5 shadow-elevated",
          onClick: handleDownload,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5" }),
            "Download"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed mb-3", children: image.prompt }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Model:" }),
          image.model
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Size:" }),
          image.size
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Style:" }),
          styleLabel
        ] })
      ] })
    ] })
  ] });
}
function GeneratingPlaceholder({ size }) {
  var _a;
  const aspect = ((_a = SIZE_OPTIONS.find((s) => s.value === size)) == null ? void 0 : _a.aspect) ?? "1/1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": "image.loading_state",
      className: "overflow-hidden shadow-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "w-full rounded-lg",
            style: { aspectRatio: aspect }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { rotate: 360 },
                transition: {
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-primary" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "DALL·E 3 is painting your vision…" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
        ] })
      ]
    }
  );
}
function ImagePage() {
  const { isAuthenticated, login } = useAuth();
  const {
    isGenerating,
    error,
    history,
    currentImage,
    generateImage,
    clearError,
    removeFromHistory
  } = useImageGeneration();
  const [prompt, setPrompt] = reactExports.useState("");
  const [selectedStyle, setSelectedStyle] = reactExports.useState("photorealistic");
  const [selectedSize, setSelectedSize] = reactExports.useState("1024x1024");
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
      size: selectedSize
    });
  }
  function handleExampleClick(exPrompt) {
    setPrompt(exPrompt);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && canGenerate) {
      handleGenerate();
    }
  }
  const showEmptyState = !isGenerating && currentImage === null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center size-10 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "size-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Image Studio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-accent/30 text-accent bg-accent/5 text-xs",
                children: "DALL·E 3"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-6 pl-[52px]", children: [
            "Describe any image and AI will bring it to life. Press",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-1 py-0.5 rounded bg-muted text-xs font-mono", children: "⌘ Enter" }),
            " ",
            "to generate."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-xl border border-border p-4 shadow-card focus-within:border-primary/50 focus-within:shadow-elevated transition-smooth", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                "data-ocid": "image.prompt.textarea",
                value: prompt,
                onChange: (e) => setPrompt(e.target.value),
                onKeyDown: handleKeyDown,
                placeholder: "A glowing bioluminescent jellyfish drifting through deep ocean with soft teal light rays…",
                className: "resize-none min-h-[88px] border-0 shadow-none focus-visible:ring-0 text-sm p-0 bg-transparent"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-3 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: prompt.length > 0 ? `${prompt.length} chars` : "Enter a prompt above" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "image.generate.primary_button",
                  onClick: handleGenerate,
                  className: "gap-2 gradient-primary text-white border-0 self-end sm:self-auto",
                  disabled: !prompt.trim() || isGenerating,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "size-4" }),
                    isGenerating ? "Generating…" : isAuthenticated ? "Generate" : "Sign in & Generate"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block", children: "Style" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-wrap gap-2",
                  "data-ocid": "image.style.toggle",
                  children: STYLE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `image.style.${opt.value}`,
                      onClick: () => setSelectedStyle(opt.value),
                      className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth ${selectedStyle === opt.value ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-background text-foreground border-border hover:border-primary/40 hover:bg-primary/5"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.emoji }),
                        opt.label
                      ]
                    },
                    opt.value
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block", children: "Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-wrap gap-2",
                  "data-ocid": "image.size.toggle",
                  children: SIZE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `image.size.${opt.value}`,
                      onClick: () => setSelectedSize(opt.value),
                      className: `flex flex-col px-3 py-1.5 rounded-lg text-xs font-medium border transition-smooth leading-tight ${selectedSize === opt.value ? "bg-accent text-accent-foreground border-accent shadow-sm" : "bg-background text-foreground border-border hover:border-accent/40 hover:bg-accent/5"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: opt.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70 text-[10px]", children: opt.sub })
                      ]
                    },
                    opt.value
                  ))
                }
              )
            ] })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        "data-ocid": "image.error_state",
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        className: "px-6 py-0 bg-destructive/5 border-b border-destructive/20",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto flex items-center justify-between py-3 text-sm text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "⚠️ ",
            error
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: clearError,
              className: "ml-4 text-destructive/70 hover:text-destructive",
              "aria-label": "Dismiss error",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
            }
          )
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-8 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.3 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(GeneratingPlaceholder, { size: selectedSize })
          },
          "generating"
        ),
        !isGenerating && currentImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.35 },
            "data-ocid": "image.result.card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageCardDisplay, { image: currentImage })
          },
          currentImage.id
        )
      ] }),
      showEmptyState && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          "data-ocid": "image.empty_state",
          className: "text-center py-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center size-16 rounded-2xl bg-primary/5 border border-primary/10 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "size-8 text-primary/50" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: "Your canvas is ready" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mx-auto mb-6", children: "Describe any scene, style, or concept above to generate a stunning AI image powered by DALL·E 3." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto text-left", children: EXAMPLE_PROMPTS.map((ep, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `image.example.item.${idx + 1}`,
                onClick: () => handleExampleClick(ep),
                className: "p-3 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-smooth text-xs text-muted-foreground text-left hover:text-foreground leading-relaxed",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3 text-accent inline mr-1 shrink-0" }),
                  ep
                ]
              },
              ep
            )) })
          ]
        }
      )
    ] }) }),
    history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-8 bg-muted/30 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h2",
        {
          className: "font-semibold text-foreground flex items-center gap-2",
          "data-ocid": "image.history.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-4 text-primary" }),
            "Session History",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: history.length })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
          "data-ocid": "image.history.list",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: history.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              "data-ocid": `image.history.item.${idx + 1}`,
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.85 },
              transition: { delay: idx * 0.04 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ImageCardDisplay,
                {
                  image: img,
                  compact: true,
                  onRemove: removeFromHistory
                }
              )
            },
            img.id
          )) })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-6 bg-card border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "size-3.5" }),
        "Powered by",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "DALL·E 3" }),
        " via OpenAI — images expire after 1 hour"
      ] }),
      !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "image.signin.button",
          size: "sm",
          variant: "outline",
          onClick: login,
          className: "gap-1.5",
          children: "Sign in to save your work"
        }
      )
    ] }) })
  ] });
}
export {
  ImagePage as default
};
