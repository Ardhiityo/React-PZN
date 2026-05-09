import { useSelector } from "react-redux"

export default function Counter() {
    const counter = useSelector(state => state.counter.value);
    
    return (
    <>
        <h1>{counter}</h1>
    </>
)
}