"use client";

import { DeluxePlayer } from "@/lib/rouletteDeluxeTypes";
import { DELUXE_COLORS } from "@/data/roulette_deluxe.config";

type StatsPanelProps = {
  players: DeluxePlayer[];
};

export default function StatsPanel({ players }: StatsPanelProps) {
  if (players.length === 0) {
    return (
      <div className="rounded-xl bg-slate-800/40 p-6 text-center">
        <h3 className="mb-2 text-lg font-bold uppercase tracking-wide text-slate-400">
          Stats de la soirée
        </h3>
        <p className="text-sm text-slate-500">
          Ajoute des joueurs pour suivre les stats.
        </p>
      </div>
    );
  }

  const totalDrinks = players.reduce((sum, p) => sum + p.stats.drinksTaken, 0);
  const topDrinker = players.reduce((top, p) =>
    p.stats.drinksTaken > top.stats.drinksTaken ? p : top
  );
  const topGiver = players.reduce((top, p) =>
    p.stats.drinksGiven > top.stats.drinksGiven ? p : top
  );

  return (
    <div className="rounded-xl bg-slate-800/40 p-6">
      <h3 className="mb-4 text-lg font-bold uppercase tracking-wide text-slate-400">
        Stats de la soirée
      </h3>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-slate-900/50 p-3 text-center">
          <p className="text-xs text-slate-500">Total gorgées</p>
          <p className="text-2xl font-bold text-slate-200">{totalDrinks}</p>
        </div>
        <div className="rounded-lg bg-slate-900/50 p-3 text-center">
          <p className="text-xs text-slate-500">Top buveur</p>
          <p className="truncate text-base font-bold text-red-400">
            {topDrinker.name}
          </p>
        </div>
        <div className="rounded-lg bg-slate-900/50 p-3 text-center">
          <p className="text-xs text-slate-500">Top distributeur</p>
          <p className="truncate text-base font-bold text-slate-300">
            {topGiver.name}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="pb-2 text-left font-semibold text-slate-400">
                Nom
              </th>
              <th className="pb-2 text-center font-semibold text-slate-400">
                Bues
              </th>
              <th className="pb-2 text-center font-semibold text-slate-400">
                Distribuées
              </th>
              <th className="pb-2 text-center font-semibold text-slate-400">
                Shots
              </th>
              <th className="pb-2 text-center font-semibold text-slate-400">
                0
              </th>
              <th className="pb-2 text-center font-semibold text-slate-400">
                00
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr
                key={player.id}
                className="border-b border-slate-800 last:border-0"
              >
                <td className="py-2 font-medium text-slate-200">
                  {player.name}
                </td>
                <td className="py-2 text-center text-red-400">
                  {player.stats.drinksTaken}
                </td>
                <td className="py-2 text-center text-slate-300">
                  {player.stats.drinksGiven}
                </td>
                <td className="py-2 text-center text-orange-400">
                  {player.stats.shotsTaken}
                </td>
                <td
                  className="py-2 text-center font-semibold"
                  style={{ color: DELUXE_COLORS.green }}
                >
                  {player.stats.zeroEvents}
                </td>
                <td
                  className="py-2 text-center font-semibold"
                  style={{ color: DELUXE_COLORS.green }}
                >
                  {player.stats.doubleZeroEvents}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
