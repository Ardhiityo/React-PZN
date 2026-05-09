import { useContext, useMemo, useRef, useState } from "react"
import Note from "./Note"
import { NotesContext } from "./NoteContext"

export default function NoteList() {
    const notes = useContext(NotesContext);
    const [search, setSearch] = useState('');
    const searchInput = useRef(null);

    const filteredNotes = useMemo(() => {
        console.log('Filtered notes');
        return notes.filter(note => note.name.includes(search));
    }, [notes, search])

    function handleSearch() {
        console.log('Search');
        setSearch(searchInput.current.value);
    }

    return (
        <>
            <h1>List</h1>
            <input type="text" ref={searchInput} placeholder="search" />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {filteredNotes.map(note => <Note key={note.id} note={note}>{note.name}</Note>)}
            </ul>
        </>
    )
}