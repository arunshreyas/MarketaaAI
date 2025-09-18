import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  splitType?: "chars" | "words";
  staggerDelay?: number;
  duration?: number;
  ease?: string;
  threshold?: number;
  delay?: number;
}

export const SplitText = ({
  text,
  tag: Tag = "p",
  className,
  splitType = "chars",
  staggerDelay = 0.1,
  duration = 0.8,
  ease = "power3.out",
  threshold = 0.1,
  delay = 0,
}: SplitTextProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const elementsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = elementsRef.current;
    
    // Set initial state
    gsap.set(elements, {
      opacity: 0,
      y: 50,
      rotationX: 90,
    });

    // Create intersection observer for scroll trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration,
              ease,
              stagger: staggerDelay,
              delay,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [text, staggerDelay, duration, ease, threshold, delay]);

  const splitText = () => {
    if (splitType === "words") {
      return text.split(" ").map((word, wordIndex) => (
        <span
          key={`word-${wordIndex}`}
          className="inline-block"
          style={{ perspective: "1000px" }}
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={`char-${wordIndex}-${charIndex}`}
              ref={(el) => {
                if (el) elementsRef.current.push(el);
              }}
              className="inline-block"
              style={{ transformOrigin: "50% 50% -50px" }}
            >
              {char}
            </span>
          ))}
          {wordIndex < text.split(" ").length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ));
    }

    return text.split("").map((char, index) => (
      <span
        key={`char-${index}`}
        ref={(el) => {
          if (el) elementsRef.current.push(el);
        }}
        className="inline-block"
        style={{ 
          transformOrigin: "50% 50% -50px",
          perspective: "1000px" 
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // Clear refs on text change
  useEffect(() => {
    elementsRef.current = [];
  }, [text]);

  return (
    <Tag
      ref={containerRef as any}
      className={cn("overflow-hidden", className)}
      style={{ perspective: "1000px" }}
    >
      {splitText()}
    </Tag>
  );
};