
import './App.css'
import useLocalStorage from './utils/customHooks/useLocalStorage'

function App() {
  const [val, setVal] = useLocalStorage('test', 'hello')
  const handleToggle = () => {
    if (val === "hello") {
      setVal("hi")
    }
    else {
      setVal("hello")
    }
  }
  return (
    <>
      <p>testing use Local storage</p>
      <p>Val: {val}</p>
      <button onClick={handleToggle}>toggle val</button>
    </>
  )
}

export default App
