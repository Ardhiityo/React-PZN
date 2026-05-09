import { useParams } from "react-router"

export default function Image() {
    const products = useParams();
    return (
        <>
            <h1>Image</h1>
            <p>Path : {products['*']}</p>
        </>
    )
}