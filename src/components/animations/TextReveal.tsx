import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  duration?: number;
  ease?: string;
  threshold?: number;
  delay?: number;
  revealColor?: string;
}

export const TextReveal = ({
  text,
  tag: Tag = "p",
  className,
  duration = 1.2,
  ease = "power3.inOut",
  threshold = 0.1,
  delay = 0,
  revealColor = "hsl(var(--primary))",
}: TextRevealProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;

    const container = containerRef.current;
    const overlay = overlayRef.current;

    // Set initial state
    gsap.set(overlay, {
      scaleX: 1,
      transformOrigin: "left center",
    });

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            const tl = gsap.timeline({ delay });
            
            // First animate the overlay to reveal the text
            tl.to(overlay, {
              scaleX: 0,
              transformOrigin: "right center",
              duration: duration / 2,
              ease,
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [text, duration, ease, threshold, delay, revealColor]);

  return (
    <Tag
      ref={containerRef as any}
      className={cn("relative overflow-hidden inline-block", className)}
    >
      <span className="relative z-10">{text}</span>
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20"
        style={{ backgroundColor: revealColor }}
      />
    </Tag>
  );
};