import { useReducer } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

interface NoteItem {
    id?: number,
    name?: string,
    done?: boolean
}

type ActionType = "ADD_NOTE" | "UPDATE_NOTE" | "DELETE_NOTE";

interface Action extends NoteItem {
    type: ActionType
}

let id = 0;

const initialNotes: NoteItem[] = [
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

function noteReducer(notes: NoteItem[], action: Action) {
    switch (action.type) {
        case "ADD_NOTE":
            return [
                ...notes, {
                    id: id++,
                    name: action.name,
                    done: false
                }
            ];
        case "UPDATE_NOTE":
            return notes.map(note => note.id === action.id ?
                { ...note, name: action.name, done: action.done } : note
            );
        case "DELETE_NOTE":
            return notes.filter(note => note.id !== action.id);
    }
}

export default function NoteApp() {
    const [notes, dispatch] = useReducer(noteReducer, initialNotes);

    function addNote(note: string) {
        dispatch({
            type: 'ADD_NOTE',
            name: note
        })
    }

    function updateNote(note: NoteItem) {
        dispatch({
            type: 'UPDATE_NOTE',
            ...note
        })
    }

    function deleteNote(id: number) {
        dispatch({
            type: 'DELETE_NOTE',
            id: id
        })
    }

    return (
        <>
            <NoteForm addNote={addNote} />
            <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
        </>
    )
}