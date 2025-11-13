export type SegmentType =
  | "gorgee"
  | "defi"
  | "verite"
  | "gage"
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
    description: "Bois 2-4 gorgées",
    color: "#3b82f6",
  },
  defi: {
    label: "Défi",
    icon: "💪",
    description: "Réalise un défi aléatoire",
    color: "#8b5cf6",
  },
  verite: {
    label: "Vérité",
    icon: "💬",
    description: "Réponds à une question vérité",
    color: "#ec4899",
  },
  gage: {
    label: "Gage",
    icon: "🎭",
    description: "Accomplis un gage embarrassant",
    color: "#f97316",
  },
  joker: {
    label: "Joker",
    icon: "🎁",
    description: "Donne ton action à quelqu'un",
    color: "#eab308",
  },
  rien: {
    label: "Rien",
    icon: "❌",
    description: "T'as de la chance... pour cette fois",
    color: "#6b7280",
  },
  relance: {
    label: "Relance",
    icon: "🔁",
    description: "La roue tourne encore une fois !",
    color: "#06b6d4",
  },
  culsec: {
    label: "Cul Sec",
    icon: "💀",
    description: "Bois ton verre d'un coup",
    color: "#dc2626",
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
    type: "defi",
    labelShort: "Défi",
    icon: "💪",
    color: SEGMENT_TYPE_META.defi.color,
  },
  {
    id: 2,
    type: "verite",
    labelShort: "Vérité",
    icon: "💬",
    color: SEGMENT_TYPE_META.verite.color,
  },
  {
    id: 3,
    type: "gage",
    labelShort: "Gage",
    icon: "🎭",
    color: SEGMENT_TYPE_META.gage.color,
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
    type: "defi",
    labelShort: "Défi",
    icon: "💪",
    color: SEGMENT_TYPE_META.defi.color,
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
    type: "joker",
    labelShort: "Joker",
    icon: "🎁",
    color: SEGMENT_TYPE_META.joker.color,
  },
  {
    id: 8,
    type: "gorgee",
    labelShort: "Gorgées",
    icon: "🍺",
    color: SEGMENT_TYPE_META.gorgee.color,
  },
  {
    id: 9,
    type: "culsec",
    labelShort: "Cul Sec",
    icon: "💀",
    color: SEGMENT_TYPE_META.culsec.color,
  },
  {
    id: 10,
    type: "gage",
    labelShort: "Gage",
    icon: "🎭",
    color: SEGMENT_TYPE_META.gage.color,
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
    type: "rien",
    labelShort: "Rien",
    icon: "❌",
    color: SEGMENT_TYPE_META.rien.color,
  },
  {
    id: 13,
    type: "verite",
    labelShort: "Vérité",
    icon: "💬",
    color: SEGMENT_TYPE_META.verite.color,
  },
  {
    id: 14,
    type: "culsec",
    labelShort: "Cul Sec",
    icon: "💀",
    color: SEGMENT_TYPE_META.culsec.color,
  },
  {
    id: 15,
    type: "gage",
    labelShort: "Gage",
    icon: "🎭",
    color: SEGMENT_TYPE_META.gage.color,
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
    type: "culsec",
    labelShort: "Cul Sec",
    icon: "💀",
    color: SEGMENT_TYPE_META.culsec.color,
  },
];

export const RELANCE_SEGMENT: SegmentDef = {
  id: 18,
  type: "relance",
  labelShort: "Relance",
  icon: "🔁",
  color: SEGMENT_TYPE_META.relance.color,
};

// Insert relance randomly in the array - ONLY called once during build
function insertRelance(): SegmentDef[] {
  const segments = [...CLASSIC_SEGMENTS];
  const randomIndex = Math.floor(Math.random() * segments.length);
  segments.splice(randomIndex, 0, RELANCE_SEGMENT);
  return segments;
}

// Generate segments with relance
export function generateSegments(): SegmentDef[] {
  return insertRelance();
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
