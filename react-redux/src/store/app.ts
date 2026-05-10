import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../feature/counterSlice'
import todoListSlice from '../feature/todoListSlice'

export default configureStore({
  reducer: {
    counter: counterSlice.reducer,
    todolist: todoListSlice.reducer
  },
})