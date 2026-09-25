"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, ChevronDown, ExternalLink, LogIn, Menu, Sparkles, X } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLinkItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChromeIcon } from "@/components/landing/ChromeIcon";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import {
  ADD_TO_CHROME_HREF,
  DOCS_HREF,
  API_REFERENCE_HREF,
  WEB_APP_HREF,
} from "@/lib/links";
import { cn } from "@/lib/utils";

type NavLink = { label: string; href: string; external?: boolean };

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    window.history.pushState(null, "", "#top");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 shadow-[0_12px_32px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="#top"
          onClick={handleHomeClick}
          className="group flex shrink-0 items-center gap-2.5 rounded-full focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="EchoGPT - Home"
        >
          <span className="relative flex size-10 items-center justify-center rounded-xl border border-[var(--border-glow)] bg-surface p-0.5 shadow-[var(--shadow-glow)] transition-transform duration-300 group-hover:scale-[1.04]">
            <span className="absolute inset-0 rounded-xl opacity-70 [background:var(--echo-gradient-primary)]" />
            <Image
              src="/logo-echogpt.svg"
              alt="EchoGPT logo"
              width={40}
              height={40}
              priority
              className="relative size-full rounded-[0.65rem] bg-background object-cover"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-mono text-base font-bold tracking-[0.16em] text-foreground sm:text-lg">
              Echo<span className="text-accent-foreground">GPT</span>
            </span>
            <span className="mt-1 hidden font-mono text-[0.5rem] font-medium tracking-[0.3em] text-foreground/45 uppercase sm:block">
              Multi-model AI
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-0 rounded-full border border-border/80 bg-surface/90 p-1 shadow-[var(--shadow-md)] backdrop-blur-xl md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={link.href === "#top" ? handleHomeClick : undefined}
              className="group relative whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.01em] text-foreground/65 transition-all duration-300 ease-out after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-accent-foreground after:transition-[width] after:duration-300 after:ease-out hover:bg-muted/80 hover:text-foreground hover:after:w-1/2 focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger
              openOnHover
              delay={120}
              closeDelay={100}
              className="group relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.01em] text-foreground/65 transition-all duration-300 ease-out hover:bg-muted/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:text-sm"
            >
              <BookOpen className="size-3.5 transition-transform duration-300 group-hover:-rotate-6 sm:size-4" />
              Docs
              <ChevronDown className="size-3.5 transition-transform duration-300 group-aria-expanded:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuPositioner sideOffset={8} align="center">
                <DropdownMenuPopup>
                  <DropdownMenuLinkItem
                    href={DOCS_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen className="size-4 text-accent-foreground" />
                    <span className="flex flex-col gap-0.5">
                      <span>Docs</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        Explore the platform
                      </span>
                    </span>
                    <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
                  </DropdownMenuLinkItem>
                  <DropdownMenuLinkItem
                    href={API_REFERENCE_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen className="size-4 text-accent-foreground" />
                    <span className="flex flex-col gap-0.5">
                      <span>API Docs</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        Build with EchoGPT
                      </span>
                    </span>
                    <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
                  </DropdownMenuLinkItem>
                </DropdownMenuPopup>
              </DropdownMenuPositioner>
            </DropdownMenuPortal>
          </DropdownMenu>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden gap-1.5 text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground lg:inline-flex"
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
              "gap-1.5 rounded-lg border-primary/30 bg-primary text-primary-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
            )}
          >
            <ChromeIcon className="size-4" />
            Add to Chrome
          </Link>
          <Link
            href={WEB_APP_HREF}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden gap-1.5 rounded-lg border-border/80 bg-surface/70 text-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-ring hover:bg-muted hover:shadow-md lg:inline-flex"
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
            <span className="relative flex size-4 items-center justify-center">
              <Menu
                className={cn(
                  "absolute size-4 transition-all duration-300 ease-out",
                  open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                )}
              />
              <X
                className={cn(
                  "absolute size-4 transition-all duration-300 ease-out",
                  open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "grid border-t border-border/60 bg-background/80 backdrop-blur-md transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden px-4 pb-4">
          <nav aria-label="Main mobile" className="flex flex-col gap-1 pt-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={
                  link.href === "#top"
                    ? handleHomeClick
                    : () => setOpen(false)
                }
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-all duration-200 ease-out hover:translate-x-0.5 hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-1 rounded-lg border border-border/60 bg-surface/50 p-1">
              <Link
                href={DOCS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
              >
                <BookOpen className="size-4 text-accent-foreground" />
                Docs
                <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
              </Link>
              <Link
                href={API_REFERENCE_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
              >
                <BookOpen className="size-4 text-accent-foreground" />
                API Docs
                <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
              </Link>
            </div>
            <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3">
              <Link
                href={ADD_TO_CHROME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "gap-1.5 rounded-lg border-primary/30 bg-primary text-primary-foreground shadow-sm"
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
                  "gap-1.5 rounded-lg border-border/80 bg-surface/70 shadow-sm"
                )}
              >
                <Sparkles className="size-4 text-accent-foreground" />
                Try Web App
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}