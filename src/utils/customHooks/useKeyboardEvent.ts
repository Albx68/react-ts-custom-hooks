import { useCallback, useEffect, useState } from "react"


type keyPressed = {
    key: string;
    type: string;
    code: string;
    ctrlKey?: boolean;
    altKey?: boolean;
    shiftKey?: boolean;
    metaKey?: boolean;
}

const useKeyboardEvent = () => {
    const [keyPressed, setKeyPressed] = useState<keyPressed>()
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const { type, code, key, shiftKey, ctrlKey, metaKey } = event
        setKeyPressed({ type, code, key, shiftKey, ctrlKey, metaKey })
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    })

    return keyPressed

}


export default useKeyboardEvent