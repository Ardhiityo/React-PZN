import { useState } from "react"

export default function NoteForm({ addNote }) {
    const [note, setNote] = useState('');

    function handleInput(e) {
        setNote(e.target.value);
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        addNote(note)
        setNote('');
    }

    return (
        <>
            <h1>Form</h1>
            <form onSubmit={handleSubmitForm}>
                <input type="text" value={note} onChange={handleInput} />
                <button type="submit">Add</button>
            </form>
        </>
    )
}