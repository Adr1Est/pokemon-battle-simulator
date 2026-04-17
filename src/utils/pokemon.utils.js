import type { Pokemon, PokemonApiResponse } from "@/types/pokemon.types";

export const mapPokemon = (data: PokemonApiResponse): Pokemon => ({
  id: data.id,
  name: data.name,
  image: data.sprites.other["official-artwork"].front_default,
  types: data.types.map((t) => t.type.name),
  stats: data.stats.map((s) => ({
    name: s.stat.name,
    baseStat: s.base_stat,
  })),
});

export const pokemonTypeEmojis: Record<string, string> = {
  fire: "🔥",
  water: "💧",
  grass: "🌿",
  electric: "⚡",
  ice: "❄️",
  bug: "🐛",
  rock: "🪨",
  ghost: "👻",
  psychic: "🧠",
  steel: "🔩",
  fairy: "✨",
  flying: "🦅",
  poison: "☠️",
  ground: "🌍",
  normal: "⚪",
  dragon: "🐉",
  fighting: "🥊",
};

export const createPokemonTeamWithId = (pokemonTeam: Pokemon[]) => {
  const id = crypto.randomUUID();
  return {
    id,
    team: pokemonTeam,
  };
};