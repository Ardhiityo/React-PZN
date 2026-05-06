import type { MouseEvent } from "react";

export default function AlertButton({ text, message }: { text: string, message: string }) {
    function handleClick(event: MouseEvent<HTMLButtonElement>): void {
        console.log(event)
        console.log(event.target)
        alert(message);
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