import { useState } from "react"
import TeamCard from "@/components/TeamsPage/TeamCard"
import classes from "@/pages/TeamsPage.module.css"
import { usePokemonTeams } from "@/store"
import { DragDropProvider } from "@dnd-kit/react"

export default function TeamsPage() {
  const teams = usePokemonTeams((state) => state.teams)
  const reorderPokemon = usePokemonTeams((state) => state.reorderPokemon)
  const [selectedTeams, setSelectedTeams] = useState([])

  const handleSelectTeam = (teamId) => {
    setSelectedTeams((prev) => {
      if(prev.includes(teamId)) return prev.filter((id) => id !== teamId)
      if(prev.length === 2) return prev
      return [...prev, teamId]
    })
  }

  const handleDragEnd = (event) => {
    const { source, target } = event.operation

    if (!target || source.id === target.id) return

    const team = teams.find((t) =>
      t.team.some((p) => p.id === source.id)
    )
    if (!team) return

    if (team.id !== target.id && !team.team.some((p) => p.id === target.id)) return

    const fromIndex = team.team.findIndex((p) => p.id === source.id)

    const toIndex = team.team.findIndex((p) => p.id === target.id)
    if (toIndex === -1) return

    reorderPokemon(team.id, fromIndex, toIndex)
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.btnGroup}>
        <button 
          className={classes.fightBtn}
          disabled={selectedTeams.length !== 2}
          onClick={() => console.log(selectedTeams)}
        >
          Pelear
        </button>
      </div>
      <DragDropProvider onDragEnd={handleDragEnd}>
        {
          teams.length > 0
            ? (
                teams.map((t, i) => (
                  <TeamCard 
                    key={t.id}
                    id={t.id}
                    index={i}
                    team={t.team}
                    isSelected={selectedTeams.includes(t.id)}
                    onSelect={handleSelectTeam}
                  />
                ))
              )
            : <p>Sin equipos</p>
        }
      </DragDropProvider>
    </div>
  )
}