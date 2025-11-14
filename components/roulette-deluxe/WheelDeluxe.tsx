"use client";

import { motion } from "framer-motion";
import { DeluxeSegment, DELUXE_COLORS } from "@/data/roulette_deluxe.config";

type WheelDeluxeProps = {
  segments: DeluxeSegment[];
  rotation: number;
  isSpinning: boolean;
  selectedSegmentId: string | null;
};

export default function WheelDeluxe({
  segments,
  rotation,
  isSpinning,
  selectedSegmentId,
}: WheelDeluxeProps) {
  const totalSegments = segments.length;
  const anglePerSegment = 360 / totalSegments;

  return (
    <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[440px]">
      {/* Cursor/Triangle indicator at top */}
      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-2">
        <div
          className="h-0 w-0 border-l-[14px] border-r-[14px] border-t-[22px] border-l-transparent border-r-transparent"
          style={{
            borderTopColor: DELUXE_COLORS.gold,
            filter: "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))",
          }}
        />
      </div>

      {/* Wheel container */}
      <div
        className="relative aspect-square w-full"
        style={{ filter: "drop-shadow(0 0 100px rgba(0, 0, 0, 0.6))" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: rotation }}
          transition={{
            duration: isSpinning ? 5 : 0,
            ease: isSpinning ? [0.25, 0.1, 0.25, 1] : "linear",
          }}
        >
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

              // Calculate text position (centered in segment, closer to center)
              const midAngle = startAngle + anglePerSegment / 2;
              const midRad = (midAngle * Math.PI) / 180;

              const textX = 100 + 60 * Math.cos(midRad);
              const textY = 100 + 60 * Math.sin(midRad);

              const isSelected =
                !isSpinning && segment.id === selectedSegmentId;

              // Get segment color
              const segmentColor =
                segment.color === "red"
                  ? DELUXE_COLORS.red
                  : segment.color === "black"
                  ? DELUXE_COLORS.black
                  : DELUXE_COLORS.green;

              return (
                <g key={segment.id}>
                  {/* Segment path with subtle gradient */}
                  <defs>
                    <radialGradient
                      id={`grad-deluxe-${segment.id}`}
                      cx="50%"
                      cy="50%"
                    >
                      <stop offset="0%" stopColor={segmentColor} stopOpacity="1" />
                      <stop offset="100%" stopColor={segmentColor} stopOpacity="0.85" />
                    </radialGradient>
                  </defs>
                  <path
                    d={pathData}
                    fill={`url(#grad-deluxe-${segment.id})`}
                    stroke={
                      isSelected
                        ? DELUXE_COLORS.gold
                        : "rgba(255, 255, 255, 0.2)"
                    }
                    strokeWidth={isSelected ? "3" : "0.5"}
                    opacity={isSelected ? 1 : 0.95}
                    filter={
                      isSelected
                        ? `drop-shadow(0 0 16px ${DELUXE_COLORS.gold})`
                        : undefined
                    }
                  />

                  {/* Number text */}
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={segment.kind === "number" ? "9" : "12"}
                    fontWeight="700"
                    fill="white"
                    className="pointer-events-none select-none"
                    style={{
                      filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.8))",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {segment.id}
                  </text>
                </g>
              );
            })}

            {/* Outer ring (gold) */}
            <circle
              cx="100"
              cy="100"
              r="97"
              fill="none"
              stroke={DELUXE_COLORS.gold}
              strokeWidth="2"
              style={{
                filter: "drop-shadow(0 0 8px rgba(217, 119, 6, 0.4))",
              }}
            />

            {/* Center circle with gold gradient */}
            <defs>
              <radialGradient id="centerGradDeluxe" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(217, 119, 6, 1)" />
                <stop offset="100%" stopColor="rgba(120, 53, 15, 1)" />
              </radialGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="20"
              fill="url(#centerGradDeluxe)"
              stroke={DELUXE_COLORS.gold}
              strokeWidth="2.5"
            />
            {/* Center icon */}
            <text
              x="100"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="20"
              className="pointer-events-none select-none"
            >
              🍸
            </text>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
