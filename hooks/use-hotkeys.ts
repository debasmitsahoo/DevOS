"use client";

import * as React from "react";

/**
 * Minimal global hotkey hook. Matches a single key with optional modifiers.
 * Example: useHotkey("k", () => open(), { meta: true, ctrl: true })
 */
export function useHotkey(
  key: string,
  handler: () => void,
  opts: { meta?: boolean; ctrl?: boolean; shift?: boolean } = {}
) {
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const modOk =
        (opts.meta || opts.ctrl ? e.metaKey || e.ctrlKey : true) &&
        (opts.shift ? e.shiftKey : true);
      if (e.key.toLowerCase() === key.toLowerCase() && modOk) {
        // don't hijack typing in inputs unless a modifier is required
        const target = e.target as HTMLElement | null;
        const typing =
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable);
        if (typing && !(opts.meta || opts.ctrl)) return;
        e.preventDefault();
        handler();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, handler, opts.meta, opts.ctrl, opts.shift]);
}