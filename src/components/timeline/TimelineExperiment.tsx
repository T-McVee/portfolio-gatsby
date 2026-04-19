"use client";

import { useEffect, useRef, useState } from "react";
import H1 from "@/components/ui/H1";
import TimelineItem from "./TimelineItem";
import AsciiArt from "./AsciiArt";
import type { TimelineEntry } from "@/lib/types";

interface TimelineProps {
  entries: TimelineEntry[];
}

// Height of the gradient fade zone (px). Tune to taste.
const FADE_PX = 80;

export default function TimelineExperiment({ entries }: TimelineProps) {
  // Progress bar — advances as entries are reached; never driven to null.
  const [activeIndex, setActiveIndex] = useState(0);

  // AsciiArt assembly — null while content is in the gradient / heading zone.
  // This decouples the "which dot is lit" state from "which art is assembled" state
  // so that the scatter animation fires the moment content enters the fade zone,
  // rather than when the next entry crosses the IO threshold.
  const [assembleIndex, setAssembleIndex] = useState<number | null>(0);

  // Measured at runtime so sticky offsets are exact regardless of font/zoom.
  const [headingHeight, setHeadingHeight] = useState(128);

  const headingRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keep headingHeight in sync (handles resize and initial measurement).
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const update = () => setHeadingHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scroll listener — drives both activeIndex and assembleIndex.
  //
  // We use a scroll listener rather than IntersectionObserver because IO cannot
  // reliably detect the precise moment content crosses the gradient boundary
  // (min-h-screen entries are always "intersecting" the viewport at some ratio).
  // rAF-throttled so it's smooth but not spammy.
  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        let nextAssemble: number | null = null;
        let lowestPos = Infinity;
        let lastPast = -1; // highest index whose entry top has cleared the viewport

        entryRefs.current.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          // rect.top < 0  →  entry has scrolled above the viewport
          if (rect.top < 0) lastPast = i;

          // Content starts at headingHeight below the entry's top edge.
          // It is in the "visible zone" (fully clear of the gradient) when:
          //   rect.top >= 0              →  content hasn't entered the fade zone yet
          //   rect.top + headingHeight   →  content's viewport position
          //   < vh                       →  content is above the viewport bottom
          const contentTop = rect.top + headingHeight;
          if (rect.top >= 0 && contentTop < vh) {
            if (contentTop < lowestPos) {
              lowestPos = contentTop;
              nextAssemble = i;
            }
          }
        });

        // assembleIndex drives AsciiArt.
        // Only update once the section has been reached (lastPast >= 0 means at
        // least one entry has scrolled past, so we've entered the section).
        if (nextAssemble !== null) {
          setAssembleIndex(nextAssemble);
          setActiveIndex(nextAssemble);
        } else if (lastPast >= 0) {
          // In the gap between entries — scatter all art while we wait for the next.
          setAssembleIndex(null);
          setActiveIndex(lastPast);
        }
        // else: section not yet scrolled to — leave initial state untouched.
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once so state is correct on mount / headingHeight change
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [headingHeight]);

  if (!entries.length) return null;

  const renderInline = (text: string) =>
    text.split(/(\[.*?\]\(.*?\))/g).map((part, j) => {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        return (
          <a
            key={j}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-1 hover:underline"
          >
            {match[1]}
          </a>
        );
      }
      return part;
    });

  const renderDescription = (descriptionText: string) =>
    descriptionText.split(/\n\n/).map((block, k) => {
      const lines = block.split("\n");
      const hasBullets = lines.some((l) => /^- /.test(l) || /^  - /.test(l));

      if (!hasBullets) {
        return <p key={k}>{renderInline(block)}</p>;
      }

      const parts: React.ReactNode[] = [];
      let listItems: { text: string; nested: string[] }[] = [];

      const flushList = () => {
        if (listItems.length === 0) return;
        parts.push(
          <ul
            key={`ul-${parts.length}`}
            className="list-disc pl-5 flex flex-col gap-1"
          >
            {listItems.map((item, i) => (
              <li key={i}>
                {renderInline(item.text)}
                {item.nested.length > 0 && (
                  <ul className="list-disc pl-5 flex flex-col gap-1 mt-1">
                    {item.nested.map((n, j) => (
                      <li key={j}>{renderInline(n)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>,
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
            parts.push(
              <span key={`t-${parts.length}`}>{renderInline(line)}</span>,
            );
          }
        }
      }
      flushList();

      return (
        <div key={k} className="flex flex-col gap-2">
          {parts}
        </div>
      );
    });

  return (
    <div
      className="px-[5.5rem] max-tablet:px-8"
      // headingHeight already includes the FADE_PX gradient (it's inside the
      // heading ref div), so --timeline-pt == headingHeight is all entries need.
      style={{ "--timeline-pt": `${headingHeight}px` } as React.CSSProperties}
    >
      {/*
        DESKTOP — sticky heading + gradient as a single unit.

        Putting the gradient INSIDE this div (rather than as a separate sticky
        in the content column) means the gradient unsticks together with the heading
        when the section ends, so it never floats over the next section's background.

        headingRef.offsetHeight captures both the H1 area AND the gradient height,
        so all downstream sticky offsets and the --timeline-pt variable automatically
        account for the full visual height of this element.
      */}
      <div
        ref={headingRef}
        className="max-tablet:hidden sticky top-0 z-20 bg-white pt-16"
      >
        <H1>Work.Work.Work.</H1>
        {/* <div */}
        {/*   className="pointer-events-none bg-gradient-to-b from-white to-transparent" */}
        {/*   style={{ height: FADE_PX }} */}
        {/* /> */}
      </div>

      <div className="flex gap-12 max-tablet:flex-col">
        {/* DESKTOP — progress bar + year badges, sticky just below the heading. */}
        <div
          className="max-tablet:hidden sticky self-start shrink-0"
          style={{ top: headingHeight }}
        >
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
        </div>

        {/* Content column */}
        <div className="flex-1 flex flex-col">
          {/* Mobile heading */}
          <div className="hidden max-tablet:block pt-8 pb-4">
            <H1>Work.Work.Work.</H1>
          </div>

          {entries.map((entry, i) => {
            // assembleIndex (not activeIndex) drives the art so scatter fires
            // the moment content enters the gradient, not when the next IO fires.
            const isActive = i === assembleIndex;
            const description = renderDescription(entry.description);

            return (
              <div
                key={entry.order}
                ref={(el) => {
                  entryRefs.current[i] = el;
                }}
                className="min-h-screen pt-[var(--timeline-pt)] max-tablet:pt-8 max-tablet:pb-12"
              >
                {entry.surrounding && entry.ascii ? (
                  <>
                    <div className="float-right ml-8 mb-4 max-tablet:hidden">
                      <AsciiArt
                        art={entry.ascii}
                        active={isActive}
                        fontSize="0.6rem"
                      />
                    </div>
                    <h3 className="text-[1.5rem] font-bold max-tablet:text-[1.25rem]">
                      <span className="text-accent-1">{entry.year}</span>{" "}
                      &mdash; {entry.title}
                    </h3>
                    <div className="text-xl mt-2 text-dark-grey flex flex-col gap-3">
                      {description}
                    </div>
                    <div className="clear-both mt-6 max-tablet:hidden">
                      <AsciiArt
                        art={entry.ascii}
                        active={isActive}
                        fontSize="0.6rem"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-[1.5rem] font-bold max-tablet:text-[1.25rem]">
                      <span className="text-accent-1">{entry.year}</span>{" "}
                      &mdash; {entry.title}
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
      </div>
    </div>
  );
}
