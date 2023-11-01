import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [numberRequired, setNumberRequired] = useState(false)
  const [charRequired, setCharRequired] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberRequired) str += "0123456789"
    if (charRequired) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)


  }, [length, numberRequired, charRequired])


  useEffect(() => { passwordGenerator() },
    [length, numberRequired, charRequired, passwordGenerator])

  const copyPasswordToClipboard = () => {
    console.log("copyPasswordToClipboard called")
    passwordRef.current.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password)
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <input type="text" className="outline-none w-full py-1 px-3" value={password}
        ref={passwordRef}
        placeholder="Password" readOnly />
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        on onClick={copyPasswordToClipboard}
      >copy</button>

      <div className='flex items-center gap-x-1'>
        <input type="range" min={6} max={100} value={length} className='cursor-pointer'
          onChange={(e) => { setLength(e.target.value) }} />
        <label>Length: {length}</label>
        <input type="checkbox" onChange={() => { setNumberRequired((prev) => !prev) }} />
        <label>Numbers</label>
        <input type="checkbox" onChange={() => { setCharRequired((prev) => !prev) }} />
        <label>Characters</label>
      </div>

    </div>
  )
}

export default App
