import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './components/AuthLayout'
import UserRegister from './components/User/UserRegister'
import UserLogin from './components/User/UserLogin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/register' element={<UserRegister />} />
          <Route path='/login' element={<UserLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
