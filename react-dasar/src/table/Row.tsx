export default function Row({ id, text }: { id: number, text: string }) {
    return (
        <tr>
            <td>{id}</td>
            <td>{text}</td>
        </tr>
    )
}