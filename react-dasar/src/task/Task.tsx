import { useImmer } from 'use-immer';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function Task() {
    const [items, setItems] = useImmer<string[]>([]);
    return (
        <>
            <TaskForm setItems={setItems} />
            <TaskList items={items} />
        </>
    )
}