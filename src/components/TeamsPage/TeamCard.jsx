import classes from "@/components/TeamsPage/TeamCard.module.css"
import { usePokemonTeams } from "@/store"
import { capitalize } from "@/utils/capitalize.utils"
import { pokemonStatsParser, pokemonTypeEmojis } from "@/utils/pokemon.utils"
import { GripHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import pokeballImg from "/pokeball.png"
import { useDroppable } from "@dnd-kit/react"
import SinglePokemonCard from "./SinglePokemonCard"

export default function TeamCard({ id, index, team }) {
  const [isSecondChance, setIsSecondChance] = useState(false)
  const deleteTeam = usePokemonTeams((state) => state.deleteTeam)
  const { ref } = useDroppable({ id })

  const handleDeleteTeam = () => {
    if(isSecondChance) {
      deleteTeam(id)
      setIsSecondChance(false)
    };
    setIsSecondChance(true);
  }

  return (
    <div ref={ref} className={`${classes.mainContainer} glassmorphism`}>
      <h2>Equipo {index + 1}</h2>
      <ul className={classes.renderTeamsContainer}>
        {
          team.map((p) => (
            <SinglePokemonCard 
              key={p.id}
              pokemon={p}
            />
          ))
        }
      </ul>
      <button 
        className={classes.trashBtn}
        onClick={handleDeleteTeam}
      >
        {isSecondChance ? "¿Estás seguro?" : <Trash2 />}
      </button>
    </div>
  )
}