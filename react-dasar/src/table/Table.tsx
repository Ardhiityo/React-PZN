import Row from "./Row"

export default function Table() {
    return (
        <table border={1}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Text</th>
                </tr>
            </thead>
            <tbody>
                <Row text="Satu" />
                <Row text="Dua" />
                <Row text="Tiga" />
            </tbody>
        </table>
    )
}