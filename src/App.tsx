
import './App.css'
import useLocalStorage from './utils/customHooks/useLocalStorage';

function App() {
  const [val, setVal] = useLocalStorage('test', 'hello')

  const handleToggle = () => {
    setVal(val === 'hello' ? 'hi' : 'hello');
  };

  return (
    <>
      <p>testing useLocalStorage</p>
      <p>Val: {val}</p>
      <button onClick={handleToggle}>toggle val</button>
    </>
  )
}

export default App
