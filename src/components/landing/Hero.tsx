import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChromeIcon } from "@/components/landing/ChromeIcon";
import { HeroPreview } from "@/components/landing/HeroPreview";
import { ADD_TO_CHROME_HREF, WEB_APP_HREF } from "@/lib/links";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden px-4 pt-8 pb-16 text-left sm:px-6 sm:pt-16 sm:pb-20 lg:px-8 lg:pt-24 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-16rem] -z-10 h-[44rem] w-[min(44rem,100vw)] -translate-x-1/2 rounded-full blur-2xl [background:radial-gradient(circle,var(--echo-brand-glow),transparent_65%)]"
      />
      <div
        aria-hidden
        className="animate-orb-pulse pointer-events-none absolute top-20 -left-20 -z-10 h-72 w-72 rounded-full opacity-60 blur-3xl [background:var(--echo-aura-azure)]"
      />
      <div
        aria-hidden
        className="animate-orb-pulse pointer-events-none absolute -right-20 bottom-16 -z-10 h-80 w-80 rounded-full opacity-50 blur-3xl [background:var(--echo-aura-magenta)]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex max-w-xl flex-col items-start gap-5">
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-[var(--border-glow)] bg-surface/70 px-3 py-1 text-xs font-medium text-foreground/75 shadow-sm backdrop-blur-sm"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            One workspace for 38+ frontier models
          </Badge>
          <h1 className="flex flex-col text-balance text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-foreground sm:text-5xl">
            <span className="animate-gradient-x bg-clip-text text-5xl font-extrabold tracking-[-0.03em] text-transparent [background-image:var(--echo-gradient-primary)] sm:text-6xl">
              EchoGPT
            </span>
            <span className="mt-2 sm:mt-3">One Chat Interface.</span>
            <span>
              38+ <span className="text-accent-foreground">World-Class AI Models</span>.
            </span>
          </h1>

          <p className="max-w-xl text-balance text-base leading-relaxed text-foreground/65 sm:text-lg">
            Replace ChatGPT, Claude &amp; Perplexity with real-time web intelligence and
            side-by-side compare - in your browser and on the web.
          </p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              render={
                <Link
                  href={ADD_TO_CHROME_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              nativeButton={false}
              size="lg"
              className="h-12 w-full justify-center rounded-full border-primary/30 bg-primary px-6 text-base text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] sm:w-auto"
            >
              <ChromeIcon className="size-4" />
              Add to Chrome
            </Button>
            <Button
              render={<Link href={WEB_APP_HREF} />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-12 w-full justify-center rounded-full border-[var(--border-glow)] bg-surface/60 px-6 text-base transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-ring hover:bg-muted hover:shadow-[var(--shadow-glow)] sm:w-auto"
            >
              <Sparkles className="size-4 text-accent-foreground" />
              Try EchoGPT in Browser
            </Button>
          </div>
          <p className="-mt-2 text-xs text-foreground/45">
            No app switching. Compare, create, and ship from one place.
          </p>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}