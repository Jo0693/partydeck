import { DeluxePlayer } from "./rouletteDeluxeTypes";
import { DeluxeResult } from "@/data/roulette_deluxe.config";

/**
 * Apply result stats to players based on the last player who spun the wheel.
 *
 * Rules:
 * - "drink" (red): actor drinks sips
 * - "give" (black): actor gives sips (globally, not tracked per recipient)
 * - "event_zero" (0 green): everyone drinks 3, actor distributes 5
 * - "event_double_zero" (00 green): actor takes 1 shot, everyone drinks 2, next player drinks 5 more
 *
 * @param players - Current players array
 * @param lastPlayerIndex - Index of the player who just spun (null if no spin yet)
 * @param result - Result from the wheel spin
 * @returns New players array with updated stats
 */
export function applyResultToPlayers(
  players: DeluxePlayer[],
  lastPlayerIndex: number | null,
  result: DeluxeResult
): DeluxePlayer[] {
  // No players or no one has spun yet
  if (players.length === 0 || lastPlayerIndex === null) {
    return players;
  }

  // Ensure valid index
  if (lastPlayerIndex < 0 || lastPlayerIndex >= players.length) {
    return players;
  }

  // Create a deep copy of players with stats
  const updatedPlayers = players.map((p) => ({
    ...p,
    stats: { ...p.stats },
  }));

  const actorIndex = lastPlayerIndex;
  const actor = updatedPlayers[actorIndex];
  const nextIndex = (actorIndex + 1) % players.length;

  switch (result.action) {
    case "drink":
      // RED: Actor drinks
      actor.stats.drinksTaken += result.sips ?? 0;
      break;

    case "give":
      // BLACK: Actor distributes (globally, not tracked per recipient)
      actor.stats.drinksGiven += result.sips ?? 0;
      break;

    case "event_zero":
      // GREEN 0: Everyone drinks 3, actor distributes 5
      updatedPlayers.forEach((p) => {
        p.stats.drinksTaken += 3;
      });
      actor.stats.drinksGiven += 5;
      actor.stats.zeroEvents += 1;
      break;

    case "event_double_zero":
      // GREEN 00: Actor takes 1 shot, everyone drinks 2, next player drinks 5 more
      actor.stats.shotsTaken += 1;

      updatedPlayers.forEach((p) => {
        p.stats.drinksTaken += 2;
      });

      // Next player drinks 5 additional sips (only if there's more than 1 player)
      if (players.length > 1) {
        updatedPlayers[nextIndex].stats.drinksTaken += 5;
      }

      actor.stats.doubleZeroEvents += 1;
      break;
  }

  return updatedPlayers;
}
