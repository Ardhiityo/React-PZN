import { createRoot } from "react-dom/client";
import Table from "./Table";
import { StrictMode } from "react";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Table />
    </StrictMode>
)