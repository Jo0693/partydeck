"use client";

import { SEGMENT_TYPE_META, SegmentType } from "@/data/roulette_classic.config";

const SEGMENT_TYPES_ORDER: SegmentType[] = [
  "gorgee",
  "culsec",
  "defi",
  "verite",
  "joker",
  "relance",
  "rien",
];

export default function Legend() {
  return (
    <div className="w-full">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Légende
      </h3>
      <div className="space-y-2">
        {SEGMENT_TYPES_ORDER.map((type) => {
          const meta = SEGMENT_TYPE_META[type];
          return (
            <div
              key={type}
              className="flex items-center gap-3 rounded-lg bg-slate-800/40 px-3 py-2"
            >
              {/* Color indicator */}
              <div
                className="h-4 w-4 flex-shrink-0 rounded-full"
                style={{
                  backgroundColor: meta.color,
                  boxShadow: `0 0 8px ${meta.color}40`,
                }}
              />

              {/* Icon */}
              <span className="text-xl">{meta.icon}</span>

              {/* Label and description */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-200">
                  {meta.label}
                </p>
                <p className="text-xs text-slate-400">{meta.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
