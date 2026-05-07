import { useState } from 'react';

export default function ContactForm() {
    const [contact, setContact] = useState({
        name: '',
        message: ''
    })

    function handleNameChange(e): void {
        setContact({
            ...contact,
            name: e.target.value
        })
    }

    function handleMessageChange(e): void {
        setContact({
            ...contact,
            message: e.target.value
        })
    }

    return (
        <>
            <h1>Contact Form</h1>
            <form>
                <input type="text" value={contact.name} name="name" onChange={handleNameChange} placeholder='name' />
                <br />
                <input type="text" value={contact.message} name="message" onChange={handleMessageChange} placeholder='message' />
            </form>
            <h1>Detail Contact</h1>
            <p>Name : {contact.name}</p>
            <p>Message : {contact.message}</p>
        </>
    )
}