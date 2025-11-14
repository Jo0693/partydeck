export type SegmentType =
  | "gorgee"
  | "defi"
  | "verite"
  | "joker"
  | "rien"
  | "relance"
  | "culsec";

export type SegmentDef = {
  id: number;
  type: SegmentType;
  labelShort: string;
  icon: string;
  color: string;
};

// Metadata for each segment type (for legend and result card)
export const SEGMENT_TYPE_META: Record<
  SegmentType,
  {
    label: string;
    icon: string;
    description: string;
    color: string;
  }
> = {
  gorgee: {
    label: "Gorgées",
    icon: "🍺",
    description: "Bois un nombre de gorgées indiqué. Ça commence à piquer… 🍺",
    color: "#F87171",
  },
  defi: {
    label: "Défi",
    icon: "💪",
    description: "Un défi à relever, sinon tu bois.",
    color: "#A855F7",
  },
  verite: {
    label: "Vérité",
    icon: "💬",
    description: "Répond honnêtement à une question… ou bois.",
    color: "#3B82F6",
  },
  joker: {
    label: "Joker",
    icon: "🎁",
    description: "Tu peux refiler l'action à quelqu'un d'autre. 🎁",
    color: "#FACC15",
  },
  rien: {
    label: "Rien",
    icon: "❌",
    description: "Tu t'en sors bien pour cette fois. 😮‍💨",
    color: "#4B5563",
  },
  relance: {
    label: "Relance",
    icon: "🔁",
    description: "La roue tourne à nouveau. Tu n'y échapperas pas longtemps.",
    color: "#22D3EE",
  },
  culsec: {
    label: "Cul sec",
    icon: "💀",
    description: "Tu vides ton verre. Pas de négociation. 💀",
    color: "#B91C1C",
  },
};

export const CLASSIC_SEGMENTS: SegmentDef[] = [
  {
    id: 0,
    type: "gorgee",
    labelShort: "Gorgées",
    icon: "🍺",
    color: SEGMENT_TYPE_META.gorgee.color,
  },
  {
    id: 1,
    type: "culsec",
    labelShort: "Cul Sec",
    icon: "💀",
    color: SEGMENT_TYPE_META.culsec.color,
  },
  {
    id: 2,
    type: "gorgee",
    labelShort: "Gorgées",
    icon: "🍺",
    color: SEGMENT_TYPE_META.gorgee.color,
  },
  {
    id: 3,
    type: "defi",
    labelShort: "Défi",
    icon: "💪",
    color: SEGMENT_TYPE_META.defi.color,
  },
  {
    id: 4,
    type: "gorgee",
    labelShort: "Gorgées",
    icon: "🍺",
    color: SEGMENT_TYPE_META.gorgee.color,
  },
  {
    id: 5,
    type: "culsec",
    labelShort: "Cul Sec",
    icon: "💀",
    color: SEGMENT_TYPE_META.culsec.color,
  },
  {
    id: 6,
    type: "verite",
    labelShort: "Vérité",
    icon: "💬",
    color: SEGMENT_TYPE_META.verite.color,
  },
  {
    id: 7,
    type: "gorgee",
    labelShort: "Gorgées",
    icon: "🍺",
    color: SEGMENT_TYPE_META.gorgee.color,
  },
  {
    id: 8,
    type: "joker",
    labelShort: "Joker",
    icon: "🎁",
    color: SEGMENT_TYPE_META.joker.color,
  },
  {
    id: 9,
    type: "gorgee",
    labelShort: "Gorgées",
    icon: "🍺",
    color: SEGMENT_TYPE_META.gorgee.color,
  },
  {
    id: 10,
    type: "culsec",
    labelShort: "Cul Sec",
    icon: "💀",
    color: SEGMENT_TYPE_META.culsec.color,
  },
  {
    id: 11,
    type: "defi",
    labelShort: "Défi",
    icon: "💪",
    color: SEGMENT_TYPE_META.defi.color,
  },
  {
    id: 12,
    type: "gorgee",
    labelShort: "Gorgées",
    icon: "🍺",
    color: SEGMENT_TYPE_META.gorgee.color,
  },
  {
    id: 13,
    type: "rien",
    labelShort: "Rien",
    icon: "❌",
    color: SEGMENT_TYPE_META.rien.color,
  },
  {
    id: 14,
    type: "verite",
    labelShort: "Vérité",
    icon: "💬",
    color: SEGMENT_TYPE_META.verite.color,
  },
  {
    id: 15,
    type: "culsec",
    labelShort: "Cul Sec",
    icon: "💀",
    color: SEGMENT_TYPE_META.culsec.color,
  },
  {
    id: 16,
    type: "joker",
    labelShort: "Joker",
    icon: "🎁",
    color: SEGMENT_TYPE_META.joker.color,
  },
  {
    id: 17,
    type: "relance",
    labelShort: "Relance",
    icon: "🔁",
    color: SEGMENT_TYPE_META.relance.color,
  },
];

// Generate segments (relance is now directly in CLASSIC_SEGMENTS)
export function generateSegments(): SegmentDef[] {
  return CLASSIC_SEGMENTS;
}

// Lists of random content for each type
export const DEFIS = [
  "Fais 10 pompes maintenant",
  "Imite quelqu'un dans la pièce",
  "Parle avec un accent pendant 2 tours",
  "Danse pendant 30 secondes",
  "Envoie un message à ton crush",
  "Raconte ta pire honte",
  "Fais un compliment à chaque personne",
  "Appelle quelqu'un au hasard",
  "Montre ta dernière photo embarrassante",
  "Chante une chanson devant tout le monde",
];

export const VERITES = [
  "Quelle est ta plus grande peur ?",
  "Qui est ton crush secret ?",
  "Quel est ton plus gros regret ?",
  "As-tu déjà menti à tes parents sur quelque chose de grave ?",
  "Quelle est la chose la plus gênante que tu aies faite ?",
  "Si tu pouvais effacer un souvenir, lequel ?",
  "Quel est ton fantasme le plus bizarre ?",
  "As-tu déjà triché lors d'un examen ?",
  "Quelle est la pire chose que tu aies faite par vengeance ?",
  "Si personne ne le savait jamais, que ferais-tu ?",
];

export const GAGES = [
  "Poste une story embarrassante",
  "Laisse quelqu'un écrire sur ton front",
  "Porte tes vêtements à l'envers",
  "Parle uniquement en rimes pendant 5 minutes",
  "Fais le tour de la pièce à quatre pattes",
  "Laisse quelqu'un choisir ta prochaine photo de profil",
  "Envoie un vocal gênant à ton ex",
  "Mange quelque chose de dégoûtant",
  "Laisse quelqu'un lire tes messages",
  "Fais une déclaration d'amour à un objet",
];

export function getRandomGorgees(): number {
  return Math.floor(Math.random() * 3) + 2; // 2-4 gorgées
}

export function getRandomDefi(): string {
  return DEFIS[Math.floor(Math.random() * DEFIS.length)];
}

export function getRandomVerite(): string {
  return VERITES[Math.floor(Math.random() * VERITES.length)];
}

export function getRandomGage(): string {
  return GAGES[Math.floor(Math.random() * GAGES.length)];
}
