export type PlayerGender = "H" | "F" | "X";

export interface DeluxePlayer {
  id: string;
  name: string;
  gender: PlayerGender;
  age: number;
  stats: {
    drinksTaken: number; // gorgées BUES
    drinksGiven: number; // gorgées DISTRIBUÉES
    shotsTaken: number; // cul secs (si event vert le demande)
    zeroEvents: number; // nombre de 0
    doubleZeroEvents: number; // nombre de 00
  };
}

export function createDeluxePlayer(
  name: string,
  gender: PlayerGender,
  age: number
): DeluxePlayer {
  return {
    id: `${Date.now()}-${Math.random()}`,
    name,
    gender,
    age,
    stats: {
      drinksTaken: 0,
      drinksGiven: 0,
      shotsTaken: 0,
      zeroEvents: 0,
      doubleZeroEvents: 0,
    },
  };
}
