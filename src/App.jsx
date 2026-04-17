import classes from '@/App.module.css'
import { Outlet } from 'react-router'
import NavBar from '@/components/shared/NavBar'

function App() {

  return (
    <main className={classes.mainContainer}>
      <NavBar />
      <Outlet />
    </main>
  )
}

export default App
