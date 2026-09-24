"use client";

import Image from "next/image";
import { Brain, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const PROMPT = "Compare DeepSeek V4 vs GPT-5.6 on complex code refactoring.";
const RESPONSE =
  "DeepSeek V4 wins on large diffs: its 1M context keeps the whole file in view, so it refactors 10k+ line modules in one pass. GPT-5.6 writes cleaner minimal patches but truncates earlier. Pick DeepSeek for big PRs, GPT-5.6 for surgical fixes.";

type Stage = "prompt" | "thinking" | "answer" | "hold";

interface PreviewState {
  stage: Stage;
  p: number;
  r: number;
}

const FINAL: PreviewState = { stage: "hold", p: PROMPT.length, r: RESPONSE.length };

export function HeroPreview() {
  const [state, setState] = useState<PreviewState>(FINAL);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    (async () => {
      while (alive) {
        setState({ stage: "prompt", p: 0, r: 0 });
        for (let i = 1; i <= PROMPT.length; i++) {
          if (!alive) return;
          setState((s) => ({ ...s, p: i }));
          await wait(16);
        }
        if (!alive) return;
        setState((s) => ({ ...s, stage: "thinking" }));
        await wait(1500);
        if (!alive) return;
        setState((s) => ({ ...s, stage: "answer" }));
        for (let i = 2; i <= RESPONSE.length; i += 2) {
          if (!alive) return;
          setState((s) => ({ ...s, r: i }));
          await wait(14);
        }
        if (!alive) return;
        setState(FINAL);
        await wait(3800);
      }
    })();

    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const { stage, p, r } = state;
  const promptText = PROMPT.slice(0, p);
  const responseText = RESPONSE.slice(0, r);
  const typing = stage === "prompt" && p < PROMPT.length;
  const streaming = stage === "answer" && r < RESPONSE.length;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-surface/80 shadow-[var(--shadow-lg)] backdrop-blur-md">
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
          <span className="size-2 rounded-full [background:var(--model-deepseek)]" />
          DeepSeek V4
          <ChevronDown className="size-3 text-foreground/50" />
        </span>
        <span className="text-[11px] font-medium tracking-[0.08em] text-foreground/45 uppercase">
          1M context · live
        </span>
      </div>

      <div className="flex min-h-[17rem] flex-col gap-4 p-4 sm:min-h-[19rem]">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm border border-primary/25 bg-primary/15 px-3.5 py-2.5 text-left text-sm leading-relaxed text-foreground">
            {promptText}
            {typing && <span className="ml-0.5 inline-block animate-pulse">▍</span>}
          </div>
        </div>

        {stage !== "prompt" && (
          <div className="flex items-start gap-3">
            <Image
              src="/logo-echogpt.svg"
              alt=""
              width={28}
              height={28}
              className="size-7 shrink-0 rounded-lg"
            />
            <div className="min-w-0 flex-1">
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
                <p className="text-left text-sm leading-relaxed whitespace-pre-line text-foreground/85">
                  {responseText}
                  {streaming && <span className="ml-0.5 inline-block animate-pulse">▍</span>}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}