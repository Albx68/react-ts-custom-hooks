import useKeyboardEvent from "../utils/customHooks/useKeyboardEvent"

const KeyboardEvents = () => {
    const keyboardEvent = useKeyboardEvent()
    console.log("keyboard event", keyboardEvent)
    return (
        <div>{JSON.stringify(keyboardEvent)}</div>
    )
}

export default KeyboardEvents