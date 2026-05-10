import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getTodo, updateTodo } from "./feature/todoListSlice";
import { Link, useNavigate, useParams } from "react-router";

export default function UpdateTodo() {
    const params = useParams();
    const [todo, setTodo] = useState(useSelector(state => getTodo(state, Number(params.id)).name));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleUpdateTodo() {
        dispatch(updateTodo({ id: Number(params.id), name: todo }));
        navigate({
            pathname: '/todolist'
        });
    }

    return (
        <>
            <h1>Edit Todo</h1>
            <Link to={'/todolist'}>Back</Link>
            <br />
            <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo}/>
            <button onClick={handleUpdateTodo}>Update</button>
        </>
    )
}