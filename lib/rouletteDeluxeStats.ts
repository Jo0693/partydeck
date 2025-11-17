import { DeluxePlayer } from "./rouletteDeluxeTypes";
import { DeluxeResult } from "@/data/roulette_deluxe.config";

/**
 * Apply result stats to players based on the ACTIVE player who spun the wheel.
 *
 * Rules (PHASE 4 - DÉFINITIF):
 * - "drink" (red): actor drinks sips
 * - "give" (black): actor distributes sips (globally)
 * - "event_zero" (0 green): everyone drinks 3, actor distributes 5, zeroEvents++
 * - "event_double_zero" (00 green): actor takes 1 shot, everyone drinks 2, next player drinks 5 more, doubleZeroEvents++
 *
 * @param players - Current players array
 * @param activePlayerIndex - Index of the player who just spun
 * @param result - Result from the wheel spin
 * @returns New players array with updated stats
 */
export function applyResultToPlayers(
  players: DeluxePlayer[],
  activePlayerIndex: number,
  result: DeluxeResult
): DeluxePlayer[] {
  // No players
  if (players.length === 0) {
    return players;
  }

  // Toujours travailler sur une copie immuable
  const newPlayers = players.map((p) => ({
    ...p,
    stats: { ...p.stats },
  }));

  const actorIndex = activePlayerIndex;
  const actor = newPlayers[actorIndex];
  const sips = result.sips ?? 0;
  const playerCount = newPlayers.length;
  const nextIndex = (actorIndex + 1) % playerCount;

  switch (result.action) {
    case "drink":
      // ROUGE: le joueur actif boit
      actor.stats.drinksTaken += sips;
      break;

    case "give":
      // NOIR: le joueur actif distribue
      actor.stats.drinksGiven += sips;
      break;

    case "event_zero":
      // VERT 0: tout le monde boit 3, acteur distribue 5, compteur++
      for (const p of newPlayers) {
        p.stats.drinksTaken += 3;
      }
      actor.stats.drinksGiven += 5;
      actor.stats.zeroEvents += 1;
      break;

    case "event_double_zero":
      // VERT 00: acteur prend un cul sec, tout le monde boit 2, joueur suivant boit 5 de plus, compteur++
      actor.stats.shotsTaken += 1;

      for (const p of newPlayers) {
        p.stats.drinksTaken += 2;
      }

      const target = newPlayers[nextIndex];
      target.stats.drinksTaken += 5;

      actor.stats.doubleZeroEvents += 1;
      break;

    default:
      // Sécurité: retourner newPlayers sans autre modification
      break;
  }

  return newPlayers;
}
