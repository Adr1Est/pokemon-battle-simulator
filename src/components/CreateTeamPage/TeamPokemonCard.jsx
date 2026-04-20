import classes from "@/components/CreateTeamPage/TeamPokemonCard.module.css";
import { useRef } from "react";
import { useTeamBuilder } from "@/store";
import { capitalize } from "@/utils/capitalize.utils";
import { pokemonTypeEmojis } from "@/utils/pokemon.utils";
import { Trash2 } from "lucide-react";
import pokeballImg from "/pokeball.png"
import { GripHorizontal } from "lucide-react";
import { useDraggable, useDroppable } from "@dnd-kit/react";

export default function TeamPokemonCard({ id, name, image, types, stats}) {
  const removePokemonFromTeam = useTeamBuilder((state) => state.removePokemonFromTeam);
  const handleRef = useRef(null)
  const { ref: draggableRef } = useDraggable({ id, handle: handleRef })
  const { ref: droppableRef } = useDroppable({ id })

  const ref = (node) => {
    draggableRef(node)
    droppableRef(node)
  }

  return(
    <li ref={ref} className={`${classes.teamPokemonContainer} glassmorphism`}>
      
      <img src={image || pokeballImg} alt={`Imagen del pokemon ${name}`} />

      <div className={classes.containerInfo1}>
        <p>{capitalize(name)}</p>
        <div className={classes.typesContainer}>
          {types.map((t) => (
            <span key={t} title={t}>
              {pokemonTypeEmojis[t]}
            </span>
          ))}
        </div>
      </div>

      <ul className={classes.statsContainer}>
          {
            stats.map((s) => (
              <p key={s.name}>
                {`${capitalize(s.name)}: ${s.baseStat}`}
              </p>
            ))
          }
      </ul>
      
      <div className={classes.btnGroup}>
        <button
          ref={handleRef}
          className={classes.dragPokemonButton}
          onClick={""}
        >
          <GripHorizontal />
        </button>
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