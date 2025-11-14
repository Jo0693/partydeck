"use client";

import { motion } from "framer-motion";
import { SegmentDef } from "@/data/roulette_classic.config";

type WheelProps = {
  segments: SegmentDef[];
  rotation: number;
  isSpinning: boolean;
  selectedSegmentId: number | null;
};

export default function Wheel({
  segments,
  rotation,
  isSpinning,
  selectedSegmentId,
}: WheelProps) {
  const totalSegments = segments.length;
  const anglePerSegment = 360 / totalSegments;

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px]">
      {/* Cursor/Triangle indicator at top */}
      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-2">
        <div
          className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"
          style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))" }}
        />
      </div>

      {/* Wheel container */}
      <div className="relative aspect-square w-full" style={{ filter: "drop-shadow(0 0 80px rgba(0, 0, 0, 0.3))" }}>
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: rotation }}
          transition={{
            duration: isSpinning ? 5 : 0,
            ease: isSpinning ? [0.25, 0.1, 0.25, 1] : "linear",
          }}
        >
          {/* Outer glow removed - using drop-shadow on container instead */}

          {/* Wheel SVG */}
          <svg
            viewBox="0 0 200 200"
            className="relative h-full w-full drop-shadow-2xl"
          >
            {/* Draw segments */}
            {segments.map((segment, index) => {
              const startAngle = index * anglePerSegment - 90; // -90 to start from top
              const endAngle = startAngle + anglePerSegment;

              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;

              const x1 = 100 + 95 * Math.cos(startRad);
              const y1 = 100 + 95 * Math.sin(startRad);
              const x2 = 100 + 95 * Math.cos(endRad);
              const y2 = 100 + 95 * Math.sin(endRad);

              const largeArcFlag = anglePerSegment > 180 ? 1 : 0;

              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 95 95 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`,
              ].join(" ");

              // Calculate icon position (centered in segment)
              const midAngle = startAngle + anglePerSegment / 2;
              const midRad = (midAngle * Math.PI) / 180;

              // Icon position (centered in segment, no rotation)
              const iconX = 100 + 60 * Math.cos(midRad);
              const iconY = 100 + 60 * Math.sin(midRad);

              const isSelected = !isSpinning && segment.id === selectedSegmentId;

              return (
                <g key={segment.id}>
                  {/* Segment path with gradient */}
                  <defs>
                    <radialGradient id={`grad-${segment.id}`} cx="50%" cy="50%">
                      <stop offset="0%" stopColor={segment.color} stopOpacity="1" />
                      <stop offset="100%" stopColor={segment.color} stopOpacity="0.85" />
                    </radialGradient>
                  </defs>
                  <path
                    d={pathData}
                    fill={`url(#grad-${segment.id})`}
                    stroke={
                      isSelected
                        ? "rgba(255, 255, 255, 0.9)"
                        : "rgba(255, 255, 255, 0.15)"
                    }
                    strokeWidth={isSelected ? "2.5" : "0.5"}
                    opacity={isSelected ? 1 : 0.95}
                    filter={
                      isSelected
                        ? `drop-shadow(0 0 12px ${segment.color})`
                        : undefined
                    }
                  />

                  {/* Icon (emoji) - centered, larger */}
                  <text
                    x={iconX}
                    y={iconY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="24"
                    className="pointer-events-none select-none"
                    style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))" }}
                  >
                    {segment.icon}
                  </text>
                </g>
              );
            })}

            {/* Outer ring */}
            <circle
              cx="100"
              cy="100"
              r="97"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.15))" }}
            />

            {/* Center circle with gradient */}
            <defs>
              <radialGradient id="centerGrad" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(30, 41, 59, 1)" />
                <stop offset="100%" stopColor="rgba(15, 23, 42, 1)" />
              </radialGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="18"
              fill="url(#centerGrad)"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
