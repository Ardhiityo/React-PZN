export default function TaskList({ items }: { items: string[] }) {
    return (
        <>
            <h1>Task List</h1>
            <ul>
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </>
    )
}

