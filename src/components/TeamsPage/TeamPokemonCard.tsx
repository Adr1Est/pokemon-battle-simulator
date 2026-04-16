import classes from "@/components/TeamsPage/TeamPokemonCard.module.css";
import type { Stat } from "@/types/pokemon.types";
import { capitalize } from "@/utils/capitalize.utils";
import { pokemonTypeEmojis } from "@/utils/pokemon.utils";
import { Trash2 } from "lucide-react";

interface Props {
  name: string;
  image: string;
  types: string[];
  stats: Stat[];
}

export default function TeamPokemonCard({ name, image, types, stats}: Props) {
  return(
    <li className={`${classes.teamPokemonContainer} glassmorphism`}>
      <div className={classes.containerInfo1}>
        <img src={image} alt={`Imagen del pokemon ${name}`} />
        <p>{capitalize(name)}</p>
        <div className={classes.typesContainer}>
          {types.map((t: string) => (
            <span key={t} title={t}>
              {pokemonTypeEmojis[t]}
            </span>
          ))}
        </div>
      </div>
      <div className={classes.containerInfo2}>
        <ul className={classes.statsContainer}>
          {
            stats.map((s: Stat) => (
              <p key={s.name}>
                {`${capitalize(s.name)}: ${s.baseStat}`}
              </p>
            ))
          }
        </ul>
        <button
          className={classes.deletePokemonButton}
        >
          <Trash2 />
          <span>Quitar del equipo</span>
        </button>
      </div>
    </li>
  )
}