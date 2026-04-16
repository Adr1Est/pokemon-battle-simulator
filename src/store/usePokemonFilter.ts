import { create } from "zustand";

interface PokemonFilterStore {
  filter: string;
  setFilter: (text: string | undefined) => void;
  resetFilter: () => void;
}

export const usePokemonFilter = create<PokemonFilterStore>((set) => ({
  filter: "",
  setFilter: (text: string | undefined) => set(() => ({ filter: text })),
  resetFilter: () => set(() => ({ filter: "" })),
}));