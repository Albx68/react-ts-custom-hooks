/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

function useKeyboardEventAsync(keys: string[], callbackKeyDown: (event: KeyboardEvent) => void, callBackKeyUp: (event: KeyboardEvent) => void): void {
    const [pressedKeys, setPressedKeys] = useState<KeyboardEvent[]>([])

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent): void {
            if (keys.includes(event.key)) {
                setPressedKeys(p => [...p, event])
            }
        }

        function handleKeyUp(event: KeyboardEvent): void {
            if (keys.includes(event.key)) {
                setPressedKeys(p => {
                    return p.filter(el => el.key !== event.key)
                })
                callBackKeyUp(event)
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        pressedKeys.forEach(event => {
            callbackKeyDown(event)
        });
    }, [pressedKeys])
}

export default useKeyboardEventAsync;
