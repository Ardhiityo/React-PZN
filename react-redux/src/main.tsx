import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/app'
import Counter from './Counter.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import ListTodo from './ListTodo.tsx'
import UpdateTodo from './UpdateTodo.tsx'
import AddTodo from './AddTodo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/counter' element={
            <>
              <Counter />
              <Counter />
            </>
          } />
          <Route path='/todolist' element={<ListTodo />} />
          <Route path='/todolist/add' element={<AddTodo />} />
          <Route path='/todolist/:id/edit' element={<UpdateTodo />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
