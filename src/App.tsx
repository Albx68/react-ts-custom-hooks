import { useCallback, useRef } from "react";
import "./App.css";
import useCycle from "./utils/customHooks/useCycle";
import useLocalStorage from "./utils/customHooks/useLocalStorage";
import useMousePointer from "./utils/customHooks/useMousePointer";
import useTimer from "./utils/customHooks/useTimer";
import useInView from "./utils/customHooks/useInView";

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
  const inViewTestRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(inViewTestRef, {})
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
      <div style={{ position: "sticky", padding: "20px", color: isInView ? "#99ff99" : "#ff9999" }}>{isInView ? "Green Box In View" : "Green Box not in view, scroll"}</div>

      <div style={{ height: "600px" }}></div>
      <div style={{ height: "60px", width: "60px", borderRadius: "10px", backgroundColor: "#99ff99" }} ref={inViewTestRef}></div>

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
