export default function GuestBookForm({nameInput, name, setName}) {
    return (
        <>
            <label htmlFor="name">Name</label>
            <input type="text" ref={nameInput} id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </>
    )
}