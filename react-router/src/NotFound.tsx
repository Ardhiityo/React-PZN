import { useParams } from "react-router"

export default function NotFound() {
    const path = useParams();
    return (
        <>
            <h1>Not Foound</h1>
            <p>Path : {path['*']}</p>
        </>
    )
}