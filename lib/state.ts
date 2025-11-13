import { create } from "zustand";

export type Sex = "H" | "F" | "X";
export type Player = { id: string; name: string; sex: Sex; age: number };

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

type State = {
  players: Player[];
  currentIndex: number;
  addPlayer: (p: Omit<Player, "id">) => void;
  removePlayer: (id: string) => void;
  nextTurn: () => void;
  resetTurn: () => void;
};

export const usePartyStore = create<State>((set, get) => ({
  players: [],
  currentIndex: 0,
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
}));
