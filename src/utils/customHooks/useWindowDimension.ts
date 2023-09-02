import { useState, useEffect } from 'react';

interface WindowDimensions {
    width: number;
    height: number;
}

const useWindowDimensions = (): WindowDimensions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowDimensions;
};

export default useWindowDimensions;