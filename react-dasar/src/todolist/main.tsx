import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Container from "../hello-world/Container";
import Todolist from "./Todolist";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Container >
            <Todolist />
        </Container>
    </StrictMode >
)
