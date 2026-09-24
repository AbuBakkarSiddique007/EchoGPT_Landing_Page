"use client";

import Image from "next/image";
import Link from "next/link";
import { LogIn, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { ChromeIcon } from "@/components/landing/ChromeIcon";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { ADD_TO_CHROME_HREF, API_DOCS_HREF, WEB_APP_HREF } from "@/lib/links";
import { cn } from "@/lib/utils";

type NavLink = { label: string; href: string; external?: boolean };

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Models (38+)", href: "#models" },
  { label: "Compare", href: "#compare" },
  { label: "Pricing", href: "#pricing" },
  { label: "API Docs", href: API_DOCS_HREF, external: true },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="#top"
          className="group flex shrink-0 items-center gap-2 rounded-full focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="EchoGPT - Home"
        >
          <Image
            src="/logo-echogpt.svg"
            alt="EchoGPT logo"
            width={40}
            height={40}
            priority
            className="size-10 rounded-full transition-[box-shadow] duration-500 group-hover:shadow-[var(--shadow-glow)]"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="relative whitespace-nowrap rounded-sm px-1 py-1 text-sm font-medium text-foreground/75 transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent-foreground after:transition-transform after:duration-300 after:ease-out hover:text-accent-foreground hover:after:scale-x-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
            )}
          >
            <LogIn className="size-4" />
            Sign In
          </Link>
          <Link
            href={ADD_TO_CHROME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "gap-1.5 rounded-full [background-image:var(--echo-gradient-primary)] text-white shadow-[var(--shadow-glow)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg active:scale-[0.98]"
            )}
          >
            <ChromeIcon className="size-4" />
            Add to Chrome
          </Link>
          <Link
            href={WEB_APP_HREF}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-1.5 rounded-full border-[var(--border-glow)] text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-ring hover:shadow-[var(--shadow-glow)]"
            )}
          >
            <Sparkles className="size-4 text-accent-foreground" />
            Try Web App
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-8 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-border/60 bg-background/80 px-4 pb-4 backdrop-blur-md md:hidden"
        >
          <nav aria-label="Main mobile" className="flex flex-col gap-1 pt-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-all duration-200 ease-out hover:translate-x-0.5 hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3">
              <Link
                href={ADD_TO_CHROME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "gap-1.5 rounded-full [background-image:var(--echo-gradient-primary)] text-white shadow-[var(--shadow-glow)]"
                )}
              >
                <ChromeIcon className="size-4" />
                Add to Chrome
              </Link>
              <Link
                href={WEB_APP_HREF}
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-1.5 rounded-full border-[var(--border-glow)]"
                )}
              >
                <Sparkles className="size-4 text-accent-foreground" />
                Try Web App
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}