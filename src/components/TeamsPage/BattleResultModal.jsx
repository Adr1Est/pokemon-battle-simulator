import classes from "@/components/TeamsPage/BattleResultModal.module.css"
import { capitalize } from "@/utils/capitalize.utils"
import { Skull } from "lucide-react"
import { Heart } from "lucide-react"
import { Trophy } from "lucide-react"
import { X } from "lucide-react"

export default function BattleResultModal({ result, onClose }) {
  const {
    rounds,
    winner,
    teamAName,
    teamBName,
    teamASurvivors,
    teamBSurvivors,
    teamADefeated,
    teamBDefeated,
  } = result

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <button className={classes.closeBtn} onClick={onClose}>
          <X />
        </button>

        <h2 className={classes.winner}>
          <Trophy /> {winner === "teamA" ? teamAName : teamBName} gana!
        </h2>

        <section className={classes.rounds}>
          <h3>Rondas</h3>
          {rounds.map((round, i) => (
            <div key={i} className={classes.round}>
              <div className={`${classes.pokemon} ${round.winner === round.pokemonA ? classes.won : classes.lost}`}>
                <img src={round.pokemonA.image} alt={round.pokemonA.name} className={classes.pokemonImg} />
                <span>{capitalize(round.pokemonA.name)}</span>
              </div>
              <span className={classes.vs}>vs</span>
              <div className={`${classes.pokemon} ${round.winner === round.pokemonB ? classes.won : classes.lost}`}>
                <span>{capitalize(round.pokemonB.name)}</span>
                <img src={round.pokemonB.image} alt={round.pokemonB.name} className={classes.pokemonImg} />
              </div>
            </div>
          ))}
        </section>

        <section className={classes.summary}>
          <div className={classes.teamSummary}>
            <h3>{teamAName}</h3>
            <p><span><Heart /></span> Vivos: {teamASurvivors.length}</p>
            <p><span><Skull /></span> Debilitados: {teamADefeated.length}</p>
          </div>
          <div className={classes.teamSummary}>
            <h3>{teamBName}</h3>
            <p><span><Heart /></span> Vivos: {teamBSurvivors.length}</p>
            <p><span><Skull /></span> Debilitados: {teamBDefeated.length}</p>
          </div>
        </section>
      </div>
    </div>
  )
}