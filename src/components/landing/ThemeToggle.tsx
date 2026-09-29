"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_KEY } from "@/lib/theme";

export function ThemeToggle() {
  function cycleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    if (next === "dark") {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = next;
    }
    window.localStorage.setItem(THEME_KEY, next);
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label="Switch theme"
      className="group inline-flex size-8 items-center justify-center rounded-full text-foreground/70 transition-all duration-300 hover:scale-105 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
    >
      <Moon className="size-4 transition-transform duration-300 group-hover:rotate-12 [[data-theme=light]_&]:hidden" />
      <Sun className="hidden size-4 transition-transform duration-300 group-hover:rotate-12 [[data-theme=light]_&]:block" />
    </button>
  );
}
