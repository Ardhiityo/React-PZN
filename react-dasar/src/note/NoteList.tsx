import { useContext } from "react"
import Note from "./Note"
import { NotesContext } from "./NoteContext"

export default function NoteList() {
    const notes = useContext(NotesContext);
    return (
        <>
            <h1>List</h1>
            <ul>
                {notes.map(note => <Note key={note.id} note={note}>{note.name}</Note>)}
            </ul>
        </>
    )
}