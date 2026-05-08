import { useEffect, useRef, useState } from "react";
import Product from "./Product";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const loaded = useRef(true);

    //fetch akan dipanggil terus apabila ada perubahan state, contohnya setProduct
    useEffect(() => {
        console.log('call');
        if (loaded.current) {
            fetch('/products.json')
                .then(data => data.json())
                .then(data => setProducts(data))
                .then(() => loaded.current = false);
        }

        //Clean Up akan dieksekusi sebelum Effect selanjutnya di eksekusi, atau Component di hilangkan
        return () => {
            console.log('Product list component is unmounted')
        }
    })

    return (
        <>
            {products.map(item => <Product key={item.id} product={item} />)}
        </>
    )
}