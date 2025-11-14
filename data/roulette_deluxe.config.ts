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

// Get official roulette color for a number
function getRouletteColor(id: string): DeluxeColor {
  if (id === "0" || id === "00") return "green";
  const n = parseInt(id, 10);
  const redNumbers = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
  if (redNumbers.has(n)) return "red";
  return "black";
}

// American roulette wheel order
const WHEEL_ORDER = [
  "0",
  "28", "9", "26", "30", "11", "7", "20", "32", "17", "5", "22", "34", "15", "3", "24", "36", "13", "1",
  "00",
  "27", "10", "25", "29", "12", "8", "19", "31", "18", "6", "21", "33", "16", "4", "23", "35", "14", "2",
];

// Sips distribution: 10×1, 8×2, 8×3, 6×4, 4×5
const SIPS_MAP: Record<string, number> = {
  "1": 1, "2": 1, "3": 2, "4": 3, "5": 1, "6": 2, "7": 4, "8": 1, "9": 3, "10": 2,
  "11": 1, "12": 5, "13": 2, "14": 3, "15": 1, "16": 4, "17": 2, "18": 1, "19": 3, "20": 5,
  "21": 2, "22": 4, "23": 1, "24": 3, "25": 5, "26": 2, "27": 4, "28": 1, "29": 3, "30": 1,
  "31": 5, "32": 2, "33": 4, "34": 3, "35": 2, "36": 3,
};

// Build segments in American roulette wheel order
export const DELUXE_SEGMENTS: DeluxeSegment[] = WHEEL_ORDER.map((id) => {
  const color = getRouletteColor(id);

  if (id === "0") {
    return { id, kind: "zero", color };
  }

  if (id === "00") {
    return { id, kind: "double_zero", color };
  }

  return {
    id,
    kind: "number",
    color,
    baseSips: SIPS_MAP[id] || 1,
  };
});

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
