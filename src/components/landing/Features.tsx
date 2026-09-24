import {
  ArrowLeftRight,
  Brain,
  Clapperboard,
  Code2,
  MousePointerClick,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ComparePreview } from "@/components/landing/ComparePreview";

const COPILOT_ACTIONS = [
  { label: "Summarize" },
  { label: "Translate" },
  { label: "Rephrase" },
  { label: "Explain" },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="text-xs font-semibold tracking-[0.08em] text-accent-foreground uppercase">
            Features
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            Superpowers, built-in.
          </h2>
          <p className="text-balance text-base text-foreground/65 sm:text-lg">
            One workspace, every model, all the tools you need to ship faster.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            className={cn(
              "sm:col-span-2 sm:row-span-2",
              "transition-all duration-300 hover:-translate-y-1 hover:ring-[var(--border-glow)] hover:shadow-[var(--shadow-glow)]"
            )}
          >
            <CardContent className="flex h-full flex-col gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/15 text-accent-foreground">
                <ArrowLeftRight className="size-5" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Side-by-Side Echo Compare
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                Run any prompt against two models at once to see who answers better and faster.
              </p>

              <ComparePreview />
            </CardContent>
          </Card>

          <Card
            className={cn(
              "sm:col-span-2",
              "transition-all duration-300 hover:-translate-y-1 hover:ring-[var(--border-glow)] hover:shadow-[var(--shadow-glow)]"
            )}
          >
            <CardContent className="flex h-full flex-col gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/15 text-accent-foreground">
                <Brain className="size-5" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Deep Reasoning &amp; Chain-of-Thought
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                Inspect how the AI solved complex problems with expandable thought timelines.
              </p>
              <div className="mt-2 flex flex-col gap-2">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-foreground/70">
                  <Brain className="size-3.5 text-accent-foreground" />
                  Thought for 2.8s
                </span>
                <div className="space-y-2">
                  {["Parsed 1M-context map", "Branched 3 candidate refactors", "Validated API contracts"].map(
                    (step, i) => (
                      <div key={step} className="flex items-center gap-2 text-xs text-foreground/65">
                        <span className="size-1.5 shrink-0 rounded-full bg-accent-foreground/60" />
                        {step}
                        <span className="font-mono text-foreground/35">{i + 1}/3</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "transition-all duration-300 hover:-translate-y-1 hover:ring-[var(--border-glow)] hover:shadow-[var(--shadow-glow)]"
            )}
          >
            <CardContent className="flex h-full flex-col gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/15 text-accent-foreground">
                <Clapperboard className="size-5" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Image &amp; Video Studios
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                Create stunning visual concepts without leaving the conversation.
              </p>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "transition-all duration-300 hover:-translate-y-1 hover:ring-[var(--border-glow)] hover:shadow-[var(--shadow-glow)]"
            )}
          >
            <CardContent className="flex h-full flex-col gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/15 text-accent-foreground">
                <Code2 className="size-5" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Developer-Grade API Bridge
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                Use the exact same models via standard cURL requests.
              </p>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-border/50 bg-background/40 p-3 font-mono text-xs leading-relaxed text-foreground/70">
                <span className="text-accent-foreground">$</span> curl api.echogpt.live/v1/chat/
                completions
              </pre>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "sm:col-span-2 lg:col-span-4",
              "transition-all duration-300 hover:-translate-y-1 hover:ring-[var(--border-glow)] hover:shadow-[var(--shadow-glow)]"
            )}
          >
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-accent-foreground">
                <MousePointerClick className="size-5" />
              </span>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Universal Browser Copilot
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                  Highlight text on any website to summarize, translate, or rewrite instantly.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {COPILOT_ACTIONS.map((action) => (
                  <Badge key={action.label} variant="outline">
                    {action.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}