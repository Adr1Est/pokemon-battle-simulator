import classes from "@/components/TeamsPage/SinglePokemonCard.module.css"
import { capitalize } from "@/utils/capitalize.utils"
import { pokemonStatsParser, pokemonTypeEmojis } from "@/utils/pokemon.utils"
import pokeballImg from "/pokeball.png"
import { GripHorizontal } from "lucide-react"
import { useRef } from "react"
import { useDraggable } from "@dnd-kit/react"

export default function SinglePokemonCard({ pokemon }) {
  const handleRef = useRef(null)
  const { ref } = useDraggable({ 
    id: pokemon.id, 
    handle: handleRef
  })
  
  return (
    <li ref={ref} className={classes.pokemonInfo}>
        <img src={pokemon.image || pokeballImg} alt={`Imagen del pokemon ${pokemon.name}`} />
        <div className={classes.data1}>
          <h3>{capitalize(pokemon.name)}</h3>
          <p>
            {
              pokemon.types.map((t) => pokemonTypeEmojis[t])
            }
          </p>
        </div>
        <div className={classes.statsContainer}>
          {
            pokemon.stats.map((s) => (
              <p key={`${s.name}:${s.baseStat}`}>
                {`${capitalize(pokemonStatsParser[s.name])}: ${s.baseStat}`}
              </p>
            ))
          }
        </div>
        <div className={classes.buttons}>
          <button ref={handleRef} className={classes.gripBtn}>
            <GripHorizontal />
          </button>
        </div>
      </li>
  )
}