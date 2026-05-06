import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AlertButton from "./AlertButton";
import MyButton from "./MyButton";
import Toolbar from "./Toolbar";
import type { MouseEvent } from "react";
import SearchForm from "./SearchForm";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AlertButton text="Click me" message="You have been clicked me" />
        <MyButton handleSmash={() => alert('Smash!')} text={'Smash me'} />
        <Toolbar
            handleClick={(event: MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                alert('You has been clicked me')
            }}
        />
        <SearchForm handleSubmit={
            (event) => {
                event.preventDefault();
                alert('Searched!');
            }} />
    </StrictMode>
)