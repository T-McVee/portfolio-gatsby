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
  const activeIndexRef = useRef(0);
  const cooldownRef = useRef(false);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = outer.getBoundingClientRect();
      // Only intercept while the outer container spans the viewport (section is sticky)
      if (rect.top > 0 || rect.bottom < window.innerHeight) return;

      const goingDown = e.deltaY > 0;
      const current = activeIndexRef.current;

      // At boundaries, let scroll pass through naturally
      if (goingDown && current >= entries.length - 1) return;
      if (!goingDown && current <= 0) return;

      // In the sticky zone and not at a boundary — always block scroll
      e.preventDefault();

      // Require an intentional gesture before advancing
      if (Math.abs(e.deltaY) < 40) return;

      if (cooldownRef.current) return;
      cooldownRef.current = true;
      setTimeout(() => { cooldownRef.current = false; }, 800);

      const next = goingDown
        ? Math.min(current + 1, entries.length - 1)
        : Math.max(current - 1, 0);

      activeIndexRef.current = next;
      setActiveIndex(next);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
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
