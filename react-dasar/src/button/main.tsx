import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AlertButton from "./AlertButton";
import MyButton from "./MyButton";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AlertButton text="Click me" message="You have been clicked me" />
        <MyButton handleSmash={() => alert('Smash!')} text={'Smash me'} />
    </StrictMode>
)