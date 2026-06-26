"use client";

import { Bell, Search } from "lucide-react";
import { useUIStore } from "@/stores/ui";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function TopBar({ name }: { name: string }) {
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);
  const first = name.split(" ")[0];

  return (
    <header className="flex h-14 items-center gap-3 border-b px-4 md:px-6">
      <div className="flex-1">
        <h1 className="text-sm font-medium md:text-base">
          {greeting()}, {first} <span className="text-muted-foreground">👋</span>
        </h1>
      </div>

      <button
        onClick={() => setCommandOpen(true)}
        className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm text-muted-foreground transition-colors hover:bg-accent"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="ml-2 hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      <button className="relative grid size-9 place-items-center rounded-md border bg-card text-muted-foreground transition-colors hover:bg-accent">
        <Bell className="size-4" />
        <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
      </button>
    </header>
  );
}