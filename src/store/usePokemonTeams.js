import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePokemonTeams = create()(
  persist(
    (set) => ({
      teams: [],

      createTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
      deleteTeam: (teamId) => set((state) => ({ teams: state.teams.filter((t) => t.id !== teamId) })),

      addPokemonToTeam: (teamId, pokemon) => set((state) => ({
        teams: state.teams.map((team) =>
          team.id === teamId
            ? {
              ...team,
              team: team.team.some((p) => p.id === pokemon.id) // Evitar duplicados
                ? team.team
                : [...team.team, pokemon],
            }
            : team
        ),
      })),
      removePokemonFromTeam: (teamId, pokemonId) => set((state) => ({
        teams: state.teams.map((team) =>
          team.id === teamId
            ? {
              ...team,
              team: team.team.filter((p) => p.id !== pokemonId)
            }
            : team
        ),
      })),

      resetTeams: () => set(() => ({ teams: [] })),

      reorderPokemon: (teamId, fromIndex, toIndex) => set((state) => ({
        teams: state.teams.map((team) => {
          if (team.id !== teamId) return team
          const newTeam = [...team.team]
          const [moved] = newTeam.splice(fromIndex, 1)
          newTeam.splice(toIndex, 0, moved)
          return { ...team, team: newTeam }
        })
      })),
    }),
    { name: "pokemon-teams" }
  )
);