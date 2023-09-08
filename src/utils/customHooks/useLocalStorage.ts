import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // get stored value from localStorage on initial render
  const storedValue = localStorage.getItem(key);

  // Initialize the state with the stored value or the provided initial value
  const [value, setValue] = useState<T>(
    storedValue ? JSON.parse(storedValue) : initialValue,
  );

  // Update the stored value in localStorage whenever the state changes
  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
