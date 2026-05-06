import type { MouseEvent } from "react";

export default function Toolbar(
    { handleClick }: { handleClick: (event: MouseEvent<HTMLElement>) => void }) {
    return (
        <div onClick={handleClick} style={{ backgroundColor: 'red' }}>
            <button onClick={handleClick}>Event Propagation</button>
        </div>
    )
}