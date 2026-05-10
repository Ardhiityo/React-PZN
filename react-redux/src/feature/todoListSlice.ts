import { createSlice } from "@reduxjs/toolkit";

const todoListSlice = createSlice({
    name: 'todolist',
    initialState: {
        items: [],
        id: 0
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push({
                id: state.id++,
                name: action.payload.name
            })
        },
        updateTodo: (state, action) => {
            const todo = state.items.find(item => item.id === action.payload.id);
            if (todo) {
                todo.name = action.payload.name;
            }
        },
        deleteTodo: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index != -1) {
                state.items.splice(index, 1);
            }
        },
    },
    selectors: {
        getTodo: (state, id) => {
            return state.items.find(item => item.id === id);
        }
    }
});

export const { addTodo, updateTodo, deleteTodo } = todoListSlice.actions;

export const { getTodo } = todoListSlice.selectors;

export default todoListSlice;