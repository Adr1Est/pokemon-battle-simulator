export const mapPokemon = (data) => ({
  id: crypto.randomUUID(),
  name: data.name,
  image: data.sprites.other["official-artwork"].front_default,
  types: data.types.map((t) => t.type.name),
  stats: data.stats.map((s) => ({
    name: s.stat.name,
    baseStat: s.base_stat,
  })),
});

export const pokemonTypeEmojis = {
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
  stellar: "⭐",
  dark: "⚫",
  unknown: "❔",
  fighting: "🥊",
};

export const pokemonStatsParser = {
  "hp": "hp",
  "defense": "def",
  "special-defense": "sp-def",
  "attack": "at",
  "special-attack": "sp-at",
  "speed": "spd",
}

export const createPokemonTeamWithId = (pokemonTeam) => {
  const id = crypto.randomUUID();
  return {
    id,
    team: pokemonTeam,
  };
};