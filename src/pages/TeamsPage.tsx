import classes from "@/pages/TeamsPage.module.css";
import { usePokemonFilter } from "@/store";
import { X } from "lucide-react";
import { useId } from "react";

export default function TeamsPage() {
  const inputFilterId = useId();
  const filter = usePokemonFilter((state) => state.filter);
  const setFilter = usePokemonFilter((state) => state.setFilter)
  const resetFilter = usePokemonFilter((state) => state.resetFilter)

  return(
    <div className={classes.teamsMainContainer}>
      <div className={classes.filterRender}>
        <form 
          onSubmit={(e) => e.preventDefault()}
          className={classes.form}
        >
          <input 
            type="text" 
            id={inputFilterId}
            className={classes.teamsFilterInput} 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className={classes.formButton}
            onClick={resetFilter}
            disabled={!filter}
          >
            <X />
          </button>
        </form>
        <div>

        </div>
      </div>
      <div>

      </div>
    </div>
  )
}