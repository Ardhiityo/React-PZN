import { useRef, useState } from "react"

export default function Timer() {
    const [start, setStart] = useState<number>(0);
    const [now, setNow] = useState<number>(0);
    const timer = useRef<number>(0);

    function handleStart() {
        setStart(Date.now());
        setNow(Date.now());

        timer.current = setInterval(() => {
            setNow(Date.now());
        }, 100)
    }

    function handleStop() {
        clearInterval(timer.current);
    }

    return (
        <>
            <h1>Timer</h1>
            <h2>
                {now - start}
            </h2>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </>
    )
}