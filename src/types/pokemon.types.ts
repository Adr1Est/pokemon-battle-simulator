export interface PokemonTeam {
  id: string;
  team: Pokemon[];
}

export interface Pokemon {
  id: string;
  name: string;
  image: string;
  types: string[];
  stats: Stat[];
}

export interface Stat {
  name: string;
  baseStat: number;
}