"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hexagon } from "lucide-react";
import { APP_NAV } from "@/config/nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-14 items-center gap-2 px-4">
        <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
          <Hexagon className="size-4" />
        </span>
        <span className="font-semibold tracking-tight">DevOS</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-2 py-2">
        {APP_NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t p-3">
        <ThemeSwitcher className="w-full justify-between" />
        <div className="flex items-center gap-2 px-1">
          <span className="grid size-7 place-items-center rounded-full bg-muted text-xs font-medium">
            DS
          </span>
          <div className="min-w-0 flex-1 text-xs">
            <div className="truncate font-medium">Debasmit Sahoo</div>
            <div className="truncate text-muted-foreground">Free plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}