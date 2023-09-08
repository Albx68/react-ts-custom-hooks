import { useCallback } from "react";
import "./App.css";
import useCycle from "./utils/customHooks/useCycle";
import useLocalStorage from "./utils/customHooks/useLocalStorage";
import useMousePointer from "./utils/customHooks/useMousePointer";
import useTimer from "./utils/customHooks/useTimer";

function App() {
  return (
    <>
      <Example />
    </>
  );
}

export default App;

const timerDuration = 100000;
function Example() {
  const { currentValue, cycleToPrevValue, cycleToNextValue } = useCycle([
    "🎃",
    "👾",
    "🐸",
  ]);
  const timerCallback = useCallback(() => {
    return alert(`Timer of ${timerDuration}s has ended`);
  }, []);
  const { timeRemaining, startTimer, stopTimer, resetTimer, timerInProgress } =
    useTimer(timerDuration, timerCallback);
  const [storedValue, setStoredValue] = useLocalStorage(
    "myKey",
    "default-value",
  );
  const { x, y } = useMousePointer();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoredValue(e.target.value);
  };

  return (
    <div>
      <p>
        Mouse X:{x} Y:{y}
      </p>
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

      <div>
        <p>{timerInProgress && "waiting for OTP"}</p>
        <p>{timeRemaining}</p>
        <p>{millisecondsToMinutesAndSeconds(timeRemaining)}</p>
        <button onClick={stopTimer}>Stop Timer</button>
        <button onClick={startTimer}>start timer</button>
        <button onClick={resetTimer}>Reset timer</button>
      </div>
    </div>
  );
}

function millisecondsToMinutesAndSeconds(milliseconds: number) {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format the result as "Xm:Ys"
  return `${minutes}m:${seconds}s`;
}
