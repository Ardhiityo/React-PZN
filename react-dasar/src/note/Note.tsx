import { useState } from "react"

export default function Note({ note, updateNote, deleteNote }) {
    const [isEditing, setIsEditing] = useState(false)
    const [noteInput, setNoteInput] = useState('');

    let component;

    function handleSave() {
        setIsEditing(false);
        updateNote(note.id, {
            ...note,
            name: noteInput
        })
    }

    function handleEdit() {
        setNoteInput(note.name);
        setIsEditing(true);
    }

    function handleIsDone(e) {
        updateNote(note.id, {
            ...note,
            done: e.target.checked
        })
    }

    function handleDelete() {
        deleteNote(note.id);
    }

    function handleChangeInput(e) {
        setNoteInput(e.target.value);
    }

    if (isEditing) {
        component = (
            <>
                <input type="text" name="note" value={noteInput} onChange={handleChangeInput} />
                <button onClick={handleSave}>save</button>
                <button onClick={handleDelete}>delete</button>
            </>
        )
    } else {
        component = (
            <>
                {note.name}
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>delete</button>
            </>
        )
    }

    return (
        <li>
            <input type="checkbox" name="done" checked={note.done} onChange={handleIsDone} />
            {component}
        </li>
    )
}