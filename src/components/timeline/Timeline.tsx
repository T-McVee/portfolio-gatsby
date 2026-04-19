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
      <section className="sticky top-0 flex flex-col w-full px-[5.5rem] max-tablet:px-8 pt-16 pb-8 max-tablet:pt-8 max-tablet:pb-8 min-h-screen justify-start">
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
            {entries.map((entry, i) => {
              const isActive = i === activeIndex;
              const renderInline = (text: string) =>
                text.split(/(\[.*?\]\(.*?\))/g).map((part, j) => {
                  const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
                  if (match) {
                    return (
                      <a key={j} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-accent-1 hover:underline">
                        {match[1]}
                      </a>
                    );
                  }
                  return part;
                });

              const description = entry.description.split(/\n\n/).map((block, k) => {
                const lines = block.split("\n");
                const hasBullets = lines.some(l => /^- /.test(l) || /^  - /.test(l));

                if (!hasBullets) {
                  return <p key={k}>{renderInline(block)}</p>;
                }

                const parts: React.ReactNode[] = [];
                let listItems: { text: string; nested: string[] }[] = [];

                const flushList = () => {
                  if (listItems.length === 0) return;
                  parts.push(
                    <ul key={`ul-${parts.length}`} className="list-disc pl-5 flex flex-col gap-1">
                      {listItems.map((item, i) => (
                        <li key={i}>
                          {renderInline(item.text)}
                          {item.nested.length > 0 && (
                            <ul className="list-disc pl-5 flex flex-col gap-1 mt-1">
                              {item.nested.map((n, j) => <li key={j}>{renderInline(n)}</li>)}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  );
                  listItems = [];
                };

                for (const line of lines) {
                  if (/^  - /.test(line)) {
                    if (listItems.length > 0) {
                      listItems[listItems.length - 1].nested.push(line.slice(4));
                    }
                  } else if (/^- /.test(line)) {
                    listItems.push({ text: line.slice(2), nested: [] });
                  } else {
                    flushList();
                    if (line.trim()) {
                      parts.push(<span key={`t-${parts.length}`}>{renderInline(line)}</span>);
                    }
                  }
                }
                flushList();

                return <div key={k} className="flex flex-col gap-2">{parts}</div>;
              });

              return (
                <div
                  key={entry.order}
                  className={[
                    "absolute top-0 left-0 transition-all duration-500",
                    entry.surrounding ? "w-full" : "w-3/4",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none",
                  ].join(" ")}
                >
                  {entry.surrounding && entry.ascii ? (
                    <>
                      <div className="float-right ml-8 mb-4 max-tablet:hidden">
                        <AsciiArt art={entry.ascii} active={isActive} fontSize="0.6rem" />
                      </div>
                      <h3 className="text-[1.5rem] font-bold max-tablet:text-[1.25rem]">
                        <span className="text-accent-1">{entry.year}</span> &mdash;{" "}
                        {entry.title}
                      </h3>
                      <div className="text-xl mt-2 text-dark-grey flex flex-col gap-3">
                        {description}
                      </div>
                      <div className="clear-both mt-6 max-tablet:hidden">
                        <AsciiArt art={entry.ascii} active={isActive} fontSize="0.6rem" />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-[1.5rem] font-bold max-tablet:text-[1.25rem]">
                        <span className="text-accent-1">{entry.year}</span> &mdash;{" "}
                        {entry.title}
                      </h3>
                      <div className="text-xl mt-2 text-dark-grey flex flex-col gap-3">
                        {description}
                      </div>
                      {entry.ascii && (
                        <div className="mt-8">
                          <AsciiArt art={entry.ascii} active={isActive} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Scroll indicator — right of content, desktop only */}
          <div
            className={[
              "max-tablet:hidden flex flex-col items-center justify-center gap-2 transition-opacity duration-500 self-center",
              activeIndex < entries.length - 1 ? "opacity-100" : "opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <span className="text-dark-grey text-sm tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">scroll</span>
            <svg
              className="animate-bounce text-accent-1"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 3v14M10 17l-5-5M10 17l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
