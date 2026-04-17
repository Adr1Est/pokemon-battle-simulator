import TeamCard from "@/components/TeamsPage/TeamCard"
import classes from "@/pages/TeamsPage.module.css"
import { usePokemonTeams } from "@/store"
import { DragDropProvider } from "@dnd-kit/react"

export default function TeamsPage() {
  const teams = usePokemonTeams((state) => state.teams)

  return (
    <div className={classes.mainContainer}>
      <DragDropProvider>
        {
          teams.length > 0
            ? (
                teams.map((t, i) => (
                  <TeamCard 
                    key={t.id}
                    id={t.id}
                    index={i}
                    team={t.team}
                  />
                ))
              )
            : <p>Sin equipos</p>
        }
      </DragDropProvider>
    </div>
  )
}