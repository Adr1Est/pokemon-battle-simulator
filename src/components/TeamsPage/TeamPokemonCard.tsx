import classes from "@/components/TeamsPage/TeamPokemonCard.module.css";
import { capitalize } from "@/utils/capitalize.utils";
import { pokemonTypeEmojis } from "@/utils/pokemon.utils";

interface Props {
  name: string;
  image: string;
  types: string[];
}

export default function TeamPokemonCard({ name, image, types}: Props) {
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
      
    </li>
  )
}