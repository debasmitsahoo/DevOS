import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Avatar({
  src,
  alt,
  fallback,
  size = 40,
  className,
}: {
  src?: string | null;
  alt: string;
  fallback?: string;
  size?: number;
  className?: string;
}) {
  const initials =
    fallback ??
    alt
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground font-medium select-none",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </span>
  );
}

export { Avatar };