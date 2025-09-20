import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  ease?: string;
  threshold?: number;
  delay?: number;
  scale?: number;
}

export const FadeInOnScroll = ({
  children,
  className,
  direction = "up",
  distance = 50,
  duration = 0.8,
  ease = "power3.out",
  threshold = 0.1,
  delay = 0,
  scale = 1,
}: FadeInOnScrollProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Set initial state based on direction
    const initialProps: any = {
      opacity: 0,
      scale: scale === 1 ? undefined : 0.8,
    };

    switch (direction) {
      case "up":
        initialProps.y = distance;
        break;
      case "down":
        initialProps.y = -distance;
        break;
      case "left":
        initialProps.x = distance;
        break;
      case "right":
        initialProps.x = -distance;
        break;
    }

    gsap.set(element, initialProps);

    // Create intersection observer with lower threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(element, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: scale,
              duration,
              ease,
              delay,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01 }
    );

    observer.observe(element);

    // Fallback timeout to ensure visibility
    const fallbackTimer = setTimeout(() => {
      gsap.to(element, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: scale,
        duration: duration * 0.5,
        ease,
        delay,
      });
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [direction, distance, duration, ease, threshold, delay, scale]);

  return (
    <div ref={elementRef} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
};