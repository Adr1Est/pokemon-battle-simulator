import type { Pokemon, PokemonTeam } from "@/types/pokemon.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PokemonTeamsStore {
  teams: PokemonTeam[];

  createTeam: (team: PokemonTeam) => void;
  deleteTeam: (teamId: string) => void;

  addPokemonToTeam: (teamId: string, pokemon: Pokemon) => void;
  removePokemonFromTeam: (teamId: string, pokemonId: string) => void;

  resetTeams: () => void;
}

export const usePokemonTeams = create<PokemonTeamsStore>()(
  persist(
    (set) => ({
      teams: [],

      createTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
      deleteTeam: (teamId) => set((state) => ({ teams: state.teams.filter((t: PokemonTeam) => t.id !== teamId) })),
      
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
    }),
    { name: "pokemon-teams" }
  )
);