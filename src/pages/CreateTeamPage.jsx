import TeamPokemonCard from "@/components/CreateTeamPage/TeamPokemonCard";
import { useInfinitePokemon, usePokemonSearch, usePokemonTypes, useSearchPokemonByType, useSinglePokemonInfo } from "@/hooks/usePokemonData";
import classes from "@/pages/CreateTeamPage.module.css";
import { usePokemonFilter, usePokemonTeams, useTeamBuilder } from "@/store";
import { capitalize } from "@/utils/capitalize.utils";
import { createPokemonTeamWithId, mapPokemon } from "@/utils/pokemon.utils";
import { ArrowBigRight, CircleEllipsis, Loader, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { pokemonTypeEmojis } from "@/utils/pokemon.utils";
import { DragDropProvider } from "@dnd-kit/react";
import { useNavigate } from "react-router";

export default function CreateTeamPage() {
  const [selectedType, setSelectedType] = useState(null)
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
  const { data: types, isLoading: isPokemonTypesLoading } = usePokemonTypes()
  const { data: pokemonByType, isFetching: isFetchingByType } = useSearchPokemonByType(selectedType)
  const reorderTeamLayout = useTeamBuilder((state) => state.reorderTeamLayout)

  const navigate = useNavigate()

  const handleDragEnd = (event) => {
    const { source, target } = event.operation
    if (!target || source.id === target.id) return

    const fromIndex = teamLayout.findIndex((p) => p.id === source.id)
    const toIndex = teamLayout.findIndex((p) => p.id === target.id)
    if (toIndex === -1) return

    reorderTeamLayout(fromIndex, toIndex)
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfinitePokemon();

  const isFilteringByName = filter.trim().length > 0;
  const isFilteringByType = !!selectedType;
  const { data: allPokemonList, isFetching: isFetchingSearch } = usePokemonSearch(isFilteringByName);

  const isFetching = isFetchingSearch || isFetchingByType;

  const handleClick = () => {
    createTeam(createPokemonTeamWithId(teamLayout));
    resetTeam();
    navigate("/teams")
  }

  const handleTypeClick = (typeName) => {
    setSelectedType(prev => prev === typeName ? null : typeName)
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
  const typePokemon = pokemonByType?.pokemon.map((p) => p.pokemon) || []; 

  const pokemonList = isFilteringByName
    ? searchPokemon
    : isFilteringByType
      ? typePokemon
      : infinitePokemon;

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
        <div className={classes.typeBtnGroup}>
          {
            isPokemonTypesLoading
              ? <p>Cargando tipos...</p>
              : types.results.map((t) => (
                  <button 
                    key={t.url} 
                    title={t.name}
                    onClick={() => handleTypeClick(t.name)}
                    className={selectedType === t.name ? classes.activeType : ""}
                  >
                    {pokemonTypeEmojis[t.name]}
                  </button>
                ))
          }
        </div>
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
            !isFilteringByName && !isFilteringByType && (
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
          <div>
            <button
              onClick={""}
              className={classes.discardBtn}
              disabled={teamLayout.length === 0}
            >
              <X />
            </button>
            <button
              onClick={handleClick}
              className={classes.createTeamBtn}
              disabled={teamLayout.length !== 6}
            >
              Crear equipo
            </button>
          </div>
          <p className={`${classes.teamInfo} ${teamLayout.length > 6 ? classes.warn : ""}`}>{`${teamLayout.length}/6`}</p>    
        </div>
        <DragDropProvider onDragEnd={handleDragEnd}>
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
        </DragDropProvider>
      </div>
    </div>
  )
}