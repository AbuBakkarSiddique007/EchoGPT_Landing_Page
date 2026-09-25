import { Check, Crown, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Cell =
  | { kind: "text"; value: string }
  | { kind: "status"; value: "yes" | "partial" | "no" };

type Row = { feature: string; cells: [Cell, Cell, Cell, Cell] };

const yes: Cell = { kind: "status", value: "yes" };
const no: Cell = { kind: "status", value: "no" };

const HERO_COLUMNS = ["EchoGPT", "ChatGPT Plus", "Claude Pro", "Perplexity Pro"];
const HERO_SUB = ["Free · Pro $19/mo", "$20/mo", "$20/mo", "$20/mo"];

const ROWS: Row[] = [
  {
    feature: "Model Selection",
    cells: [
      { kind: "text", value: "38+ Frontier Models" },
      { kind: "text", value: "OpenAI Only" },
      { kind: "text", value: "Anthropic Only" },
      { kind: "text", value: "Limited (3-4 models)" },
    ],
  },
  {
    feature: "Side-by-Side Model Duel",
    cells: [yes, no, no, no],
  },
  {
    feature: "Chrome Extension Copilot",
    cells: [
      { kind: "text", value: "Yes (Full Sidepanel)" },
      { kind: "text", value: "Limited Web Page" },
      { kind: "text", value: "No" },
      { kind: "text", value: "Search-focused" },
    ],
  },
  {
    feature: "Developer API Access",
    cells: [
      { kind: "text", value: "Yes (Unified Endpoint)" },
      { kind: "text", value: "Separate Platform" },
      { kind: "text", value: "Separate Platform" },
      { kind: "text", value: "No API in Pro" },
    ],
  },
  {
    feature: "Image & Video Studio",
    cells: [
      { kind: "text", value: "Yes (Integrated)" },
      { kind: "text", value: "DALL-E only" },
      { kind: "text", value: "No Video" },
      { kind: "text", value: "Limited" },
    ],
  },
  {
    feature: "Starting Cost",
    cells: [
      { kind: "text", value: "Free (Pro: $19/mo)" },
      { kind: "text", value: "$20/month" },
      { kind: "text", value: "$20/month" },
      { kind: "text", value: "$20/month" },
    ],
  },
];

function StatusCell({ value }: { value: "yes" | "partial" | "no" }) {
  const Icon = value === "yes" ? Check : value === "partial" ? Minus : X;
  const label =
    value === "yes" ? "Yes" : value === "partial" ? "Partially supported" : "No";
  return (
    <span className="inline-flex items-center justify-center">
      <Icon
        aria-hidden
        className={cn(
          "size-4",
          value === "yes"
            ? "text-brand"
            : value === "partial"
              ? "text-azure"
              : "text-foreground/30"
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function WhyChoose() {
  return (
    <section id="compare" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="text-xs font-semibold tracking-[0.08em] text-accent-foreground uppercase">
            Why Echo GPT
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            Every model. One subscription.
          </h2>
          <p className="text-balance text-base text-muted-foreground sm:text-lg">
            The multi-model advantage, side by side with the tools you already
            use.
          </p>
        </div>

        <Separator className="mx-auto mt-12 w-full max-w-5xl" />

        <div className="mt-8 mx-auto max-w-5xl">
          <Card className="overflow-hidden transition-all duration-300 hover:border-[var(--border-glow)] hover:shadow-[var(--shadow-glow)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-0 table-fixed border-collapse break-words text-sm max-sm:text-xs max-sm:[&_td]:px-2 max-sm:[&_th]:px-2 sm:min-w-[42rem] sm:table-auto">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="px-4 py-4 text-left text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
                      Feature
                    </th>
                    {HERO_COLUMNS.map((name, i) => (
                      <th
                        key={name}
                        className={cn("min-w-0 px-4 py-4 text-left", i === 0 && "bg-primary/5")}
                      >
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          {i === 0 ? (
                            <Badge className="gap-1">
                              <Crown className="size-3" />
                              You
                            </Badge>
                          ) : (
                            <span className="text-xs font-semibold text-foreground">
                              {name}
                            </span>
                          )}
                          {i === 0 && (
                            <span className="text-sm font-semibold text-foreground">
                              EchoGPT
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 text-xs font-normal text-muted-foreground">
                          {HERO_SUB[i]}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.feature} className="border-b border-border/50 last:border-b-0">
                      <th className="px-4 py-3.5 text-left font-medium text-foreground/80">
                        {row.feature}
                      </th>
                      {row.cells.map((cell, i) => (
                        <td
                          key={i}
                          className={cn("px-4 py-3.5", i === 0 && "bg-primary/5")}
                        >
                          {cell.kind === "status" ? (
                            <StatusCell value={cell.value} />
                          ) : (
                            <span
                              className={cn(
                                "text-foreground/80",
                                i === 0 && "font-medium text-brand"
                              )}
                            >
                              {cell.value}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Pricing as per current product tiers. Pro unlocks all 38+ models,
            unlimited chats, Echo Compare, Studios, and API credits.
          </p>
        </div>
      </div>
    </section>
  );
}