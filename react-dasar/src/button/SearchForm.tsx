import type { SubmitEventHandler } from "react"

export default function SearchForm({ handleSubmit }:
    { handleSubmit: SubmitEventHandler<HTMLFormElement> }) {
    return (
        <form onSubmit={handleSubmit}>
            <h1 id="content">Hello World</h1>
            <input id="search" type="text" placeholder="search here..." />
            <button type="submit">Submit</button>
        </form>
    )
}