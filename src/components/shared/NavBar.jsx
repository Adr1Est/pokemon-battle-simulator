import classes from "@/components/shared/NavBar.module.css"
import NavBarCustomLink from "./NavBarCustomLink"
import { Home } from "lucide-react"

export default function NavBar() {
  return (
    <nav className={`${classes.navBarMainContainer} glassmorphism`}>
      <NavBarCustomLink 
        to="/"
        label={<Home />}
      />
      <NavBarCustomLink 
        to="/teams"
        label="Mis equipos"
      />
    </nav>
  )
}