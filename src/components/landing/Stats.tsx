import { Star, Timer, Users, Zap } from "lucide-react";

const STATS = [
  { icon: Star, value: "4.9/5", label: "Rating on Chrome Store" },
  { icon: Zap, value: "38+", label: "Models Active" },
  { icon: Timer, value: "<0.8s", label: "First-Token Latency" },
  { icon: Users, value: "50,000+", label: "Active Users" },
];

export function Stats() {
  return (
    <section className="border-y border-border/60 bg-background/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-0 gap-y-6 px-4 py-10 sm:px-6 sm:divide-x sm:divide-border/60 lg:px-8">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex w-1/2 flex-col items-center gap-1 px-4 text-center sm:w-auto sm:px-8"
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground sm:text-base">
                <Icon className="size-4 text-accent-foreground" />
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.08em] text-foreground/60">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}