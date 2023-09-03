
import './App.css'
import useCycle from './utils/customHooks/useCycle';
import useLocalStorage from './utils/customHooks/useLocalStorage';
import useMousePointer from './utils/customHooks/useMousePointer';

function App() {

  return (
    <>
      <Example />
    </>
  )
}

export default App

function Example() {
  const { currentValue, cycleToPrevValue, cycleToNextValue } = useCycle(["option 1", "option 2", "option 3"])
  const [storedValue, setStoredValue] = useLocalStorage('myKey', 'default-value');
  const { x, y } = useMousePointer()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoredValue(e.target.value);
  };

  return (
    <div>
      <p>Mouse X:{x} Y:{y}</p>
      <input
        type="text"
        value={storedValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>Stored Value: {storedValue}</p>
      <div>{currentValue}</div>
      <button onClick={cycleToPrevValue}>Prev</button>
      <button onClick={cycleToNextValue}>Next</button>
    </div>
  );
}

