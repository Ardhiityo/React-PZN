let count: number = 0

export default function Row({ text }: { text: string }) {
    count++;
    return (
        <tr>
            <td>{count}</td>
            <td>{text}</td>
        </tr>
    )
}