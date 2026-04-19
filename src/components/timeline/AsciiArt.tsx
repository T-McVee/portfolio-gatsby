"use client";

import { useMemo, useSyncExternalStore } from "react";

// Match `--breakpoint-tablet` / `max-tablet` (globals.css)
const VIEWPORT_MAX_TABLET = 768;

function useMaxTablet(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(`(max-width: ${VIEWPORT_MAX_TABLET}px)`);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(`(max-width: ${VIEWPORT_MAX_TABLET}px)`).matches,
    () => false,
  );
}

interface AsciiArtProps {
  art: string;
  active: boolean;
  fontSize?: string;
}

interface CharData {
  char: string;
  row: number;
  col: number;
  offsetX: number;
  offsetY: number;
  delay: number;
}

// Scatter offsets use (Math.random() - 0.5) * 200 → ±100px; pad so transforms
// stay inside overflow-hidden and do not create page-level scroll overflow.
const SCATTER_PAD_PX = 100;

export default function AsciiArt({ art, active, fontSize = "0.75rem" }: AsciiArtProps) {
  const staticOnNarrow = useMaxTablet();

  const chars: CharData[] = useMemo(() => {
    const lines = art.split("\n");
    const result: CharData[] = [];

    for (let row = 0; row < lines.length; row++) {
      for (let col = 0; col < lines[row].length; col++) {
        const char = lines[row][col];
        if (char === " ") continue;

        result.push({
          char,
          row,
          col,
          // Random origin offset — scattered 40-120px in a random direction
          offsetX: (Math.random() - 0.5) * 200,
          offsetY: (Math.random() - 0.5) * 200,
          // Staggered delay so they don't all arrive at once
          delay: Math.random() * 600,
        });
      }
    }

    return result;
  }, [art]);

  const lines = art.split("\n");
  const maxCols = Math.max(0, ...lines.map((l) => l.length));
  const innerWidth = `${maxCols}ch`;
  const innerHeight = `${lines.length * 1.2}em`;
  const pad = SCATTER_PAD_PX * 2;

  const outerSize = staticOnNarrow
    ? { width: innerWidth, height: innerHeight }
    : {
        width: `calc(${innerWidth} + ${pad}px)`,
        height: `calc(${innerHeight} + ${pad}px)`,
      };

  const innerStyle: React.CSSProperties = {
    position: "relative",
    width: innerWidth,
    height: innerHeight,
    fontSize,
    ...(staticOnNarrow
      ? {}
      : { transform: `translate(${SCATTER_PAD_PX}px, ${SCATTER_PAD_PX}px)` }),
  };

  return (
    <div
      className="max-tablet:shrink-0 font-mono text-black leading-[1.2] overflow-hidden"
      style={outerSize}
    >
      <div style={innerStyle}>
        {chars.map((c, i) => (
          <span
            key={i}
            className={
              staticOnNarrow ? "absolute" : "absolute transition-all ease-out"
            }
            style={
              staticOnNarrow
                ? {
                    left: `${c.col}ch`,
                    top: `${c.row * 1.2}em`,
                    opacity: 1,
                  }
                : {
                    left: `${c.col}ch`,
                    top: `${c.row * 1.2}em`,
                    transform: active
                      ? "translate(0, 0)"
                      : `translate(${c.offsetX}px, ${c.offsetY}px)`,
                    opacity: active ? 1 : 0,
                    transitionDuration: "800ms",
                    transitionDelay: active ? `${c.delay}ms` : "0ms",
                  }
            }
          >
            {c.char}
          </span>
        ))}
      </div>
    </div>
  );
}
