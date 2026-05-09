import { useParams } from "react-router"

export default function ProductDetail() {
    const product = useParams();
    return (
        <>
            <h1>Product Detail {product.id}</h1>
            <p>Welcome to product detail!</p>
        </>
    )
}