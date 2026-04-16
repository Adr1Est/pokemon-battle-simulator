import { fetchAllPokemon, fetchInfinitePokemonList } from "@/services/pokemon.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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

export const usePokemonSearch = (enabled: boolean) => {
  return useQuery({
    queryKey: ["pokemonSearch"],
    queryFn: fetchAllPokemon,
    enabled,
  });
};