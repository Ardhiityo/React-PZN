import Note from "./Note"

export default function NoteList({ notes, updateNote, deleteNote }) {
    return (
        <>
            <h1>List</h1>
            <ul>
                {notes.map(note =>
                    <Note key={note.id} updateNote={updateNote} deleteNote={deleteNote} note={note}>
                        {note.name}
                    </Note>)}
            </ul>
        </>
    )
}