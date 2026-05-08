import { useRef, useState } from "react"
import GuestBookForm from "./GuestBookForm";

export default function GuestBook() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const nameInput = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        setName('');
        setMessage('');
        nameInput.current.focus();
        alert(`Hello ${name}, with message ${message}`);
    }

    return (
        <>
            <h1>Guest Book</h1>
            <form onSubmit={handleSubmit}>
                <GuestBookForm nameInput={nameInput} name={name} setName={setName} />
                <br />
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}