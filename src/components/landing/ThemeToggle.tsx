"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const THEME_KEY = "echogpt-theme";
const THEME_ORDER: Theme[] = ["dark", "light"];
const THEME_ICONS = {
  dark: Moon,
  light: Sun,
} as const;

function readTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "light" ? "light" : "dark";
}

const themeListeners = new Set<() => void>();

function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);
  return () => {
    themeListeners.delete(listener);
  };
}

function notifyTheme() {
  themeListeners.forEach((listener) => listener());
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribeTheme, readTheme, () => "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = theme;
    }
  }, [theme]);

  function cycleTheme() {
    const next = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length];
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(THEME_KEY, next);
    notifyTheme();
  }

  const Icon = THEME_ICONS[theme];

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label="Switch theme"
      className="group inline-flex size-8 items-center justify-center rounded-full text-foreground/70 transition-all duration-300 hover:scale-105 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
    >
      <Icon className="size-4 transition-transform duration-300 group-hover:rotate-12" />
    </button>
  );
}