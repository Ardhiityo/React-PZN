import { useContext, useState } from "react"
import { NotesDispatchContext } from "./NoteContext";

interface NoteItem {
    id?: number,
    name?: string,
    done?: boolean
}

export default function Note({ note }: { note: NoteItem }) {
    const [isEditing, setIsEditing] = useState(false)
    const [noteInput, setNoteInput] = useState('');

    const dispatch = useContext(NotesDispatchContext);

    let component;

    function handleSave() {
        setIsEditing(false);
        dispatch({
            type: 'UPDATE_NOTE',
            ...note,
            name: noteInput
        })
    }

    function handleEdit() {
        setNoteInput(note.name ?? '');
        setIsEditing(true);
    }

    function handleIsDone(e) {
        dispatch({
            type: 'UPDATE_NOTE',
            ...note,
            done: e.target.checked
        })
    }

    function handleDelete() {
        dispatch({
            type: 'DELETE_NOTE',
            id: note.id
        })
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