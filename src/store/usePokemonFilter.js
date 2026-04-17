import { create } from "zustand";

export const usePokemonFilter = create((set) => ({
  filter: "",
  setFilter: (text) => set(() => ({ filter: text })),
  resetFilter: () => set(() => ({ filter: "" })),
}));