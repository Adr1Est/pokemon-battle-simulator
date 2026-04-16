import { useInfinitePokemon, usePokemonSearch } from "@/hooks/usePokemonData";
import classes from "@/pages/TeamsPage.module.css";
import { usePokemonFilter } from "@/store";
import { ArrowBigRight, CircleEllipsis, Loader, X } from "lucide-react";
import { useId } from "react";

interface Pokemon {
  name: string; 
  url: string; 
}

export default function TeamsPage() {
  const inputFilterId = useId();
  const filter = usePokemonFilter((state) => state.filter);
  const setFilter = usePokemonFilter((state) => state.setFilter)
  const resetFilter = usePokemonFilter((state) => state.resetFilter)

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

  if(isLoading) return <p>Cargando datos...</p>;
  if(isError) return <p>Error al cargar datos...</p>;

  const infinitePokemon = data?.pages.flatMap(page => page.results) || [];
  const searchPokemon = allPokemonList?.results.filter((p: Pokemon) => p.name.toLowerCase().includes(filter.toLowerCase())) || [];

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
                  pokemonList.map((pokemon: Pokemon) => (
                    <div key={pokemon.name} className={`${classes.pokemonLink} glassmorphism`}>
                      <span>{pokemon.name}</span>
                      <button>
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
      </div>
    </div>
  )
}