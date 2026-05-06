import { Todo } from "./Todo";

export default function Todolist() {
    return (
        <ul>
            <Todo isCompleted={true} text="Belajar React" isDeleted={true} />
            <Todo isCompleted={true} text="Belajar Vue" />
            <Todo isCompleted={false} text="Belajar Laravel" />
        </ul>
    )
}