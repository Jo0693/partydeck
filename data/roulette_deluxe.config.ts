export type DeluxeColor = "red" | "black" | "green";

export type DeluxeSegmentType = "number" | "zero" | "double_zero";

export interface DeluxeSegment {
  id: string;
  kind: DeluxeSegmentType;
  color: DeluxeColor;
  baseSips?: number;
}

export type DeluxeActionKind = "drink" | "give" | "event_zero" | "event_double_zero";

export interface DeluxeResult {
  segment: DeluxeSegment;
  action: DeluxeActionKind;
  sips?: number;
  description: string;
}

// Roulette layout follows European roulette order with alternating red/black
// For simplicity, we use a consistent pattern while maintaining casino aesthetics
export const DELUXE_SEGMENTS: DeluxeSegment[] = [
  // 0 and 00 (green)
  { id: "0", kind: "zero", color: "green" },
  { id: "00", kind: "double_zero", color: "green" },

  // Numbers 1-36 with red/black alternation and sips distribution
  // 10 cases with 1 sip
  { id: "1", kind: "number", color: "red", baseSips: 1 },
  { id: "2", kind: "number", color: "black", baseSips: 1 },
  { id: "3", kind: "number", color: "red", baseSips: 2 },
  { id: "4", kind: "number", color: "black", baseSips: 3 },
  { id: "5", kind: "number", color: "red", baseSips: 1 },
  { id: "6", kind: "number", color: "black", baseSips: 2 },
  { id: "7", kind: "number", color: "red", baseSips: 4 },
  { id: "8", kind: "number", color: "black", baseSips: 1 },
  { id: "9", kind: "number", color: "red", baseSips: 3 },
  { id: "10", kind: "number", color: "black", baseSips: 2 },
  { id: "11", kind: "number", color: "black", baseSips: 1 },
  { id: "12", kind: "number", color: "red", baseSips: 5 },
  { id: "13", kind: "number", color: "black", baseSips: 2 },
  { id: "14", kind: "number", color: "red", baseSips: 3 },
  { id: "15", kind: "number", color: "black", baseSips: 1 },
  { id: "16", kind: "number", color: "red", baseSips: 4 },
  { id: "17", kind: "number", color: "black", baseSips: 2 },
  { id: "18", kind: "number", color: "red", baseSips: 1 },
  { id: "19", kind: "number", color: "red", baseSips: 3 },
  { id: "20", kind: "number", color: "black", baseSips: 5 },
  { id: "21", kind: "number", color: "red", baseSips: 2 },
  { id: "22", kind: "number", color: "black", baseSips: 4 },
  { id: "23", kind: "number", color: "red", baseSips: 1 },
  { id: "24", kind: "number", color: "black", baseSips: 3 },
  { id: "25", kind: "number", color: "red", baseSips: 5 },
  { id: "26", kind: "number", color: "black", baseSips: 2 },
  { id: "27", kind: "number", color: "red", baseSips: 4 },
  { id: "28", kind: "number", color: "black", baseSips: 1 },
  { id: "29", kind: "number", color: "black", baseSips: 3 },
  { id: "30", kind: "number", color: "red", baseSips: 1 },
  { id: "31", kind: "number", color: "black", baseSips: 5 },
  { id: "32", kind: "number", color: "red", baseSips: 2 },
  { id: "33", kind: "number", color: "black", baseSips: 4 },
  { id: "34", kind: "number", color: "red", baseSips: 3 },
  { id: "35", kind: "number", color: "black", baseSips: 2 },
  { id: "36", kind: "number", color: "red", baseSips: 3 },
];

// Color palette for visual display
export const DELUXE_COLORS = {
  red: "#DC2626",      // Casino red
  black: "#1F2937",    // Deep black-gray
  green: "#059669",    // Casino green
  gold: "#D97706",     // Gold accents
};

// Event descriptions for 0 and 00
export const ZERO_EVENTS = [
  "Roulette Royale : tout le monde boit 3 gorgées, tu choisis une personne pour faire un cul sec, et tu distribues 5 gorgées en plus.",
  "Jackpot Vert : tu bois 2 gorgées, tu distribues 8 gorgées (réparties comme tu veux), et tout le monde boit 1 gorgée.",
  "La Banque Gagne : tout le monde (toi inclus) boit 4 gorgées. Le croupier ne perd jamais.",
];

export const DOUBLE_ZERO_EVENTS = [
  "Chaos Total : tu prends un cul sec, tout le monde boit 2 gorgées, et la personne à ta gauche ou à ta droite boit 5 gorgées.",
  "Malédiction Double : tu bois 5 gorgées, tu choisis 2 personnes qui boivent 3 gorgées chacune, et tout le monde boit 1 gorgée.",
  "Fin du Monde : cul sec pour toi ET pour une personne de ton choix. Tout le monde boit 3 gorgées.",
];

export function getRandomZeroEvent(): string {
  return ZERO_EVENTS[Math.floor(Math.random() * ZERO_EVENTS.length)];
}

export function getRandomDoubleZeroEvent(): string {
  return DOUBLE_ZERO_EVENTS[Math.floor(Math.random() * DOUBLE_ZERO_EVENTS.length)];
}

export function computeDeluxeResult(segment: DeluxeSegment): DeluxeResult {
  if (segment.kind === "zero") {
    return {
      segment,
      action: "event_zero",
      description: getRandomZeroEvent(),
    };
  }

  if (segment.kind === "double_zero") {
    return {
      segment,
      action: "event_double_zero",
      description: getRandomDoubleZeroEvent(),
    };
  }

  // Number segment
  const sips = segment.baseSips || 1;

  if (segment.color === "red") {
    return {
      segment,
      action: "drink",
      sips,
      description: `Tu bois ${sips} gorgée${sips > 1 ? "s" : ""}. Rouge = pour toi. 🍺`,
    };
  }

  // Black
  return {
    segment,
    action: "give",
    sips,
    description: `Tu distribues ${sips} gorgée${sips > 1 ? "s" : ""}, à une ou plusieurs personnes. Noir = tu donnes. 🎁`,
  };
}
