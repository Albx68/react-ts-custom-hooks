import { useState, useCallback } from "react";
//* A custom React hook to cycle through an array of values.

function useCycle<T>(values: T[]): {
  currentValue: T;
  cycleToPrevValue: () => void;
  cycleToNextValue: () => void;
} {
  const [index, setIndex] = useState<number>(0);

  const cycleToPrevValue = useCallback(() => {
    setIndex((prevIndex) => (prevIndex - 1 + values.length) % values.length);
  }, [values.length]);

  const cycleToNextValue = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % values.length);
  }, [values.length]);

  return {
    currentValue: values[index],
    cycleToPrevValue,
    cycleToNextValue,
  };
}

export default useCycle;
