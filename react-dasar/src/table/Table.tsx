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
                <Row id={1} text="Satu" />
                <Row id={2} text="Dua" />
                <Row id={3} text="Tiga" />
            </tbody>
        </table>
    )
}