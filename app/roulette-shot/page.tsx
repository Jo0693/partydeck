"use client";

import { useState, useEffect } from "react";
import { Card, H1, Sub, FadeIn } from "@/components/UI";
import { motion } from "framer-motion";
import Wheel from "@/components/roulette-shot/Wheel";
import Legend from "@/components/roulette-shot/Legend";
import {
  generateSegments,
  SegmentDef,
  SEGMENT_TYPE_META,
  getRandomGorgees,
  getRandomDefi,
  getRandomVerite,
  getRandomGage,
} from "@/data/roulette_classic.config";

export default function RouletteShot() {
  const [segments] = useState<SegmentDef[]>(() => generateSegments());
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<SegmentDef | null>(
    null
  );
  const [resultText, setResultText] = useState<string>("");
  const [autoRelance, setAutoRelance] = useState(false);

  const totalSegments = segments.length;

  useEffect(() => {
    if (autoRelance && !isSpinning) {
      const timer = setTimeout(() => {
        setAutoRelance(false);
        spin();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [autoRelance, isSpinning]);

  function spin() {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedSegment(null);
    setResultText("");

    // Choose random target index
    const targetIndex = Math.floor(Math.random() * totalSegments);
    const selectedSeg = segments[targetIndex];

    // Calculate rotation
    const anglePerSegment = 360 / totalSegments;

    // We want the CENTER of the target segment to land under the pointer at the top
    // The pointer is at angle 0 (top). Segments start at -90 degrees.
    // To align segment center with pointer:
    // targetAngle = -(targetIndex * anglePerSegment + anglePerSegment / 2)

    const targetAngle = -(targetIndex * anglePerSegment + anglePerSegment / 2);

    // Add 5 full rotations for effect
    const baseSpins = 5;
    const finalRotation = rotation + baseSpins * 360 + targetAngle - rotation % 360;

    setRotation(finalRotation);

    // After 5 seconds, stop and show result
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedSegment(selectedSeg);

      // Generate result text based on type
      const meta = SEGMENT_TYPE_META[selectedSeg.type];
      let text = "";

      switch (selectedSeg.type) {
        case "gorgee":
          text = `Bois ${getRandomGorgees()} gorgées 🍺`;
          break;
        case "defi":
          text = getRandomDefi();
          break;
        case "verite":
          text = getRandomVerite();
          break;
        case "gage":
          text = getRandomGage();
          break;
        case "joker":
          text = "Donne ton action à quelqu'un d'autre 🎁";
          break;
        case "rien":
          text = "T'as de la chance... pour cette fois 😌";
          break;
        case "relance":
          text = "La roue va tourner encore une fois ! 🔁";
          setAutoRelance(true);
          break;
        case "culsec":
          text = "💀 CUL SEC. Bonne chance.";
          break;
      }
      setResultText(text);
    }, 5000);
  }

  return (
    <FadeIn>
      <div className="px-4 md:px-0" style={{ marginBottom: "1rem" }}>
        <H1>Roulette Shot</H1>
        <Sub>Version Classic — Lance la roue et accepte ton destin.</Sub>
      </div>

      <div className="px-4 md:px-0">
        <Card>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Left column: Wheel + Button + Result */}
            <div className="flex flex-1 flex-col items-center gap-6">
              {/* Wheel */}
              <Wheel
                segments={segments}
                rotation={rotation}
                isSpinning={isSpinning}
                selectedSegmentId={selectedSegment?.id ?? null}
              />

              {/* Spin Button */}
              <button
                onClick={spin}
                disabled={isSpinning}
                className="w-full max-w-[280px] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 text-base font-bold text-white shadow-lg shadow-violet-500/40 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSpinning ? "En cours..." : "Lancer la roue"}
              </button>

              {/* Result Card */}
              {selectedSegment && !isSpinning && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md"
                >
                  <div
                    className="rounded-2xl border-2 p-6 text-center shadow-2xl"
                    style={{
                      backgroundColor: `${selectedSegment.color}20`,
                      borderColor: selectedSegment.color,
                    }}
                  >
                    {/* Title */}
                    <h2
                      className="mb-3 text-3xl font-bold uppercase tracking-wide"
                      style={{
                        color: selectedSegment.color,
                        textShadow:
                          selectedSegment.type === "culsec"
                            ? "0 0 10px rgba(220, 38, 38, 0.5)"
                            : "none",
                      }}
                    >
                      {SEGMENT_TYPE_META[selectedSegment.type].icon}{" "}
                      {SEGMENT_TYPE_META[selectedSegment.type].label}
                    </h2>

                    {/* Description */}
                    <p className="text-base leading-relaxed text-slate-100">
                      {resultText}
                    </p>

                    {/* Auto-relance indicator */}
                    {autoRelance && (
                      <p className="mt-3 text-sm italic text-slate-300">
                        Relance automatique dans 2 secondes...
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Instructions */}
              {!selectedSegment && !isSpinning && (
                <div className="max-w-md text-center text-sm text-slate-400">
                  <p>
                    Lance la roue et laisse le hasard décider de ton sort. Prêt à
                    affronter le résultat ?
                  </p>
                </div>
              )}
            </div>

            {/* Right column: Legend */}
            <div className="w-full lg:w-80">
              <Legend />
            </div>
          </div>
        </Card>
      </div>
    </FadeIn>
  );
}
