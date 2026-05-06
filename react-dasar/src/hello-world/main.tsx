import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Container from './Container.tsx'
import HelloWorld from './HelloWorld.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Container >
    <HelloWorld />
  </Container>
  </StrictMode >
)
