import { useState } from "react";

export default function Counter({ name }: { name: string }) {
    const [count, setCount] = useState(0);
    return (
        <>
            <h1>Counter {name} : {count}</h1>
            <button onClick={() => setCount(count + 1)}>
                Counter
            </button>
        </>
    )
}