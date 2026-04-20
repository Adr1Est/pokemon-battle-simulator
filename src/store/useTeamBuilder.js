import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTeamBuilder = create()(
  persist(
    (set) => ({
      teamLayout: [],

      addPokemonToTeam: (pokemon) => set((state) => ({
        teamLayout: state.teamLayout.some((p) => p.name === pokemon.name)
          ? state.teamLayout
          : [...state.teamLayout, pokemon]
      })),
      removePokemonFromTeam: (pokemonId) => set((state) => ({
        teamLayout: state.teamLayout.filter((p) => p.id !== pokemonId),
      })),

      resetTeam: () => set(() => ({ teamLayout: [] })),

      reorderTeamLayout: (fromIndex, toIndex) => set((state) => {
        const newLayout = [...state.teamLayout]
        const [moved] = newLayout.splice(fromIndex, 1)
        newLayout.splice(toIndex, 0, moved)
        return { teamLayout: newLayout }
      }),
    }),
    { name: "wip-team" }
  )
);
