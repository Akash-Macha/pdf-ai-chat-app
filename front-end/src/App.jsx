import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>A PDF Chat App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Login
        </button>
      </div>
      <p className="read-the-docs">
        Made with love ❤️ by Akash Macha
      </p>
    </>
  )
}

export default App
