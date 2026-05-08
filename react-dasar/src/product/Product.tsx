export default function Product({ product }) {
    return (
        <>
            <h1>{product.id} {product.name}</h1>
            <h3>Price {product.price}</h3>
        </>
    )
}