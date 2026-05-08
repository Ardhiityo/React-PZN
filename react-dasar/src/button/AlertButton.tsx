import { useRef, type MouseEvent } from "react";

export default function AlertButton({ text, message }: { text: string, message: string }) {
    //ref tidak untuk dirender, hanya untuk state internal
    const counter = useRef(0);

    function handleClick(event: MouseEvent<HTMLButtonElement>): void {
        console.log(event)
        console.log(event.target)
        alert(`${message}, counter: ${counter.current++}`);
    }
    return (
        <>
            {/* Cara 1 */}
            <button onClick={handleClick}>Event button</button>

            {/* Cara 2 */}
            <button onClick={() => alert(message)}>{text}</button>
        </>
    )
}