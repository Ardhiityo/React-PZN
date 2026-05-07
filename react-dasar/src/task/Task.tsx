import { useState } from 'react';
import { useImmer } from 'use-immer';

export default function Task() {

    const [item, setItem] = useState('');
    const [items, setItems] = useImmer([]);

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
            <h1>Task List</h1>
            <ul>
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </>
    )
}