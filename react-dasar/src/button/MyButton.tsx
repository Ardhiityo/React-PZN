export default function MyButton({ handleSmash, text }:
    { handleSmash: () => void, text: string }) {
    return (
        <>
            <button onClick={handleSmash}>{text}</button>
        </>
    )
}