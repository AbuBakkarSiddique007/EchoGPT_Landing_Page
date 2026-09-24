import Link from "next/link";
import { Check, Rocket, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { API_DOCS_HREF, WEB_APP_HREF } from "@/lib/links";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

type Tier = {
  icon: typeof Rocket;
  code: string;
  tagline: string;
  name: string;
  price: string;
  period: string;
  note: string;
  groups: { label: string; items: string[] }[];
  cta: string;
  href: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    icon: Rocket,
    code: "FREE",
    tagline: "Test the waters",
    name: "Free Explorer",
    price: "$0",
    period: "/ forever",
    note: "No credit card required",
    groups: [
      {
        label: "Includes",
        items: [
          "Standard EchoGPT model",
          "Chrome extension basic summarizer",
          "Standard response speed",
        ],
      },
      {
        label: "Limits",
        items: ["5 fast messages per 5-hour window"],
      },
    ],
    cta: "Get Started Free",
    href: WEB_APP_HREF,
  },
  {
    icon: Sparkles,
    code: "PRO",
    tagline: "The full workspace",
    name: "Pro Creator",
    price: "$19",
    period: "/ month",
    note: "7-day free trial, no card",
    groups: [
      {
        label: "Includes",
        items: [
          "Unlimited messages with zero cooldowns",
          "All 38+ advanced frontier models",
          "Side-by-Side Echo Compare Mode",
          "High-resolution Image & Video Studio",
        ],
      },
      {
        label: "Performance & API",
        items: ["Priority low-latency routing", "10,000 monthly API credits"],
      },
    ],
    cta: "Start 7-Day Free Trial",
    href: WEB_APP_HREF,
    featured: true,
  },
  {
    icon: Terminal,
    code: "TEAM",
    tagline: "Build on EchoGPT",
    name: "Developer / Enterprise",
    price: "Custom",
    period: "",
    note: "Volume pricing & SLAs",
    groups: [
      {
        label: "Infrastructure",
        items: [
          "Unlimited API via api.echogpt.live",
          "Dedicated GPU inference pipelines",
          "Custom fine-tuned models & team workspace",
        ],
      },
    ],
    cta: "Contact Sales & Get API Key",
    href: API_DOCS_HREF,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs tracking-[0.22em] text-accent-foreground uppercase">
            {"// Pricing"}
          </span>
          <h2 className="text-balance mt-4 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Simple plans. Serious models.
          </h2>
          <p className="text-pretty mt-5 text-base text-muted-foreground sm:text-lg">
            One workspace, all 38+ frontier models. Start free for tinkering,
            upgrade when the cooldowns get in the way.
          </p>
        </div>

        <div className="relative isolate mt-16">
          <div
            aria-hidden
            className="bg-dot-grid absolute inset-x-0 -top-12 -bottom-16 -z-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,#000_25%,transparent_78%)]"
          />
          <div className="relative mx-auto grid max-w-xl gap-5 lg:max-w-none lg:grid-cols-3 lg:gap-6">
            {TIERS.map((tier) => (
              <Card
                key={tier.name}
                className={cn(
                  "relative flex flex-col overflow-visible rounded-lg border bg-card p-0 text-card-foreground ring-0 transition-colors duration-300",
                  tier.featured
                    ? "border border-[color:var(--echo-brand-500)] bg-primary text-primary-foreground"
                    : "border border-border hover:border-[var(--border-strong)]"
                )}
              >
                {tier.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 border-0 bg-primary-foreground px-3 py-1 font-mono text-[0.65rem] font-semibold tracking-[0.14em] text-primary uppercase shadow-none">
                    <Sparkles className="size-3" />
                    Most popular
                  </Badge>
                )}

                <div className="flex h-full flex-col p-7">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex size-9 items-center justify-center rounded-md",
                        tier.featured
                          ? "bg-white/15 text-white"
                          : "bg-secondary text-secondary-foreground"
                      )}
                    >
                      <tier.icon className="size-4.5" />
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[0.7rem] tracking-[0.2em]",
                        tier.featured ? "text-white/60" : "text-accent-foreground"
                      )}
                    >
                      {tier.code}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-sm",
                      tier.featured ? "text-white/70" : "text-muted-foreground"
                    )}
                  >
                    {tier.tagline}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="font-mono text-4xl font-semibold tracking-[-0.02em] lg:text-[2.5rem]">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span
                        className={cn(
                          "text-sm",
                          tier.featured ? "text-white/60" : "text-muted-foreground"
                        )}
                      >
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "mt-1.5 text-xs",
                      tier.featured ? "text-white/55" : "text-muted-foreground/75"
                    )}
                  >
                    {tier.note}
                  </p>

                  <div
                    className={cn(
                      "mt-6 h-px w-full",
                      tier.featured ? "bg-white/15" : "bg-border/70"
                    )}
                  />

                  <div className="mt-6 flex-1 space-y-5">
                    {tier.groups.map((group) => (
                      <div key={group.label}>
                        <span
                          className={cn(
                            "font-mono text-[0.65rem] tracking-[0.18em] uppercase",
                            tier.featured ? "text-white/55" : "text-muted-foreground"
                          )}
                        >
                          {group.label}
                        </span>
                        <ul className="mt-2.5 space-y-2.5">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm">
                              <Check
                                aria-hidden
                                className={cn(
                                  "mt-0.5 size-4 shrink-0",
                                  tier.featured ? "text-white" : "text-accent-foreground"
                                )}
                              />
                              <span
                                className={cn(
                                  tier.featured ? "text-white/90" : "text-foreground/80"
                                )}
                              >
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={tier.href}
                    className={cn(
                      buttonVariants({
                        variant: tier.featured ? "default" : "outline",
                        size: "default",
                      }),
                      "mt-8 h-11 w-full rounded-lg font-semibold transition-colors duration-200",
                      tier.featured
                        ? "border-0 bg-primary-foreground text-primary hover:bg-white/90 hover:text-primary"
                        : "border-0 bg-foreground text-background hover:bg-foreground/85 hover:text-background"
                    )}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prices in USD - cancel anytime - the Pro trial needs no credit card.
        </p>
      </div>
    </section>
  );
}