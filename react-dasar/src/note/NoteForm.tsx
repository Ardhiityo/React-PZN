import { useContext, useState } from "react"
import { NotesDispatchContext } from "./NoteContext";

export default function NoteForm() {
    const [note, setNote] = useState('');

    const dispatch = useContext(NotesDispatchContext);

    function handleInput(e) {
        setNote(e.target.value);
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        dispatch({
            type: 'ADD_NOTE',
            name: note
        })
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