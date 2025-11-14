"use client";

import { useState } from "react";
import { Card, H1, Sub, FadeIn } from "@/components/UI";
import { motion } from "framer-motion";
import WheelDeluxe from "@/components/roulette-deluxe/WheelDeluxe";
import ParticipantsPanel from "@/components/roulette-deluxe/ParticipantsPanel";
import StatsPanel from "@/components/roulette-deluxe/StatsPanel";
import {
  DELUXE_SEGMENTS,
  DeluxeSegment,
  DeluxeResult,
  computeDeluxeResult,
  DELUXE_COLORS,
} from "@/data/roulette_deluxe.config";
import { DeluxePlayer } from "@/lib/rouletteDeluxeTypes";
import { applyResultToPlayers } from "@/lib/rouletteDeluxeStats";

export default function RouletteDeluxe() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<DeluxeSegment | null>(
    null
  );
  const [result, setResult] = useState<DeluxeResult | null>(null);
  const [players, setPlayers] = useState<DeluxePlayer[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const totalSegments = DELUXE_SEGMENTS.length;
  const currentPlayer = players.length > 0 ? players[currentPlayerIndex] : null;
  const nextPlayer =
    players.length > 1
      ? players[(currentPlayerIndex + 1) % players.length]
      : null;

  function spin() {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedSegment(null);
    setResult(null);

    // Choose random target index
    const targetIndex = Math.floor(Math.random() * totalSegments);
    const selectedSeg = DELUXE_SEGMENTS[targetIndex];

    // Calculate rotation
    const anglePerSegment = 360 / totalSegments;

    // Align segment center with pointer at top
    const targetAngle = -(
      targetIndex * anglePerSegment +
      anglePerSegment / 2
    );

    // Add 5 full rotations for effect
    const baseSpins = 5;
    const finalRotation =
      rotation + baseSpins * 360 + targetAngle - (rotation % 360);

    setRotation(finalRotation);

    // After 5 seconds, stop and show result
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedSegment(selectedSeg);
      const deluxeResult = computeDeluxeResult(selectedSeg);
      setResult(deluxeResult);

      // Update stats if we have players
      if (players.length > 0) {
        const updatedPlayers = applyResultToPlayers(
          players,
          currentPlayerIndex,
          deluxeResult
        );
        setPlayers(updatedPlayers);

        // Move to next player
        setCurrentPlayerIndex((prev) =>
          players.length > 0 ? (prev + 1) % players.length : 0
        );
      }
    }, 5000);
  }

  const handlePlayersChange = (newPlayers: DeluxePlayer[]) => {
    setPlayers(newPlayers);
    // Adjust current player index if needed
    if (newPlayers.length === 0) {
      setCurrentPlayerIndex(0);
    } else if (currentPlayerIndex >= newPlayers.length) {
      setCurrentPlayerIndex(newPlayers.length - 1);
    }
  };

  // Get display color for result card
  const getResultColor = () => {
    if (!selectedSegment) return DELUXE_COLORS.gold;
    if (selectedSegment.color === "red") return DELUXE_COLORS.red;
    if (selectedSegment.color === "black") return "#374151"; // Lighter black for visibility
    return DELUXE_COLORS.green;
  };

  return (
    <FadeIn>
      <div className="px-4 md:px-0" style={{ marginBottom: "1rem" }}>
        <H1>Roulette Deluxe</H1>
        <Sub>Rouge tu bois, noir tu distribues. 0/00 = chaos. 🍸</Sub>
      </div>

      <div className="px-4 md:px-0">
        <Card>
          <div className="flex flex-col gap-8">
            {/* Participants Panel */}
            <ParticipantsPanel
              players={players}
              onPlayersChange={handlePlayersChange}
            />

            {/* Current Turn Indicator */}
            {players.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-slate-400">Tour de :</p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: DELUXE_COLORS.gold }}
                >
                  {currentPlayer?.name}
                </p>
                {nextPlayer && (
                  <p className="mt-1 text-sm text-slate-500">
                    Prochain : {nextPlayer.name}
                  </p>
                )}
              </div>
            )}

            {players.length === 0 && (
              <div className="rounded-lg bg-slate-800/40 p-4 text-center">
                <p className="text-sm text-slate-400">
                  Ajoute au moins un joueur pour suivre les tours.
                </p>
              </div>
            )}

            {/* Wheel */}
            <div className="flex flex-col items-center gap-6">
              <WheelDeluxe
                segments={DELUXE_SEGMENTS}
                rotation={rotation}
                isSpinning={isSpinning}
                selectedSegmentId={selectedSegment?.id ?? null}
              />

              {/* Spin Button */}
              <button
                onClick={spin}
                disabled={isSpinning}
                className="w-full max-w-[320px] rounded-full px-10 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  background: `linear-gradient(135deg, ${DELUXE_COLORS.gold}, #B45309)`,
                  boxShadow: `0 8px 24px ${DELUXE_COLORS.gold}40`,
                }}
              >
                {isSpinning ? "La roue tourne..." : "Lancer la roue"}
              </button>
            </div>

            {/* Result Card */}
            {selectedSegment && result && !isSpinning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div
                  className="rounded-2xl border-2 p-8 text-center shadow-2xl"
                  style={{
                    backgroundColor: `${getResultColor()}15`,
                    borderColor: getResultColor(),
                  }}
                >
                  {/* Number and Color */}
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <h2
                      className="text-5xl font-black uppercase tracking-wide"
                      style={{
                        color: getResultColor(),
                        textShadow: `0 0 20px ${getResultColor()}60`,
                      }}
                    >
                      {selectedSegment.id}
                    </h2>
                    <div
                      className="h-6 w-6 rounded-full border-2"
                      style={{
                        backgroundColor:
                          selectedSegment.color === "red"
                            ? DELUXE_COLORS.red
                            : selectedSegment.color === "black"
                            ? DELUXE_COLORS.black
                            : DELUXE_COLORS.green,
                        borderColor: "white",
                        boxShadow: `0 0 12px ${getResultColor()}60`,
                      }}
                    />
                  </div>

                  {/* Action Label */}
                  <div className="mb-4">
                    {result.action === "drink" && (
                      <p className="text-2xl font-bold text-red-400">
                        🍺 Tu bois {result.sips} gorgée
                        {result.sips && result.sips > 1 ? "s" : ""}
                      </p>
                    )}
                    {result.action === "give" && (
                      <p className="text-2xl font-bold text-slate-300">
                        🎁 Tu distribues {result.sips} gorgée
                        {result.sips && result.sips > 1 ? "s" : ""}
                      </p>
                    )}
                    {result.action === "event_zero" && (
                      <p className="text-2xl font-bold text-emerald-400">
                        🍀 Événement Zéro
                      </p>
                    )}
                    {result.action === "event_double_zero" && (
                      <p className="text-2xl font-bold text-emerald-400">
                        💀 Double Zéro — Chaos Total
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-base leading-relaxed text-slate-100">
                    {result.description}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Legend / Instructions */}
            {!selectedSegment && !isSpinning && (
              <div className="rounded-xl bg-slate-800/40 p-6">
                <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Règles du Casino
                </h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3">
                    <div
                      className="h-4 w-4 flex-shrink-0 rounded-full"
                      style={{
                        backgroundColor: DELUXE_COLORS.red,
                        boxShadow: `0 0 8px ${DELUXE_COLORS.red}60`,
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-red-400">
                        Rouge
                      </p>
                      <p className="text-xs text-slate-400">Tu bois</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3">
                    <div
                      className="h-4 w-4 flex-shrink-0 rounded-full"
                      style={{
                        backgroundColor: DELUXE_COLORS.black,
                        boxShadow: `0 0 8px ${DELUXE_COLORS.black}60`,
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-300">
                        Noir
                      </p>
                      <p className="text-xs text-slate-400">Tu distribues</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-slate-900/50 p-3">
                    <div
                      className="h-4 w-4 flex-shrink-0 rounded-full"
                      style={{
                        backgroundColor: DELUXE_COLORS.green,
                        boxShadow: `0 0 8px ${DELUXE_COLORS.green}60`,
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">
                        Vert (0/00)
                      </p>
                      <p className="text-xs text-slate-400">Événement chaos</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Stats Panel */}
        <div className="mt-8">
          <StatsPanel players={players} />
        </div>
      </div>
    </FadeIn>
  );
}
