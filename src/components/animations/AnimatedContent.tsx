import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface AnimatedContentProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  threshold?: number;
  delay?: number;
  stagger?: number;
}

export const AnimatedContent = ({
  children,
  className,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  threshold = 0.1,
  delay = 0,
  stagger = 0.1,
}: AnimatedContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.children;
    const elementsArray = Array.from(elements) as HTMLElement[];

    // Set initial state based on direction
    const initialProps = {
      opacity: 0,
      ...(direction === "vertical" && {
        y: reverse ? -distance : distance,
      }),
      ...(direction === "horizontal" && {
        x: reverse ? -distance : distance,
      }),
    };

    gsap.set(elementsArray, initialProps);

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            const animationProps = {
              opacity: 1,
              y: 0,
              x: 0,
              duration,
              ease,
              delay,
              stagger: elementsArray.length > 1 ? stagger : 0,
            };

            gsap.to(elementsArray, animationProps);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [distance, direction, reverse, duration, ease, threshold, delay, stagger]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
};