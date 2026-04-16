export const fetchInfinitePokemonList = async ({ pageParam = 0 }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pageParam}`
  );
  return response.json();
};

export const fetchAllPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
  return response.json();
};

export const fetchPokemonInfo = async (pokemonUrl: string) => {
  const response = await fetch (pokemonUrl);
  return response.json();
}