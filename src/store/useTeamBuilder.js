import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTeamBuilder = create()(
  persist(
    (set) => ({
      teamLayout: [],

      addPokemonToTeam: (pokemon) => set((state) => ({
        teamLayout: state.teamLayout.some((p) => p.id === pokemon.id)
          ? state.teamLayout
          : [...state.teamLayout, pokemon]
      })),
      removePokemonFromTeam: (pokemonId) => set((state) => ({
        teamLayout: state.teamLayout.filter((p) => p.id !== pokemonId),
      })),

      resetTeam: () => set(() => ({ teamLayout: [] }))
    }),
    { name: "wip-team" }
  )
);
