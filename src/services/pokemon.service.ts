export const fetchInfinitePokemonList = async ({ pageParam = 0 }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pageParam}`
  );
  return response.json();
}