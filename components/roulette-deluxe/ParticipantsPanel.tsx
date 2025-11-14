"use client";

import { useState } from "react";
import { DeluxePlayer, PlayerGender, createDeluxePlayer } from "@/lib/rouletteDeluxeTypes";
import { DELUXE_COLORS } from "@/data/roulette_deluxe.config";

type ParticipantsPanelProps = {
  players: DeluxePlayer[];
  onPlayersChange: (players: DeluxePlayer[]) => void;
};

export default function ParticipantsPanel({
  players,
  onPlayersChange,
}: ParticipantsPanelProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<PlayerGender>("H");
  const [age, setAge] = useState(21);

  const handleAddPlayer = () => {
    if (!name.trim()) return;

    const newPlayer = createDeluxePlayer(name.trim(), gender, age);
    onPlayersChange([...players, newPlayer]);

    // Reset form
    setName("");
    setGender("H");
    setAge(21);
  };

  const handleRemovePlayer = (id: string) => {
    onPlayersChange(players.filter((p) => p.id !== id));
  };

  return (
    <div
      className="rounded-xl border-2 p-6"
      style={{
        backgroundColor: `${DELUXE_COLORS.gold}10`,
        borderColor: DELUXE_COLORS.gold,
      }}
    >
      <h3
        className="mb-2 text-lg font-bold uppercase tracking-wide"
        style={{ color: DELUXE_COLORS.gold }}
      >
        Participants
      </h3>
      <p className="mb-4 text-sm text-slate-400">
        Nom, sexe, âge — pour savoir à qui c'est le tour.
      </p>

      {/* Form */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-semibold text-slate-300">
            Nom
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddPlayer()}
            placeholder="Ex: Alex"
            className="w-full rounded-lg bg-slate-800/60 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none ring-2 ring-slate-700 focus:ring-slate-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-300">
            Sexe
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as PlayerGender)}
            className="rounded-lg bg-slate-800/60 px-3 py-2 text-sm text-white outline-none ring-2 ring-slate-700 focus:ring-slate-600"
          >
            <option value="H">H</option>
            <option value="F">F</option>
            <option value="X">X</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-300">
            Âge
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 18)}
            min="18"
            max="99"
            className="w-20 rounded-lg bg-slate-800/60 px-3 py-2 text-sm text-white outline-none ring-2 ring-slate-700 focus:ring-slate-600"
          />
        </div>

        <button
          onClick={handleAddPlayer}
          disabled={!name.trim()}
          className="rounded-lg px-4 py-2 text-sm font-bold text-white transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: `linear-gradient(135deg, ${DELUXE_COLORS.gold}, #B45309)`,
          }}
        >
          + Ajouter
        </button>
      </div>

      {/* Players List */}
      {players.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1.5 text-sm font-medium text-slate-200"
            >
              <span>{player.name}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{player.gender}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{player.age}</span>
              <button
                onClick={() => handleRemovePlayer(player.id)}
                className="ml-1 text-slate-400 transition-colors hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {players.length === 0 && (
        <p className="text-center text-sm italic text-slate-500">
          Aucun participant pour l'instant
        </p>
      )}
    </div>
  );
}
