import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header} from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className='bg-green-600 p-4'>React router</h1>
      <Header/>
    </div>
  )
}

export default App
