import classes from "@/pages/TeamsPage.module.css";
import { X } from "lucide-react";
import { useId } from "react";

export default function TeamsPage() {
  const inputFilterId = useId();
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
          />
          <button
            className={classes.formButton}
            onClick={() => console.log("btn")}
            disabled={true}
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