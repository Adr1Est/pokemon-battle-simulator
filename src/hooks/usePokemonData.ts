import { fetchInfinitePokemonList } from "@/services/pokemon.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfinitePokemon = () => {
  return useInfiniteQuery({
    queryKey: ["pokemonInfinite"],
    queryFn: fetchInfinitePokemonList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 20;
      return nextOffset < lastPage.count ? nextOffset : undefined;
    },
  });
}