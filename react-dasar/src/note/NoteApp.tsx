import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { useImmerReducer } from "use-immer";

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

function noteReducer(draft: NoteItem[], action: Action) {
    if (action.type === 'ADD_NOTE') {
        draft.push({
            id: id++,
            name: action.name,
            done: false
        })
    } else if (action.type === 'UPDATE_NOTE') {
        const index = draft.findIndex(item => item.id === action.id);
        draft[index].name = action.name;
        draft[index].done = action.done;
    } else if (action.type === 'DELETE_NOTE') {
        const index = draft.findIndex(item => item.id === action.id);
        draft.splice(index, 1);
    }
}

export default function NoteApp() {
    const [notes, dispatch] = useImmerReducer(noteReducer, initialNotes);

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