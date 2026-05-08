import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { useImmer } from "use-immer";

type TaskItem = {
    id: number,
    name: string,
    done: boolean
}

let id = 0;

const initialNotes: TaskItem[] = [
    {
        id: id++,
        name: 'Belajar HTML',
        done: true
    },
    {
        id: id++,
        name: 'Belajar Javascript',
        done: true
    },
    {
        id: id++,
        name: 'Belajar React',
        done: false
    },
]

export default function NoteApp() {
    const [notes, setNotes] = useImmer(initialNotes);

    function addNote(note: string) {
        setNotes(notes => {
            notes.push({
                id: id++,
                name: note,
                done: false
            });
        });
    }

    function updateNote(id: number, note: TaskItem) {
        setNotes(notes => {
            const index = notes.findIndex(note => note.id === id);
            notes[index] = note;
        });
    }

    function deleteNote(id: number) {
        setNotes(notes => {
            const index = notes.findIndex(note => note.id === id);
            notes.splice(index, 1);
        })
    }

    return (
        <>
            <NoteForm addNote={addNote} />
            <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
        </>
    )
}