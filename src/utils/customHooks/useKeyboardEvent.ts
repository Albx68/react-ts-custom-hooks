import { useEffect } from 'react';

function useKeyboardEvent(keys: string[], callback: (event: KeyboardEvent) => void): void {
    useEffect(() => {
        const keysSet = new Set(keys)

        function handleKeyDown(event: KeyboardEvent): void {
            if (keysSet.has(event.key)) {
                callback(event);
            }
        }
        function handleKeyUp(event: KeyboardEvent): void {
            if (keysSet.has(event.key)) {
                callback(event);
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);

        };
    }, [keys, callback]);
}

export default useKeyboardEvent;