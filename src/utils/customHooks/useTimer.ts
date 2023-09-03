import { useState, useEffect, useCallback } from 'react';

/**
 * A custom React hook for creating a timer that counts down from a specified duration.
 *
 * @param initialDuration - The initial duration of the timer in milliseconds.
 * @param onTimerEnd - A callback function to execute when the timer reaches zero.
 * @returns An object containing the current time remaining and functions to start, stop, or reset the timer.
 * 
 * use with caution as timer is in milliseconds, the component will rerender each millisecond, you can change the setInterval duration from 1 to 1000 to convert to seconds
 * recommended to wrap onTimerEnd callback in a useCallback hook to prevent unnecessary rerenders
 */
function useTimer(
    initialDuration: number,
    onTimerEnd?: () => void
): {
    timeRemaining: number;
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
    timerInProgress: boolean;
} {
    const [timeRemaining, setTimeRemaining] = useState(initialDuration);
    const [timerActive, setTimerActive] = useState(false);

    const timerInProgress = timeRemaining > 0 && timerActive;

    const startTimer = useCallback(() => {
        setTimerActive(true);
    }, []);

    const stopTimer = useCallback(() => {
        setTimerActive(false);
    }, []);

    const resetTimer = useCallback(() => {
        setTimerActive(false);
        setTimeRemaining(initialDuration);
    }, [initialDuration]);

    useEffect(() => {
        let timerInterval: number;

        if (timerActive && timeRemaining > 0) {
            timerInterval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            setTimerActive(false);
            if (onTimerEnd) {
                onTimerEnd();
            }
        }

        return () => clearInterval(timerInterval);
    }, [timerActive, timeRemaining, onTimerEnd]);

    return {
        timeRemaining,
        startTimer,
        stopTimer,
        resetTimer,
        timerInProgress,
    };
}

export default useTimer;