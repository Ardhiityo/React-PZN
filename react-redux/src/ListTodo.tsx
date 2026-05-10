import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router";
import { deleteTodo } from "./feature/todoListSlice";

export default function ListTodo() {
    const todolist = useSelector(state => state.todolist.items);
    const dispatch = useDispatch();
    function handleDeleteTodo(id: number) {
        dispatch(deleteTodo({ id: id }));
    }
    return (
        <>
            <h1>Todolist</h1>
            <Link to={'/todolist/add'}>Add</Link>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Todo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todolist.map(todo =>
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.name}</td>
                            <td>
                                <NavLink to={`/todolist/${todo.id}/edit`}>
                                    <button>Edit</button>
                                </NavLink>
                                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}