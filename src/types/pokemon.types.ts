export interface PokemonTeam {
  id: string;
  team: Pokemon[];
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: Stat[];
}

export interface Stat {
  name: string;
  baseStat: number;
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}