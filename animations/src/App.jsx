import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CircleCard from './components/CircleCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CircleCard/>
    </>
  )
}

export default App
