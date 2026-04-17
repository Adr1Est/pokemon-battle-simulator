import { Link } from "react-router";
import classes from "@/components/shared/NavBarCustomLink.module.css"

export default function NavBarCustomLink({ to, label }) {
  return (
    <Link
      to={to}
      className={classes.mainContainer}
    >
      {label}
    </Link>
  )
}