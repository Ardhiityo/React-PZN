import { Todo } from "./Todo";

type TodoItem = {
    text: string;
    isCompleted: boolean;
}

export default function Todolist() {

    const data: TodoItem[] = [
        {
            text: 'Belajar HTML',
            isCompleted: true
        },
        {
            text: 'Belajar Typescript',
            isCompleted: true
        },
        {
            text: 'Belajar React',
            isCompleted: false
        }
    ]

    const todos = data.map((item) => <Todo {...item} />)

    return (
        //Tanpa loop 
        // <ul>
        //     <Todo isCompleted={true} text="Belajar React" isDeleted={true} />
        //     <Todo isCompleted={true} text="Belajar Vue" />
        //     <Todo isCompleted={false} text="Belajar Laravel" />
        // </ul>

        //Dengan collection component
        <ul>
            { todos }
        </ul>
    )
}