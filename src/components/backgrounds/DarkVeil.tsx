import React from "react";
import { cn } from "@/lib/utils";

interface DarkVeilProps {
  className?: string;
  children?: React.ReactNode;
}

// DarkVeil background inspired by React Bits "Dark Veil".
// Layered gradients + soft radial glows for a cinematic dark backdrop.
const DarkVeil: React.FC<DarkVeilProps> = ({ className, children }) => {
  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden>
      {/* Base background tied to design tokens */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(var(--background))] to-[hsl(var(--background))]" />

      {/* Veil overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Soft radial glows (subtle electric tint from design tokens) */}
      <div className="pointer-events-none absolute -top-1/3 -left-1/3 w-[80vw] h-[80vw] rounded-full blur-3xl opacity-50 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.15)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-1/3 -right-1/3 w-[80vw] h-[80vw] rounded-full blur-3xl opacity-45 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.12)_0%,transparent_60%)]" />

      {/* Subtle texture/light pass */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_60%)]" />

      {/* Slot to allow stacking if needed */}
      {children}
    </div>
  );
};

export default DarkVeil;
