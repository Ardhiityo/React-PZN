import { useState } from 'react';

export default function TaskForm({ setItems }) {
    const [item, setItem] = useState('');

    function handleTaskInput(e) {
        setItem(e.target.value)
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        setItems(items => {
            items.push(item);
        })
        setItem('');
    }

    return (
        <>
            <h1>Task Form</h1>
            <form onSubmit={handleSubmitForm}>
                <input type="text" placeholder="task" value={item} onChange={handleTaskInput} />
                <button type="submit">Add</button>
            </form>
        </>
    )
}