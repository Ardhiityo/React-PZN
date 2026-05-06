export default function AlertButton({ text, message }: { text: string, message: string }) {
    function handleClick() {
        alert(message);
    }
    return (
        <>
            {/* Cara 1 */}
            <button onClick={handleClick}>{text}</button>

            {/* Cara 2 */}
            <button onClick={() => alert(message)}>{text}</button>
        </>
    )
}