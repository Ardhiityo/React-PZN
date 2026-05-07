import { useImmer } from 'use-immer';

export default function ContactForm() {
    const [contact, setContact] = useImmer({
        name: '',
        message: ''
    })

    function handleNameChange(e): void {
        setContact(draf => {
            draf.name = e.target.value
        })
    }

    function handleMessageChange(e): void {
        setContact(draf => {
            draf.message = e.target.value
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