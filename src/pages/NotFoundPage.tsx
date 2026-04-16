import { Link } from "react-router";

export default function NotFoundPage() {
  return(
    <div>
      <p>Página no encontrada</p>
      <Link
        to="/"
      >
        Volver
      </Link>
    </div>
  )
}