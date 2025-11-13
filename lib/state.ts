import { create } from "zustand";

export type Sex = "H" | "F" | "X";
export type Player = { id: string; name: string; sex: Sex; age: number };

export type AllianceGroup = {
  id: string;
  memberIds: string[];
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

type State = {
  players: Player[];
  currentIndex: number;
  alliances: AllianceGroup[];
  addPlayer: (p: Omit<Player, "id">) => void;
  removePlayer: (id: string) => void;
  nextTurn: () => void;
  resetTurn: () => void;
  addAlliance: (p1Id: string, p2Id: string) => void;
  resetAlliances: () => void;
};

export const usePartyStore = create<State>((set, get) => ({
  players: [],
  currentIndex: 0,
  alliances: [],
  addPlayer: (p) =>
    set((s) => ({
      players: [...s.players, { id: makeId(), ...p }],
    })),
  removePlayer: (id) =>
    set((s) => {
      const filtered = s.players.filter((p) => p.id !== id);
      const idx = Math.min(s.currentIndex, Math.max(0, filtered.length - 1));
      return { players: filtered, currentIndex: idx };
    }),
  nextTurn: () =>
    set((s) => ({
      currentIndex: s.players.length ? (s.currentIndex + 1) % s.players.length : 0,
    })),
  resetTurn: () => set({ currentIndex: 0 }),
  addAlliance: (p1Id: string, p2Id: string) => {
    if (p1Id === p2Id) return;

    set((s) => {
      // Trouver tous les groupes contenant p1Id ou p2Id
      const relatedGroups = s.alliances.filter(
        (g) => g.memberIds.includes(p1Id) || g.memberIds.includes(p2Id)
      );

      // Si aucun groupe trouvé, créer un nouveau groupe
      if (relatedGroups.length === 0) {
        return {
          alliances: [
            ...s.alliances,
            { id: makeId(), memberIds: [p1Id, p2Id] },
          ],
        };
      }

      // Fusionner tous les groupes reliés + p1Id + p2Id
      const mergedIds = new Set<string>();
      relatedGroups.forEach((g) => {
        g.memberIds.forEach((id) => mergedIds.add(id));
      });
      mergedIds.add(p1Id);
      mergedIds.add(p2Id);

      // Supprimer les anciens groupes et ajouter le nouveau groupe fusionné
      const otherGroups = s.alliances.filter(
        (g) => !relatedGroups.includes(g)
      );

      return {
        alliances: [
          ...otherGroups,
          { id: makeId(), memberIds: Array.from(mergedIds) },
        ],
      };
    });
  },
  resetAlliances: () => set({ alliances: [] }),
}));
