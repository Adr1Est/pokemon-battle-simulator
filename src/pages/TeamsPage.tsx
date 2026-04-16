import TeamPokemonCard from "@/components/TeamsPage/TeamPokemonCard";
import { useInfinitePokemon, usePokemonSearch, useSinglePokemonInfo } from "@/hooks/usePokemonData";
import classes from "@/pages/TeamsPage.module.css";
import { usePokemonFilter, useTeamBuilder } from "@/store";
import type { Pokemon } from "@/types/pokemon.types";
import { capitalize } from "@/utils/capitalize.utils";
import { mapPokemon } from "@/utils/pokemon.utils";
import { ArrowBigRight, CircleEllipsis, Loader, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

interface PokemonFromList {
  name: string; 
  url: string; 
}

export default function TeamsPage() {
  const inputFilterId = useId();
  const filter = usePokemonFilter((state) => state.filter);
  const setFilter = usePokemonFilter((state) => state.setFilter)
  const resetFilter = usePokemonFilter((state) => state.resetFilter)
  const teamLayout = useTeamBuilder((state) => state.teamLayout);
  const addPokemonToTeam = useTeamBuilder((state) => state.addPokemonToTeam);
  const [selectedUrl, setSelectedUrl] = useState<string | undefined>(undefined);
  const { data: pokemonInfo, isLoading: isPokemonInfoLoading } = useSinglePokemonInfo(selectedUrl);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfinitePokemon();

  const isFiltering = filter.trim().length > 0;
  const { data: allPokemonList, isFetching } = usePokemonSearch(isFiltering);

  useEffect(() => {
    if(pokemonInfo){
      addPokemonToTeam(mapPokemon(pokemonInfo));
    }
  }, [pokemonInfo, addPokemonToTeam]);

  if(isLoading) return <p>Cargando datos...</p>;
  if(isError) return <p>Error al cargar datos...</p>;

  const infinitePokemon = data?.pages.flatMap(page => page.results) || [];
  const searchPokemon = allPokemonList?.results.filter((p: PokemonFromList) => p.name.toLowerCase().includes(filter.toLowerCase())) || [];

  const pokemonList = isFiltering ? searchPokemon : infinitePokemon;

  return(
    <div className={classes.teamsMainContainer}>
      <div className={classes.filterRender}>
        <form 
          onSubmit={(e) => e.preventDefault()}
          className={classes.form}
        >
          <input 
            type="text" 
            id={inputFilterId}
            className={classes.teamsFilterInput} 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className={classes.formButton}
            onClick={resetFilter}
            disabled={!filter}
          >
            <X />
          </button>
        </form>
        <div className={classes.pokemonList}>
          {
            isFetching 
              ? <p>Buscando Pokemon...</p>
              : (
                  pokemonList.map((pokemon: PokemonFromList) => (
                    <div key={pokemon.name} className={`${classes.pokemonLink} glassmorphism`}>
                      <span>{capitalize(pokemon.name)}</span>
                      <button
                        onClick={() => setSelectedUrl(pokemon.url)}
                      >
                        <ArrowBigRight />
                      </button>
                    </div>
                  ))
                )
          }
          {
            !isFiltering && (
              <button
                className={classes.loadButton}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage ? <Loader /> : <CircleEllipsis />}
              </button>
            )
          }
        </div>
      </div>
      <div className={classes.teamBuilderMainContainer}>
        <h1>Crea tu equipo</h1>
        <ul className={classes.renderTeamContainer}>
          {
            isPokemonInfoLoading
              ? <li>Cargando equipo...</li>
              : teamLayout.length > 0
                ? teamLayout.map((p: Pokemon) => (
                    <TeamPokemonCard
                      key={p.id}
                      name={p.name}
                      image={p.image}
                      types={p.types}
                    />
                  ))
                : <li>Crea tu equipo</li>
          }
        </ul>
      </div>
    </div>
  )
}