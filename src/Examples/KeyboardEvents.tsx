import { ReactNode, useCallback, useState } from "react"
import { motion } from "framer-motion"
import useKeyboardEventAsync from "../utils/customHooks/useKeyboardEventAsync";
import useWindowDimensions from "../utils/customHooks/useWindowDimension";

type playerMovement = {
    x: number;
    y: number
}

const KeyboardEvents = () => {
    const { width } = useWindowDimensions()
    const player_size = width / 20
    const [playerMovement, setPlayerMovement] = useState({ x: width / 2, y: PLAYGROUND_HEIGHT - player_size })
    return (
        <div className="w-screen">
            <Gap />
            <PlayGround ><Player playerMovement={playerMovement} player_size={player_size} />
            </PlayGround>
            <Gap />

            <div className="justify-center flex">
                <Joystick setPlayerMovement={setPlayerMovement} playerMovement={playerMovement} player_size={player_size} />
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
    const { width } = useWindowDimensions()
    const viewBox = `0 0 ${width} ${PLAYGROUND_HEIGHT}`
    return <div className="flex justify-center item-center">
        <svg viewBox={viewBox} className="border-2 rounded-lg border-[#99ff99]" height={PLAYGROUND_HEIGHT} width={width}>
            {children}
        </svg>
    </div>
}



const Player = ({ playerMovement, player_size }: { playerMovement: playerMovement, player_size: number }) => {


    return <motion.rect height={player_size} width={player_size} fill={"#99ff99"} animate={{ x: playerMovement.x, y: playerMovement.y }}>{JSON.stringify(playerMovement)}</motion.rect>
}
const initialJoystick = { x: 0, y: 0 }
const initialVelocity = { 'a': 0, 'd': 0, 'w': 0, 's': 0 }

const Joystick = ({ setPlayerMovement, playerMovement, player_size }: {
    setPlayerMovement: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
    }>>, playerMovement: {
        x: number;
        y: number
    }, player_size: number
}) => {
    const { width } = useWindowDimensions()
    const velocity = 3
    const [currentBtn, setCurrentBtn] = useState<KeyboardEvent>()
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

    const handleMove = useCallback((event: KeyboardEvent) => {
        const speed = player_size
        setCurrentBtn(event)
        let t: number
        const handleKey = (key: string) => {
            switch (key) {
                case "w":
                    setPlayerMovement(p => ({ ...p, y: PLAYGROUND_HEIGHT - 2 * player_size }))
                    t = setTimeout(() => {
                        setPlayerMovement(p => ({ ...p, y: PLAYGROUND_HEIGHT - player_size }))
                        clearTimeout(t)
                    }, 100)
                    break
                case "s":
                    setPlayerMovement(p => ({ ...p, y: PLAYGROUND_HEIGHT - player_size / 2 }))
                    t = setTimeout(() => {
                        setPlayerMovement(p => ({ ...p, y: PLAYGROUND_HEIGHT - player_size }))
                        clearTimeout(t)
                    }, 100)
                    break
            }
        }
        const checkBound = () => {
            if (
                playerMovement.x < 10 ||
                playerMovement.x > width - 10 ||
                playerMovement.y < 10 ||
                playerMovement.y > PLAYGROUND_HEIGHT - 10
            ) {
                // Player is out of bounds, reset their position
                const newX = Math.min(Math.max(playerMovement.x, 10), width - 10);
                const newY = Math.min(Math.max(playerMovement.y, 10), PLAYGROUND_HEIGHT - 10);

                setPlayerMovement({ x: newX, y: newY });

                return false;
            } else {
                return true
            }
        }
        if (checkBound()) {
            const xMap = {
                'a': -speed,
                'd': speed
            }
            const yMap = {
                'w': -speed,
                's': speed
            }

            if (event.key in xMap) {
                const direction = getDirection(xMap[event.key as keyof typeof xMap])
                setPlayerMovement(p => ({ ...p, x: p.x + xMap[event.key as keyof typeof xMap] + (direction * velocityMap[event.key as keyof typeof velocityMap]) }))
                setJoystickMovement(p => ({ ...p, x: xMap[event.key as keyof typeof xMap] }))
                setVelocityMap(p => ({ ...p, [event.key]: p[event.key as keyof typeof p] + velocity }))
            }
            if (event.key in yMap) {
                const direction = getDirection(yMap[event.key as keyof typeof yMap])
                // setPlayerMovement(p => ({ ...p, y: p.y + yMap[event.key as keyof typeof yMap] + (direction * velocityMap[event.key as keyof typeof velocityMap]) }))
                setJoystickMovement(p => ({ ...p, y: yMap[event.key as keyof typeof yMap] }))
                setVelocityMap(p => ({ ...p, [event.key]: p[event.key as keyof typeof p] + velocity }))

            }
            handleKey(event.key)

        }
    }, [playerMovement.x, playerMovement.y, width, velocityMap, setPlayerMovement, player_size])

    const handleResetKeyUp = useCallback((event: KeyboardEvent) => {
        if (event.type === "keyup") {
            setCurrentBtn(undefined)
            const t = setTimeout(() => {
                setJoystickMovement(initialJoystick)
                setVelocityMap(initialVelocity)
                clearTimeout(t)
            }, 50)
        }
    }, [])



    useKeyboardEventAsync(['a', 'd', 'w', 's'], handleMove, handleResetKeyUp);

    return <div className="flex flex-col justify-center items-center gap-4">
        <div className="bg-emerald-100 h-20 w-20 rounded-full flex justify-center items-center">
            <motion.div className="bg-emerald-700 h-12 w-12 rounded-full" animate={{ x: joystickMovement.x, y: joystickMovement.y }}></motion.div>
        </div >
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 flex justify-center"><div className={`${currentBtn?.key === 'w' ? 'bg-emerald-500' : 'bg-emerald-100'} text-emerald-900 px-8 py-6 rounded-lg text-xl `}>W</div></div>
            {['A', 'S', 'D'].map(el => <div key={el} className={`${currentBtn?.key === el.toLowerCase() ? 'bg-emerald-500' : 'bg-emerald-100'} text-emerald-900 px-8 py-6 rounded-lg text-xl`}>{el}</div>)}
        </div>
    </div>
}


