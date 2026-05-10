import { useState } from "react"
import { useDispatch } from "react-redux";
import { addTodo } from "./feature/todoListSlice";
import { Link, useNavigate } from "react-router";

export default function AddTodo() {
    const [todo, setTodo] = useState('');
    const dispatch = useDispatch();
    const navigate= useNavigate();
    
    function handleAddTodo() {
        dispatch(addTodo({name: todo}));
        navigate({
            pathname: '/todolist'
        });
    }
    
    return (
        <>
        <h1>Add Todo</h1>
        <Link to={'/todolist'}>Back</Link>
        <br />
        <input type="text" onChange={(e) => setTodo(e.target.value)}/>
        <button onClick={handleAddTodo}>Add</button>
        </>
    )
}