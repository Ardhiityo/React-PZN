import type { SubmitEventHandler } from "react"

export default function SearchForm({ handleSubmit }:
    { handleSubmit: SubmitEventHandler<HTMLFormElement> }) {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="search here..." />
            <button type="submit">Submit</button>
        </form>
    )
}