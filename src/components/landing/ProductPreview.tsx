"use client";

import Image from "next/image";
import {
  Brain,
  Check,
  ChevronDown,
  Copy,
  LayoutPanelLeft,
  Search,
  ArrowDownRight,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PROMPT = "Compare DeepSeek V4 vs GPT-5.6 on complex code refactoring.";
const ANSWER =
  "DeepSeek V4 holds the full 1M-token context, so it replans the whole module in one pass - ideal for 10k+ line diffs. GPT-5.6 writes tighter, surgical patches instead. Pick DeepSeek for big refactors, GPT-5.6 for precision edits.\n\nHere is the extracted patch I would ship:";
const CODE =
  "async function loadUser(id: string) {\n  const { data } = await api.get(\"/users/\" + id);\n  return data as User;\n}\n";
const THINK_STEPS = [
  "Parsed 1M-context map of repo",
  "Branched 3 candidate refactors",
  "Validated API contracts",
];

type Stage = "prompt" | "thinking" | "answer" | "done";

interface PreviewState {
  stage: Stage;
  p: number;
  r: number;
}

const FINAL: PreviewState = { stage: "done", p: PROMPT.length, r: ANSWER.length };

export function ProductPreview() {
  const [state, setState] = useState<PreviewState>(FINAL);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    (async () => {
      setState({ stage: "prompt", p: 0, r: 0 });
      for (let i = 1; i <= PROMPT.length; i++) {
        if (!alive) return;
        setState((s) => ({ ...s, stage: "prompt", p: i }));
        await wait(15);
      }

      if (!alive) return;
      setState((s) => ({ ...s, stage: "thinking" }));

      await wait(1500);

      if (!alive) return;

      setState((s) => ({ ...s, stage: "answer" }));
      for (let i = 2; i <= ANSWER.length; i += 2) {
        if (!alive) return;
        setState((s) => ({ ...s, r: i }));
        await wait(13);
      }

      if (!alive) return;
      setState(FINAL);
    })();

    return () => {
      alive = false;

      if (timer) clearTimeout(timer);

      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);

      if (copyTimer.current) clearTimeout(copyTimer.current);
      
      copyTimer.current = setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  const { stage, p, r } = state;
  const promptText = PROMPT.slice(0, p);
  const answerText = ANSWER.slice(0, r);
  const typing = stage === "prompt" && p < PROMPT.length;
  const streaming = stage === "answer" && r < ANSWER.length;

  return (
    <section id="preview" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs tracking-[0.22em] text-accent-foreground uppercase">
            {"// Product Preview"}
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            The chat interface. Live.
          </h2>
          <p className="text-balance text-base text-muted-foreground sm:text-lg">
            The full EchoGPT workspace, right in your browser - expand the
            reasoning, copy the code, and feel the difference.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="pointer-events-none absolute top-10 -left-4 hidden rounded-full border border-border/60 bg-surface/80 px-3.5 py-2 text-xs font-medium text-foreground/80 shadow-[var(--shadow-lg)] backdrop-blur-md md:flex md:items-center md:gap-2">
            <Zap className="size-3.5 text-accent-foreground" />
            Real-time Multi-Model Routing
          </div>
          <div className="pointer-events-none absolute top-28 -right-4 z-20 hidden rounded-full border border-border/60 bg-surface/80 px-3.5 py-2 text-xs font-medium text-foreground/80 shadow-[var(--shadow-lg)] backdrop-blur-md lg:flex lg:items-center lg:gap-2">
            <LayoutPanelLeft className="size-3.5 text-accent-foreground" />
            1-Click Browser Sidepanel
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface/80 shadow-[var(--shadow-xl)] backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-border/60 bg-background/40 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-2 flex-1 truncate rounded-md border border-border/40 bg-background/60 px-3 py-1 text-xs text-foreground/50">
                echogpt.live/chat
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-2.5 py-1 text-xs font-medium text-foreground/80">
                <Image
                  src="/logo-echogpt.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 rounded"
                />
                EchoGPT
              </span>
              <span className="text-[11px] font-medium tracking-[0.08em] text-foreground/45 uppercase">
                duel · DeepSeek V4 vs GPT-5.6
              </span>
            </div>

            <div className="flex min-h-[24rem] flex-col gap-5 p-4 sm:min-h-[26rem] sm:p-6">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm border border-primary/25 bg-primary/15 px-4 py-2.5 text-left text-sm leading-relaxed text-foreground">
                  {promptText}
                  {typing && <span className="ml-0.5 inline-block animate-pulse">▍</span>}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Image
                  src="/logo-echogpt.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 shrink-0 rounded-lg"
                />
                <div className="min-w-0 flex-1 space-y-3">
                  {stage === "thinking" ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1.5 text-xs text-foreground/70">
                      <Brain className="size-3.5 text-accent-foreground" />
                      Thought for 2.8s
                      <span className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="size-1.5 animate-bounce rounded-full bg-foreground/40"
                            style={{ animationDelay: `${i * 150}ms` }}
                          />
                        ))}
                      </span>
                    </span>
                  ) : (
                    <>
                      <details className="group" open>
                        <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3 py-1.5 text-xs text-foreground/70 [&::-webkit-details-marker]:hidden">
                          <Brain className="size-3.5 text-accent-foreground" />
                          Thought for 2.8s
                          <ChevronDown className="size-3.5 text-foreground/50 transition-transform duration-300 group-open:rotate-180" />
                        </summary>
                        <div className="mt-3 space-y-2 rounded-xl border border-border/60 bg-background/40 p-3">
                          {THINK_STEPS.map((step, i) => (
                            <div
                              key={step}
                              className="flex items-center gap-2 text-xs text-foreground/65"
                            >
                              <span className="size-1.5 shrink-0 rounded-full bg-accent-foreground/60" />
                              {step}
                              <span className="ml-auto font-mono text-foreground/35">
                                {i + 1}/3
                              </span>
                            </div>
                          ))}
                        </div>
                      </details>

                      <p className="relative text-left text-sm leading-relaxed whitespace-pre-line text-foreground/85">
                        {answerText}
                        {streaming && (
                          <span className="ml-0.5 inline-block animate-pulse">▍</span>
                        )}
                      </p>

                      <div className="overflow-hidden rounded-xl border border-border/50 bg-background/40">
                        <div className="flex items-center justify-between border-b border-border/50 px-3 py-1.5">
                          <span className="text-xs font-medium text-foreground/60">
                            refactor.ts
                          </span>
                          <button
                            type="button"
                            onClick={onCopy}
                            aria-label="Copy code snippet"
                            className="inline-flex items-center gap-1.5 rounded-md text-xs font-medium text-accent-foreground transition-colors hover:text-foreground"
                          >
                            {copied ? (
                              <>
                                <Check className="size-3.5 text-neon" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="size-3.5" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="overflow-x-auto px-3 py-2.5 font-mono text-[0.8rem] leading-relaxed text-foreground/80">
                          {CODE}
                        </pre>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-3 bottom-6 z-10 hidden w-56 rounded-xl border border-border/60 bg-surface/90 p-3 shadow-[var(--shadow-xl)] backdrop-blur-md sm:block">
            <div className="flex items-center gap-2 border-b border-border/50 pb-2">
              <Image
                src="/logo-echogpt.svg"
                alt=""
                width={20}
                height={20}
                className="size-5 rounded-md"
              />
              <span className="text-xs font-semibold text-foreground">EchoGPT Copilot</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-2 py-0.5 text-[11px] text-foreground/70">
                <span className="size-1.5 rounded-full [background:var(--model-deepseek)]" />
                DeepSeek V4
              </span>
              <ArrowDownRight className="size-3.5 rotate-90 text-foreground/40" />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-2.5 py-1.5 text-xs text-foreground/45">
              <Search className="size-3.5" />
              Ask anything…
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded-full border border-border/60 bg-background/50 px-2 py-0.5 text-[11px] text-foreground/70">
                Summarize tab
              </span>
              <span className="rounded-full border border-border/60 bg-background/50 px-2 py-0.5 text-[11px] text-foreground/70">
                Explain selection
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}