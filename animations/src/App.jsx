import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CircleCard from './components/CircleCard'
import CardsPage from './cards/cardsPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CardsPage/>
    </>
  )
}

export default App
