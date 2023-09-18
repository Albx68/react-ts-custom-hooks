import { ReactNode, useState } from "react"
import useKeyboardEvent from "../utils/customHooks/useKeyboardEvent"
import { motion } from "framer-motion"

type playerMovement = {
    x: number;
    y: number
}

const KeyboardEvents = () => {
    const [playerMovement, setPlayerMovement] = useState({ x: 0, y: 0 })
    return (
        <div className="w-screen">
            <Gap />
            <PlayGround ><Player playerMovement={playerMovement} />
            </PlayGround>
            <Gap />

            <div className="justify-center flex">
                <Joystick setPlayerMovement={setPlayerMovement} playerMovement={playerMovement} />
            </div>
        </div>
    )
}

export default KeyboardEvents

const Gap = () => {
    return <div className="h-8 w-8"></div>
}

const PLAYGROUND_HEIGHT = 400
const PLAYGROUND_WIDTH = 400

const PlayGround = ({ children }: { children: ReactNode }) => {
    const viewBox = `0 0 ${PLAYGROUND_HEIGHT} ${PLAYGROUND_WIDTH}`
    return <div className="flex justify-center item-center">
        <svg viewBox={viewBox} className="border-2 rounded-lg border-[#99ff99]" height={PLAYGROUND_HEIGHT} width={PLAYGROUND_WIDTH}>
            {children}
        </svg>
    </div>
}



const Player = ({ playerMovement }: { playerMovement: playerMovement }) => {
    return <motion.circle r={10} fill={"#99ff99"} animate={{ cx: playerMovement.x, cy: playerMovement.y }}>{JSON.stringify(playerMovement)}</motion.circle>
}

const Joystick = ({ setPlayerMovement, playerMovement }: {
    setPlayerMovement: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>, playerMovement: {
        x: number;
        y: number
    }
}) => {
    const velocity = 3
    const initialJoystick = { x: 0, y: 0 }
    const initialVelocity = { 'a': 0, 'd': 0, 'w': 0, 's': 0 }
    const [joystickMovement, setJoystickMovement] = useState(initialJoystick)
    const [velocityMap, setVelocityMap] = useState(initialVelocity)
    const getDirection = (val: number) => {
        if (val > 0) {
            return 1
        }
        else {
            return -1
        }
    }
    const handleMove = (event: KeyboardEvent) => {

        const checkBound = () => {
            if (
                playerMovement.x < 10 ||
                playerMovement.x > PLAYGROUND_WIDTH - 10 ||
                playerMovement.y < 10 ||
                playerMovement.y > PLAYGROUND_HEIGHT - 10
            ) {
                // Player is out of bounds, reset their position
                const newX = Math.min(Math.max(playerMovement.x, 10), PLAYGROUND_WIDTH - 10);
                const newY = Math.min(Math.max(playerMovement.y, 10), PLAYGROUND_HEIGHT - 10);

                setPlayerMovement({ x: newX, y: newY });

                return false;
            } else {
                return true
            }
        }
        if (checkBound()) {
            const xMap = {
                'a': -20,
                'd': 20
            }
            const yMap = {
                'w': -20,
                's': 20
            }

            if (event.key in xMap) {
                const direction = getDirection(xMap[event.key as keyof typeof xMap])
                setPlayerMovement(p => ({ ...p, x: p.x + xMap[event.key as keyof typeof xMap] + (direction * velocityMap[event.key as keyof typeof velocityMap]) }))
                setJoystickMovement(p => ({ ...p, x: xMap[event.key as keyof typeof xMap] }))
                setVelocityMap(p => ({ ...p, [event.key]: p[event.key as keyof typeof p] + velocity }))
            }
            if (event.key in yMap) {
                const direction = getDirection(yMap[event.key as keyof typeof yMap])
                setPlayerMovement(p => ({ ...p, y: p.y + yMap[event.key as keyof typeof yMap] + (direction * velocityMap[event.key as keyof typeof velocityMap]) }))
                setJoystickMovement(p => ({ ...p, y: yMap[event.key as keyof typeof yMap] }))
                setVelocityMap(p => ({ ...p, [event.key]: p[event.key as keyof typeof p] + velocity }))

            }
            if (event.type === "keyup") {
                const t = setTimeout(() => {
                    setJoystickMovement(initialJoystick)
                    setVelocityMap(initialVelocity)
                    clearTimeout(t)
                }, 50)
            }
        }
    }

    useKeyboardEvent(['a', 'd', 'w', 's'], handleMove)


    return <div>
        <div className="bg-emerald-100 h-20 w-20 rounded-full flex justify-center items-center">
            <motion.div className="bg-emerald-700 h-12 w-12 rounded-full" animate={{ x: joystickMovement.x, y: joystickMovement.y }}></motion.div>
        </div >

    </div>
}


