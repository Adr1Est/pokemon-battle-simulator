import classes from "@/components/TeamsPage/TeamCard.module.css"
import { usePokemonTeams } from "@/store"
import { Trash2, Shuffle, Swords } from "lucide-react"
import { useState } from "react"
import { useDroppable } from "@dnd-kit/react"
import SinglePokemonCard from "./SinglePokemonCard"

export default function TeamCard({ id, index, team }) {
  const [isSecondChance, setIsSecondChance] = useState(false)
  const deleteTeam = usePokemonTeams((state) => state.deleteTeam)
  const shuffleTeam = usePokemonTeams((state) => state.shuffleTeam)
  const sortTeamByAttack = usePokemonTeams((state) => state.sortTeamByAttack)
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
      <div className={classes.btnGroup}>
        <div>
          <p>ordenar</p>
          <div>
            <button className={classes.shuffleBtn} onClick={() => shuffleTeam(id)}>
              <Shuffle />
            </button>
            <button className={classes.attackBtn} onClick={() => sortTeamByAttack(id)}>
              <Swords />
            </button>
          </div>
        </div>
        <button className={classes.trashBtn} onClick={handleDeleteTeam}>
          {isSecondChance ? "¿Estás seguro?" : <Trash2 />}
        </button>
      </div>
    </div>
  )
}