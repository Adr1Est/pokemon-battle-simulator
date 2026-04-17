import TeamPokemonCard from "@/components/CreateTeamPage/TeamPokemonCard";
import { useInfinitePokemon, usePokemonSearch, useSinglePokemonInfo } from "@/hooks/usePokemonData";
import classes from "@/pages/CreateTeamPage.module.css";
import { usePokemonFilter, usePokemonTeams, useTeamBuilder } from "@/store";
import { capitalize } from "@/utils/capitalize.utils";
import { createPokemonTeamWithId, mapPokemon } from "@/utils/pokemon.utils";
import { ArrowBigRight, CircleEllipsis, Loader, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

export default function CreateTeamPage() {
  const inputFilterId = useId();
  const filter = usePokemonFilter((state) => state.filter);
  const setFilter = usePokemonFilter((state) => state.setFilter)
  const resetFilter = usePokemonFilter((state) => state.resetFilter)
  const teamLayout = useTeamBuilder((state) => state.teamLayout);
  const addPokemonToTeam = useTeamBuilder((state) => state.addPokemonToTeam);
  const resetTeam = useTeamBuilder((state) => state.resetTeam);
  const createTeam = usePokemonTeams((state) => state.createTeam);
  const [selectedUrl, setSelectedUrl] = useState(undefined);
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

  const handleClick = () => {
    createTeam(createPokemonTeamWithId(teamLayout));
    resetTeam();
  }

  useEffect(() => {
    if(pokemonInfo){
      addPokemonToTeam(mapPokemon(pokemonInfo));
    }
  }, [pokemonInfo, addPokemonToTeam]);

  if(isLoading) return <p>Cargando datos...</p>;
  if(isError) return <p>Error al cargar datos...</p>;

  const infinitePokemon = data?.pages.flatMap(page => page.results) || [];
  const searchPokemon = allPokemonList?.results.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase())) || [];

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
                  pokemonList.map((pokemon) => (
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
        <div className={`${classes.headerContainer} glassmorphism`}>
          <h1>Crea tu equipo</h1>
          <button
            onClick={handleClick}
            disabled={teamLayout.length !== 6}
          >
            Crear equipo
          </button>
          {
            teamLayout.length > 6 && (
              <p className={classes.warn}>Los equipos deben ser de máximo 6 Pokemon. Elimina {teamLayout.length - 6}</p>
            )
          }
          
        </div>
        <ul className={classes.renderTeamContainer}>
          {
            isPokemonInfoLoading
              ? <li>Cargando equipo...</li>
              : teamLayout.length > 0
                ? teamLayout.map((p) => (
                    <TeamPokemonCard
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      image={p.image}
                      types={p.types}
                      stats={p.stats}
                    />
                  ))
                : <li>Selecciona los Pokemon que quieres en tu equipo</li>
          }
        </ul>
      </div>
    </div>
  )
}