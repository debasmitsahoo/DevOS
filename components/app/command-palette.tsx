"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft, FileText, RefreshCw, Plus } from "lucide-react";
import { APP_NAV } from "@/config/nav";
import { useUIStore } from "@/stores/ui";
import { useHotkey } from "@/hooks/use-hotkeys";
import { cn } from "@/lib/utils";

interface Action {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  run: (router: ReturnType<typeof useRouter>) => void;
  group: "Navigate" | "Actions";
}

const ACTIONS: Action[] = [
  ...APP_NAV.map((n) => ({
    label: n.label,
    icon: n.icon,
    group: "Navigate" as const,
    run: (r: ReturnType<typeof useRouter>) => r.push(n.href),
  })),
  {
    label: "Generate résumé",
    icon: FileText,
    group: "Actions",
    run: (r) => r.push("/dashboard/resume"),
  },
  {
    label: "Re-sync GitHub",
    icon: RefreshCw,
    group: "Actions",
    run: () => {},
  },
  {
    label: "Add milestone",
    icon: Plus,
    group: "Actions",
    run: (r) => r.push("/dashboard/achievements"),
  },
];

export function CommandPalette() {
  const { commandOpen, setCommandOpen, toggleCommand } = useUIStore();
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useHotkey("k", toggleCommand, { meta: true, ctrl: true });
  useHotkey("Escape", () => setCommandOpen(false));

  const filtered = React.useMemo(
    () => ACTIONS.filter((a) => a.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  React.useEffect(() => {
    if (commandOpen) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [commandOpen]);

  React.useEffect(() => setActive(0), [query]);

  if (!commandOpen) return null;

  const run = (a: Action) => {
    setCommandOpen(false);
    a.run(router);
  };

  const groups = ["Navigate", "Actions"] as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setCommandOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border bg-popover shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter" && filtered[active]) {
                run(filtered[active]);
              }
            }}
            placeholder="Type a command or search…"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">No results.</p>
          )}
          {groups.map((group) => {
            const items = filtered.filter((a) => a.group === group);
            if (!items.length) return null;
            return (
              <div key={group} className="mb-1">
                <div className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {group}
                </div>
                {items.map((a) => {
                  const idx = filtered.indexOf(a);
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.label}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => run(a)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                        active === idx ? "bg-accent text-accent-foreground" : "text-foreground"
                      )}
                    >
                      <Icon className="size-4 text-muted-foreground" />
                      <span className="flex-1 text-left">{a.label}</span>
                      {active === idx && <CornerDownLeft className="size-3.5 text-muted-foreground" />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}