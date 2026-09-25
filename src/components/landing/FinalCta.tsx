import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChromeIcon } from "@/components/landing/ChromeIcon";
import { ADD_TO_CHROME_HREF, WEB_APP_HREF } from "@/lib/links";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section id="cta" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-card">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 [background-image:var(--echo-gradient-primary)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-72 w-[36rem] max-w-[90%] -translate-x-1/2 rounded-full opacity-60 blur-3xl [background:var(--echo-aura-violet)]"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-20">
            <span className="font-mono text-xs tracking-[0.22em] text-accent-foreground uppercase">
              {"// Get Started"}
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Ready to Supercharge Your Workflow with 38+ AI Models?
            </h2>
            <p className="text-pretty text-base text-muted-foreground sm:text-lg">
              Install the Chrome extension in 10 seconds or launch the web app
              directly.
            </p>
            <div className="mt-4 flex w-full max-sm:flex-col items-center justify-center gap-3 sm:w-auto">
              <Link
                href={ADD_TO_CHROME_HREF}
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "h-12 w-full gap-2 rounded-lg px-7 text-sm font-semibold sm:w-auto"
                )}
              >
                <ChromeIcon className="size-4" />
                Add to Chrome
              </Link>
              <Link
                href={WEB_APP_HREF}
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "h-12 w-full gap-2 rounded-lg px-7 text-sm font-semibold sm:w-auto"
                )}
              >
                Launch Web App
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              4.9/5 rating on the Chrome Web Store.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}