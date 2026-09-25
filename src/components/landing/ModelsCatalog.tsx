"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { WEB_APP_HREF } from "@/lib/links";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type CategoryId = "reasoning" | "coding" | "speed" | "vision";
type Latency = "Fast" | "Balanced" | "Deep";

type Model = {
  name: string;
  vendor: string;
  blurb: string;
  categories: CategoryId[];
  context: string;
  latency: Latency;
};

const MODELS: Model[] = [
  {
    name: "EchoGPT",
    vendor: "EchoGPT",
    blurb:
      "Interact with EchoGPT, an AI that reflects your input for quick ideas, summaries, or feedback. Perfect for brainstorming or rapid dialogue.",
    categories: ["reasoning", "speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "DeepSeek V4 Pro",
    vendor: "DeepSeek",
    blurb:
      "DeepSeek specializes in advanced data exploration, leveraging AI to deliver accurate, insightful, and efficient solutions for complex analysis.",
    categories: ["reasoning"],
    context: "Auto",
    latency: "Deep",
  },
  {
    name: "Nemotron 3 Ultra",
    vendor: "NVIDIA",
    blurb: "Llama 3.1 Nemotron 70B Instruct.",
    categories: ["reasoning"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "GLM-5.2",
    vendor: "Zhipu",
    blurb:
      "GLM-5.2 offers strong multilingual reasoning and coding across a 1M token context at a low cost per token.",
    categories: ["reasoning", "coding"],
    context: "1M",
    latency: "Balanced",
  },
  {
    name: "DeepSeek V4 Flash",
    vendor: "DeepSeek",
    blurb:
      "DeepSeek V4 Flash answers quickly over a 1M token context, tuned for rapid iteration at very low cost.",
    categories: ["speed"],
    context: "1M",
    latency: "Fast",
  },
  {
    name: "Tencent Hy3",
    vendor: "Tencent",
    blurb:
      "Tencent Hunyuan 3 provides fast, budget-friendly responses for everyday chat, drafting, and summarisation.",
    categories: ["speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "MiMo V2.5 Pro",
    vendor: "Xiaomi",
    blurb:
      "MiMo V2.5 Pro adds stronger reasoning to the MiMo line while staying inexpensive over a 1M token context.",
    categories: ["reasoning"],
    context: "1M",
    latency: "Balanced",
  },
  {
    name: "Qwen 3.7 Plus",
    vendor: "Qwen",
    blurb:
      "Qwen 3.7 Plus gives near-flagship quality at a fraction of the cost for daily reasoning and drafting.",
    categories: ["speed", "reasoning"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "GPT-5.6 Sol",
    vendor: "OpenAI",
    blurb:
      "GPT-5.6 Sol delivers OpenAI's flagship reasoning with a 1M token context, ideal for long documents and demanding analysis.",
    categories: ["reasoning"],
    context: "1M",
    latency: "Deep",
  },
  {
    name: "Kimi K2.7 Code",
    vendor: "Moonshot",
    blurb:
      "Kimi K2.7 Code is built for software work - reading large repositories, writing code, and explaining changes.",
    categories: ["coding"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "LongCat 2.0",
    vendor: "Meituan",
    blurb:
      "LongCat 2.0 from Meituan is free to use, with a 1M token context for long documents and extended chats.",
    categories: ["reasoning", "speed"],
    context: "1M",
    latency: "Balanced",
  },
  {
    name: "GLM-5.3 Flash",
    vendor: "Zhipu",
    blurb:
      "GLM-5.3 Flash is the fastest GLM tier, made for high-volume chat where latency matters most.",
    categories: ["speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "Qwen 3.8 27B",
    vendor: "Qwen",
    blurb:
      "Qwen 3.8 27B balances speed and quality for general assistance, coding help, and structured output.",
    categories: ["coding", "speed"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "Qwen 3.7 Max",
    vendor: "Qwen",
    blurb:
      "Qwen 3.7 Max is the top Qwen tier for complex reasoning, long-form writing, and detailed technical work.",
    categories: ["reasoning"],
    context: "Auto",
    latency: "Deep",
  },
  {
    name: "Qwen 3.6 Plus",
    vendor: "Qwen",
    blurb:
      "Qwen 3.6 Plus is a dependable general-purpose model for conversation, summarisation, and analysis.",
    categories: ["speed", "reasoning"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "Gemini 3.8 Flash",
    vendor: "Google",
    blurb:
      "Gemini 3.8 Flash combines Google's multimodal strengths with fast responses across a 1M token context.",
    categories: ["vision", "speed"],
    context: "1M",
    latency: "Fast",
  },
  {
    name: "Kimi K3",
    vendor: "Moonshot",
    blurb:
      "Kimi K3 is Moonshot's flagship, built for deep reasoning and agentic work across a 1M token context.",
    categories: ["reasoning"],
    context: "1M",
    latency: "Deep",
  },
  {
    name: "MiniMax M3",
    vendor: "MiniMax",
    blurb:
      "MiniMax M3 handles long-context conversation and reasoning with an efficient price-to-quality balance.",
    categories: ["reasoning", "coding"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "GPT-5.5",
    vendor: "OpenAI",
    blurb:
      "Preview GPT's powerful abilities with GPT-5-5, offering precise yet expansive answers in an accessible, versatile format.",
    categories: ["reasoning"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "GPT-5.6 Luna",
    vendor: "OpenAI",
    blurb:
      "GPT-5.6 Luna is the lightweight GPT-5.6 tier - quick, inexpensive, and capable across everyday tasks.",
    categories: ["speed", "coding"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "Grok 4.5",
    vendor: "xAI",
    blurb:
      "Grok 4.5 brings xAI's conversational style and current-events awareness to a 500K token context.",
    categories: ["speed"],
    context: "500K",
    latency: "Fast",
  },
  {
    name: "Grok 4.6",
    vendor: "xAI",
    blurb:
      "Grok 4.6 is the latest xAI release, improving reasoning and instruction following over Grok 4.5.",
    categories: ["reasoning"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "Gemini 3.7 Flash",
    vendor: "Google",
    blurb:
      "Gemini 3.7 Flash pairs fast multimodal responses with prompt caching for repeated long contexts.",
    categories: ["vision", "speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "GPT-5.4",
    vendor: "OpenAI",
    blurb:
      "Preview GPT's powerful abilities with GPT-5.4, offering precise yet expansive answers in an accessible, versatile format.",
    categories: ["reasoning"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "DeepSeek V4 Flash Vision",
    vendor: "DeepSeek",
    blurb:
      "DeepSeek V4 Flash Vision is an experimental multimodal tier that reads images alongside text.",
    categories: ["vision"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "DeepSeek V4 Flash Fast",
    vendor: "DeepSeek",
    blurb:
      "DeepSeek V4 Flash Fast prioritises latency, returning answers sooner for interactive use.",
    categories: ["speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "Qwen 3.8 Flash",
    vendor: "Qwen",
    blurb:
      "Qwen 3.8 Flash trades a little depth for speed, ideal for quick answers and high-volume chat.",
    categories: ["speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "Qwen 3.8 Max",
    vendor: "Qwen",
    blurb:
      "Qwen 3.8 Max is the latest Qwen flagship, strong at multi-step reasoning over very long context.",
    categories: ["reasoning"],
    context: "Auto",
    latency: "Deep",
  },
  {
    name: "Qwen 3.8 Max 0902",
    vendor: "Qwen",
    blurb:
      "Qwen 3.8 Max 0902 is the dated flagship snapshot, pinned for reproducible results on long reasoning tasks.",
    categories: ["reasoning"],
    context: "Auto",
    latency: "Deep",
  },
  {
    name: "Muse Spark 1.2",
    vendor: "Meta",
    blurb:
      "Muse Spark 1.2 offers dependable creative and conversational output over a 1M token context.",
    categories: ["reasoning"],
    context: "1M",
    latency: "Balanced",
  },
  {
    name: "Muse Spark 1.3",
    vendor: "Meta",
    blurb:
      "Muse Spark 1.3 is Meta's newest Spark model, tuned for creative writing and open-ended conversation.",
    categories: ["reasoning"],
    context: "Auto",
    latency: "Balanced",
  },
  {
    name: "Muse Spark 1.3 Contributor",
    vendor: "Meta",
    blurb:
      "Muse Spark 1.3 Contributor is the low-cost community tier of Muse Spark 1.3 for everyday drafting.",
    categories: ["speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "Kimi K2.7 Code HighSpeed",
    vendor: "Moonshot",
    blurb:
      "Kimi K2.7 Code HighSpeed keeps the coding strengths of K2.7 while returning results faster.",
    categories: ["coding", "speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "MiMo V2.5",
    vendor: "Xiaomi",
    blurb:
      "MiMo V2.5 from Xiaomi delivers efficient everyday assistance with one of the lowest costs per token.",
    categories: ["speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "GLM-5.3",
    vendor: "Zhipu",
    blurb:
      "GLM-5.3 is the latest full GLM tier, strong at multilingual reasoning and code over a 1M token context.",
    categories: ["reasoning", "coding"],
    context: "1M",
    latency: "Balanced",
  },
  {
    name: "GLM-5.2 Fast",
    vendor: "Zhipu",
    blurb:
      "GLM-5.2 Fast is the low-latency GLM-5.2 variant for interactive sessions that cannot wait.",
    categories: ["speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "Step 3.7 Flash",
    vendor: "StepFun",
    blurb:
      "Step 3.7 Flash from StepFun answers quickly and cheaply, suited to short interactive exchanges.",
    categories: ["speed"],
    context: "Auto",
    latency: "Fast",
  },
  {
    name: "Step 3.5 Flash",
    vendor: "StepFun",
    blurb:
      "Step 3.5 Flash offers a 1M token context at one of the lowest prices in the catalogue.",
    categories: ["speed"],
    context: "1M",
    latency: "Fast",
  },
  {
    name: "Tencent Hy4 Preview",
    vendor: "Tencent",
    blurb:
      "Tencent Hunyuan 4 Preview is the newest Hunyuan generation, with a 1M token context for long documents.",
    categories: ["reasoning"],
    context: "1M",
    latency: "Balanced",
  },
  {
    name: "Inkling",
    vendor: "Thinking Machines",
    blurb:
      "Inkling from Thinking Machines is tuned for careful, well-structured reasoning and clear explanations.",
    categories: ["reasoning"],
    context: "Auto",
    latency: "Deep",
  },
  {
    name: "Inkling Small",
    vendor: "Thinking Machines",
    blurb:
      "Inkling Small is the lighter Inkling tier, keeping the same style at a lower cost per token.",
    categories: ["speed", "reasoning"],
    context: "Auto",
    latency: "Fast",
  },
];

const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "reasoning", label: "Reasoning & Math" },
  { id: "coding", label: "Coding Champions" },
  { id: "speed", label: "High-Speed / Low-Cost" },
  { id: "vision", label: "Multimodal Vision" },
];

const LATENCY_STYLE: Record<Latency, string> = {
  Fast: "text-neon",
  Balanced: "text-azure",
  Deep: "text-brand",
};

export function ModelsCatalog() {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const visible =
    active === "all" ? MODELS : MODELS.filter((m) => m.categories.includes(active));

  return (
    <section id="models" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="text-xs font-semibold tracking-[0.08em] text-accent-foreground uppercase">
            Models (38+)
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            Every frontier model. One interface.
          </h2>
          <p className="text-balance text-base text-muted-foreground sm:text-lg">
            The full EchoGPT roster - DeepSeek, OpenAI, Google, Qwen, Moonshot,
            xAI, GLM, and 30+ more. One unified chat, no swapping apps.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter models by category">
          {CATEGORIES.map(({ id, label }) => {
            const selected = active === id;
            const count =
              id === "all" ? MODELS.length : MODELS.filter((m) => m.categories.includes(id)).length;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300",
                  selected
                    ? "border-[var(--border-glow)] bg-primary/10 text-foreground shadow-[var(--shadow-glow)]"
                    : "border-border bg-surface text-muted-foreground hover:border-[var(--border-glow)] hover:text-foreground"
                )}
              >
                {label}
                <span className="ml-1 text-xs text-accent-foreground/70">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((m) => (
            <Card
              key={m.name}
              className="group flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:ring-[var(--border-glow)] hover:shadow-[var(--shadow-glow)]"
            >
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[0.95rem] leading-snug font-semibold text-foreground">
                    {m.name}
                  </h3>
                  <Badge variant="outline" className="shrink-0 text-muted-foreground">
                    {m.vendor}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{m.blurb}</p>
                <dl
                  className={cn(
                    "mt-auto grid grid-cols-2 gap-2",
                    "max-h-44 opacity-100"
                  )}
                >
                  <div className="rounded-lg bg-surface-elev px-3 py-2">
                    <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                      Context
                    </dt>
                    <dd className="text-sm font-medium text-foreground">{m.context}</dd>
                  </div>
                  <div className="rounded-lg bg-surface-elev px-3 py-2">
                    <dt className="text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                      Latency
                    </dt>
                    <dd className={cn("text-sm font-medium", LATENCY_STYLE[m.latency])}>
                      {m.latency}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <Link
                      href={WEB_APP_HREF}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "w-full justify-center"
                      )}
                    >
                      Test Model in EchoGPT
                      <ArrowUpRight />
                    </Link>
                  </div>
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-sm text-muted-foreground">
            The full roster is live on the platform and grows as EchoGPT adds
            new frontier models.
          </p>
          <Link
            href={WEB_APP_HREF}
            className={cn(buttonVariants({ variant: "default" }), "group/links")}
          >
            Browse all {MODELS.length} models
            <ArrowRight className="transition-transform group-hover/links:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}