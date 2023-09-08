import { useState, useEffect } from "react";

type DebouncedValue<T> = T | undefined;

/**
 * Debounces a value, delaying updates until a specified time period has passed
 *
 * @template T - The type of the value being debounced
 * @param {T} value - The value to be debounced
 * @param {number} delay - The debounce delay in milliseconds
 * @returns {T | undefined} - The debounced value
 */
function useDebounce<T>(value: T, delay: number): DebouncedValue<T> {
  const [debouncedValue, setDebouncedValue] =
    useState<DebouncedValue<T>>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
