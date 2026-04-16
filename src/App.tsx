import classes from '@/App.module.css'
import { Outlet } from 'react-router'

function App() {

  return (
    <main className={classes.mainContainer}>
      <Outlet />
    </main>
  )
}

export default App
