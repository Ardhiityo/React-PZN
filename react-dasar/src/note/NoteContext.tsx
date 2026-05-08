import { createContext } from "react";
import type { ImmerReducer } from "use-immer";

interface NoteItem {
    id?: number,
    name?: string,
    done?: boolean
}

export const NotesContext = createContext<NoteItem[]>(null);
export const NotesDispatchContext = createContext<ImmerReducer<NoteItem[]>>(null);