import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/app'
import Counter from './Counter.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/counter' element={<Counter/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
