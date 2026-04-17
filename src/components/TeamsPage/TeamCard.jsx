import classes from "@/components/TeamsPage/TeamCard.module.css"
import { capitalize } from "@/utils/capitalize.utils"
import { pokemonStatsParser, pokemonTypeEmojis } from "@/utils/pokemon.utils"
import { GripHorizontal, Trash2 } from "lucide-react"

export default function TeamCard({ index, team }) {
  return (
    <div className={`${classes.mainContainer} glassmorphism`}>
      <h2>Equipo {index + 1}</h2>
      <ul className={classes.renderTeamsContainer}>
        {
          team.map((p) => (
            <li key={p.id} className={classes.pokemonInfo}>
              <img src={p.image} alt={`Imagen del pokemon ${p.name}`} />
              <div className={classes.data1}>
                <h3>{capitalize(p.name)}</h3>
                <p>
                  {
                    p.types.map((t) => pokemonTypeEmojis[t])
                  }
                </p>
              </div>
              <div className={classes.statsContainer}>
                {
                  p.stats.map((s) => (
                    <p key={`${s.name}:${s.baseStat}`}>
                      {`${capitalize(pokemonStatsParser[s.name])}: ${s.baseStat}`}
                    </p>
                  ))
                }
              </div>
              <div className={classes.buttons}>
                <button className={classes.gripBtn}>
                  <GripHorizontal />
                </button>
                <button className={classes.trashBtn}>
                  <Trash2 size={18}/>
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}