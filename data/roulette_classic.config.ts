export type SegmentType =
  | "gorgee"
  | "defi"
  | "verite"
  | "gage"
  | "joker"
  | "rien"
  | "relance"
  | "culsec";

export type RouletteSegment = {
  id: number;
  type: SegmentType;
  label: string;
  color: string;
};

export const CLASSIC_SEGMENTS: RouletteSegment[] = [
  { id: 0, type: "gorgee", label: "Gorgée", color: "#3b82f6" },
  { id: 1, type: "defi", label: "Défi", color: "#8b5cf6" },
  { id: 2, type: "verite", label: "Vérité", color: "#ec4899" },
  { id: 3, type: "gage", label: "Gage", color: "#f97316" },
  { id: 4, type: "gorgee", label: "Gorgée", color: "#3b82f6" },
  { id: 5, type: "defi", label: "Défi", color: "#8b5cf6" },
  { id: 6, type: "verite", label: "Vérité", color: "#ec4899" },
  { id: 7, type: "joker", label: "Joker", color: "#eab308" },
  { id: 8, type: "gorgee", label: "Gorgée", color: "#3b82f6" },
  { id: 9, type: "culsec", label: "CUL SEC", color: "#dc2626" },
  { id: 10, type: "gage", label: "Gage", color: "#f97316" },
  { id: 11, type: "defi", label: "Défi", color: "#8b5cf6" },
  { id: 12, type: "rien", label: "Rien", color: "#6b7280" },
  { id: 13, type: "verite", label: "Vérité", color: "#ec4899" },
  { id: 14, type: "culsec", label: "CUL SEC", color: "#dc2626" },
  { id: 15, type: "gage", label: "Gage", color: "#f97316" },
  { id: 16, type: "joker", label: "Joker", color: "#eab308" },
  { id: 17, type: "culsec", label: "CUL SEC", color: "#dc2626" },
];

export const RELANCE_SEGMENT: RouletteSegment = {
  id: 18,
  type: "relance",
  label: "Relance",
  color: "#06b6d4",
};

// Insert relance randomly in the array
const insertRelance = () => {
  const segments = [...CLASSIC_SEGMENTS];
  const randomIndex = Math.floor(Math.random() * segments.length);
  segments.splice(randomIndex, 0, RELANCE_SEGMENT);
  return segments;
};

export const SEGMENTS_WITH_RELANCE = insertRelance();

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
