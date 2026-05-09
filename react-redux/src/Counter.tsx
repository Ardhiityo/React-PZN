import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "./feature/counterSlice";

export default function Counter() {
    const counter = useSelector(state => state.counter.value);
    const dispatch = useDispatch();
    
    function handleIncrement() {
        dispatch(increment());
    }
    
    function handleDecrement() {
        dispatch(decrement());
    }
    
    return (
    <>
        <h1>{counter}</h1>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={() => dispatch(increment(2))}>Increment +2</button>
        <button onClick={() => dispatch(decrement(2))}>Decrement -2</button>
    </>
)
}