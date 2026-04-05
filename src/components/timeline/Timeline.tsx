"use client";

import { useEffect, useRef, useState } from "react";
import H1 from "@/components/ui/H1";
import TimelineItem from "./TimelineItem";
import AsciiArt from "./AsciiArt";
import type { TimelineEntry } from "@/lib/types";

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const handleScroll = () => {
      const rect = outer.getBoundingClientRect();
      const scrollableHeight = outer.offsetHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      const segmentSize = 1 / entries.length;
      const hysteresis = segmentSize * 0.15;

      setActiveIndex((prev) => {
        const naturalIndex = Math.min(
          Math.floor(progress * entries.length),
          entries.length - 1,
        );

        // Large jumps (e.g. scrollbar drag): follow natural mapping immediately
        if (Math.abs(naturalIndex - prev) > 1) return naturalIndex;

        // Adjacent changes: require deliberate scroll past threshold
        if (prev < entries.length - 1 && progress > (prev + 1) * segmentSize + hysteresis) {
          return prev + 1;
        }
        if (prev > 0 && progress < prev * segmentSize - hysteresis) {
          return prev - 1;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [entries.length]);

  if (!entries.length) return null;

  // Each entry gets ~60vh of scroll distance, plus 100vh for the pinned view
  const outerHeight = `${entries.length * 60 + 100}vh`;

  return (
    <div ref={outerRef} style={{ height: outerHeight }}>
      <section className="sticky top-0 flex flex-col w-full px-[5.5rem] max-tablet:px-8 py-48 max-tablet:py-16 min-h-screen justify-center">
        <H1>Work.Work.Work.</H1>

        <div className="flex gap-12 max-tablet:flex-col">
          {/* Left: year badges + vertical line */}
          <div className="relative">
            <div
              className="absolute left-2 top-0 w-[2px] bg-accent-1 transition-all duration-500"
              style={{
                height: `${((activeIndex + 1) / entries.length) * 100}%`,
              }}
            />

            {entries.map((entry, i) => (
              <TimelineItem
                key={entry.order}
                entry={entry}
                reached={i <= activeIndex}
                active={i === activeIndex}
              />
            ))}
          </div>

          {/* Right: content cards stacked in the same position */}
          <div className="relative flex-1 min-h-[120px]">
            {entries.map((entry, i) => (
              <div
                key={entry.order}
                className={[
                  "absolute top-0 left-0 w-3/4 transition-all duration-500",
                  i === activeIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none",
                ].join(" ")}
              >
                <h3 className="text-[1.5rem] font-bold max-tablet:text-[1.25rem]">
                  <span className="text-accent-1">{entry.year}</span> &mdash;{" "}
                  {entry.title}
                </h3>
                <p className="text-xl mt-2 text-dark-grey">
                  {entry.description}
                </p>
                {entry.ascii && (
                  <div className="mt-8">
                    <AsciiArt art={entry.ascii} active={i === activeIndex} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
