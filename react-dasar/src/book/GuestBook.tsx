import { useRef, useState } from "react"

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
                <label htmlFor="name">Name</label>
                <input type="text" ref={nameInput} id="name" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}