import type { PokemonTeam } from "@/types/pokemon.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TeamBuilderStore {
  teamLayout: PokemonTeam;
  
  addPokemonToTeam: ()
}
