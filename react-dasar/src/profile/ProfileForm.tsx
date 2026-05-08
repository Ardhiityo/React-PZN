export default function ProfileForm({name ,setName }) {

    function handleChangeName(e) {
        setName(e.target.value);
    }

    return (
        <>
            <form>
                <input type="text" placeholder="name" value={name} onChange={handleChangeName} />
            </form>
        </>
    )
}