import { useState, useEffect } from 'react';

interface MouseCoordinates {
    x: number;
    y: number;
}

const useMousePointer = (): MouseCoordinates => {

    const [mousePosition, setMousePosition] = useState<MouseCoordinates>({
        x: 0,
        y: 0,
    });

    const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };

    }, []);

    return mousePosition;
};

export default useMousePointer;