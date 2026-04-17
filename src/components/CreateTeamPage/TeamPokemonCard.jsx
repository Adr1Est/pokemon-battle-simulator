import classes from "@/components/CreateTeamPage/TeamPokemonCard.module.css";
import { useTeamBuilder } from "@/store";
import { capitalize } from "@/utils/capitalize.utils";
import { pokemonTypeEmojis } from "@/utils/pokemon.utils";
import { Trash2 } from "lucide-react";

export default function TeamPokemonCard({ id, name, image, types, stats}) {
  const removePokemonFromTeam = useTeamBuilder((state) => state.removePokemonFromTeam);

  return(
    <li className={`${classes.teamPokemonContainer} glassmorphism`}>
      <div className={classes.containerInfo1}>
        <img src={image} alt={`Imagen del pokemon ${name}`} />
        <p>{capitalize(name)}</p>
        <div className={classes.typesContainer}>
          {types.map((t) => (
            <span key={t} title={t}>
              {pokemonTypeEmojis[t]}
            </span>
          ))}
        </div>
      </div>
      <div className={classes.containerInfo2}>
        <ul className={classes.statsContainer}>
          {
            stats.map((s) => (
              <p key={s.name}>
                {`${capitalize(s.name)}: ${s.baseStat}`}
              </p>
            ))
          }
        </ul>
        <button
          className={classes.deletePokemonButton}
          onClick={() => removePokemonFromTeam(id)}
        >
          <Trash2 />
          <span>Quitar del equipo</span>
        </button>
      </div>
    </li>
  )
}