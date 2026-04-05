"use client";

import { useMemo } from "react";

interface AsciiArtProps {
  art: string;
  active: boolean;
}

interface CharData {
  char: string;
  row: number;
  col: number;
  offsetX: number;
  offsetY: number;
  delay: number;
}

export default function AsciiArt({ art, active }: AsciiArtProps) {
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
  const maxCols = Math.max(...lines.map((l) => l.length));

  return (
    <div
      className="font-mono text-black text-[0.75rem] leading-[1.2] max-tablet:hidden"
      style={{
        position: "relative",
        width: `${maxCols}ch`,
        height: `${lines.length * 1.2}em`,
      }}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          className="absolute transition-all ease-out"
          style={{
            left: `${c.col}ch`,
            top: `${c.row * 1.2}em`,
            transform: active
              ? "translate(0, 0)"
              : `translate(${c.offsetX}px, ${c.offsetY}px)`,
            opacity: active ? 1 : 0,
            transitionDuration: "800ms",
            transitionDelay: active ? `${c.delay}ms` : "0ms",
          }}
        >
          {c.char}
        </span>
      ))}
    </div>
  );
}
