"use client";

import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const PROMPT = "Refactor a 3,000-line API handler for reliability.";
const LINES_A = [
  "Split into 6 micro-services.",
  "Adds retry + circuit breaker.",
  "Keeps API contract intact.",
];
const LINES_B = [
  "Single-file rewrite.",
  "Async loop, 12 lines fewer.",
  "Flags 2 latency edge cases.",
];
const VERDICT = "GPT-5.6 · faster";

interface CompareState {
  a: number;
  b: number;
  verdict: boolean;
}

const FINAL: CompareState = { a: LINES_A.length, b: LINES_B.length, verdict: true };

export function ComparePreview() {
  const [state, setState] = useState<CompareState>(FINAL);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    (async () => {
      type Step = { at: number; apply: (s: CompareState) => CompareState };
      const steps: Step[] = [
        { at: 200, apply: (s) => ({ ...s, b: 1 }) },
        { at: 800, apply: (s) => ({ ...s, b: 2 }) },
        { at: 1400, apply: (s) => ({ ...s, b: 3 }) },
        { at: 2200, apply: (s) => ({ ...s, a: 1 }) },
        { at: 2800, apply: (s) => ({ ...s, a: 2 }) },
        { at: 3400, apply: (s) => ({ ...s, a: 3 }) },
        { at: 4000, apply: (s) => ({ ...s, verdict: true }) },
      ];

      while (alive) {
        setState({ a: 0, b: 0, verdict: false });
        let elapsed = 0;
        for (const step of steps) {
          await wait(step.at - elapsed);
          elapsed = step.at;
          if (!alive) return;
          setState(step.apply);
        }
        if (!alive) return;
        await wait(3200);
      }
    })();

    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const { a, b, verdict } = state;
  const streamingA = a < LINES_A.length;
  const streamingB = b < LINES_B.length;

  return (
    <div className="relative mt-2 grid flex-1 grid-cols-2 gap-2">
      <div className="flex flex-col rounded-lg border border-border/50 bg-background/50 p-3">
        <div className="flex items-center justify-between gap-1.5">
          <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
            <span className="size-1.5 rounded-full [background:var(--model-deepseek)]" />
            DeepSeek V4
          </span>
          {streamingA && <span className="text-[10px] text-foreground/40">typing…</span>}
        </div>
        <p className="mt-1 truncate text-[10px] text-foreground/45">{PROMPT}</p>
        <ul className="mt-2 space-y-1.5">
          {LINES_A.slice(0, a).map((line) => (
            <li
              key={line}
              className="flex items-start gap-1.5 text-xs leading-snug text-foreground/70"
            >
              <span className="mt-1 size-1 shrink-0 rounded-full bg-accent-foreground/60" />
              {line}
            </li>
          ))}
          {streamingA && (
            <li className="animate-pulse text-xs text-foreground/40">▍</li>
          )}
        </ul>
      </div>

      <div className="flex flex-col rounded-lg border border-border/50 bg-background/50 p-3">
        <div className="flex items-center justify-between gap-1.5">
          <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
            <span className="size-1.5 rounded-full [background:var(--model-openai)]" />
            GPT-5.6
          </span>
          {streamingB && <span className="text-[10px] text-foreground/40">typing…</span>}
        </div>
        <p className="mt-1 truncate text-[10px] text-foreground/45">{PROMPT}</p>
        <ul className="mt-2 space-y-1.5">
          {LINES_B.slice(0, b).map((line) => (
            <li
              key={line}
              className="flex items-start gap-1.5 text-xs leading-snug text-foreground/70"
            >
              <span className="mt-1 size-1 shrink-0 rounded-full bg-accent-foreground/60" />
              {line}
            </li>
          ))}
          {streamingB && (
            <li className="animate-pulse text-xs text-foreground/40">▍</li>
          )}
        </ul>
      </div>

      <span
        className={cn(
          "absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-[var(--border-glow)] px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-accent-foreground transition-all duration-300",
          verdict && "bg-primary/20 shadow-[var(--shadow-glow)]"
        )}
      >
        {verdict ? (
          <>
            <Zap className="size-2.5" />
            {VERDICT}
          </>
        ) : (
          "VS"
        )}
      </span>
    </div>
  );
}