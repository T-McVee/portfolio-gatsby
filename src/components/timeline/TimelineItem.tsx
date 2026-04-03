import type { TimelineEntry } from "@/lib/types";

interface TimelineItemProps {
  entry: TimelineEntry;
  reached: boolean;
  active: boolean;
}

export default function TimelineItem({
  entry,
  reached,
  active,
}: TimelineItemProps) {
  return (
    <div className="relative flex items-center mb-8">
      <div
        className={[
          "flex-shrink-0 w-4 h-4 rounded-full z-10 transition-all duration-500",
          reached
            ? active
              ? "bg-accent-1 scale-100"
              : "bg-accent-1 scale-80"
            : "bg-transparent scale-75",
        ].join(" ")}
      />
    </div>
  );
}
