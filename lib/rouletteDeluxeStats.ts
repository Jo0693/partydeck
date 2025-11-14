import { DeluxePlayer } from "./rouletteDeluxeTypes";
import { DeluxeResult } from "@/data/roulette_deluxe.config";

export function applyResultToPlayers(
  players: DeluxePlayer[],
  currentPlayerIndex: number,
  result: DeluxeResult
): DeluxePlayer[] {
  if (players.length === 0) return players;

  const updatedPlayers = players.map((p) => ({ ...p, stats: { ...p.stats } }));
  const currentPlayer = updatedPlayers[currentPlayerIndex];

  if (!currentPlayer) return players;

  switch (result.action) {
    case "drink":
      // Rouge : le joueur courant BOIT
      currentPlayer.stats.drinksTaken += result.sips ?? 0;
      break;

    case "give":
      // Noir : le joueur courant DISTRIBUE
      currentPlayer.stats.drinksGiven += result.sips ?? 0;
      break;

    case "event_zero":
      // 0 vert : événement avec distribution globale
      // Règle simplifiée basée sur les événements définis :
      // - Tout le monde boit 3 gorgées
      // - Le joueur courant distribue 5 gorgées
      updatedPlayers.forEach((p) => {
        p.stats.drinksTaken += 3;
      });
      currentPlayer.stats.drinksGiven += 5;
      currentPlayer.stats.zeroEvents += 1;
      break;

    case "event_double_zero":
      // 00 vert : chaos total
      // Règle simplifiée :
      // - Le joueur courant prend un cul sec
      // - Tout le monde boit 2 gorgées
      // - La personne suivante boit 5 gorgées supplémentaires
      currentPlayer.stats.shotsTaken += 1;
      updatedPlayers.forEach((p) => {
        p.stats.drinksTaken += 2;
      });

      // Personne suivante boit 5 gorgées de plus
      if (players.length > 1) {
        const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
        updatedPlayers[nextPlayerIndex].stats.drinksTaken += 5;
      }

      currentPlayer.stats.doubleZeroEvents += 1;
      break;
  }

  return updatedPlayers;
}
