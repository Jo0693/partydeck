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
        <div className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-white drop-shadow-lg" />
      </div>

      {/* Wheel container */}
      <div className="relative aspect-square w-full">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: rotation }}
          transition={{
            duration: isSpinning ? 5 : 0,
            ease: isSpinning ? [0.25, 0.1, 0.25, 1] : "linear",
          }}
        >
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 blur-xl" />

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

              // Calculate icon and text positions (towards outer edge)
              const midAngle = startAngle + anglePerSegment / 2;
              const midRad = (midAngle * Math.PI) / 180;

              // Icon position (outer)
              const iconX = 100 + 70 * Math.cos(midRad);
              const iconY = 100 + 70 * Math.sin(midRad);

              // Text position (inner, below icon)
              const textX = 100 + 55 * Math.cos(midRad);
              const textY = 100 + 55 * Math.sin(midRad);

              const isSelected = !isSpinning && segment.id === selectedSegmentId;

              return (
                <g key={segment.id}>
                  {/* Segment path */}
                  <path
                    d={pathData}
                    fill={segment.color}
                    stroke={
                      isSelected
                        ? "rgba(255, 255, 255, 0.8)"
                        : "rgba(255, 255, 255, 0.2)"
                    }
                    strokeWidth={isSelected ? "2" : "0.5"}
                    opacity={isSelected ? 1 : 0.95}
                    filter={
                      isSelected
                        ? `drop-shadow(0 0 8px ${segment.color})`
                        : undefined
                    }
                  />

                  {/* Icon (emoji) */}
                  <text
                    x={iconX}
                    y={iconY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="16"
                    transform={`rotate(${midAngle + 90}, ${iconX}, ${iconY})`}
                    className="pointer-events-none select-none"
                  >
                    {segment.icon}
                  </text>

                  {/* Short label */}
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="6"
                    fontWeight="600"
                    transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                    className="pointer-events-none select-none"
                    style={{
                      textShadow: "0 1px 3px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    {segment.labelShort}
                  </text>
                </g>
              );
            })}

            {/* Center circle */}
            <circle
              cx="100"
              cy="100"
              r="15"
              fill="rgba(15, 23, 42, 0.95)"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
