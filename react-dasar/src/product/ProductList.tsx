import { useEffect, useRef, useState } from "react";
import Product from "./Product";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        //akan dipanggil terus menerus apabila terjadi render
        console.log('Without dependencies')
    })

    useEffect(() => {
        //hanya akan dipanggil sekali, meskipun terjadi render tidak akan dipanggil lagi
        console.log('With dependencies empty []')
    }, [])

    //fetch akan dipanggil terus apabila ada perubahan state, contohnya setProduct
    useEffect(() => {
        console.log('call');
        if (loaded) {
            fetch('/products.json')
                .then(data => data.json())
                .then(data => setProducts(data))
        }

        //Clean Up akan dieksekusi sebelum Effect selanjutnya di eksekusi, atau Component di hilangkan
        return () => {
            console.log('Product list component is unmounted')
        }

        //[loaded] : artinya hanya dipanggil ketika state loaded terjadi perubahan, misal sudah true dipanggil true lgi maka tdk akan dipanggil, kecuali state berubah selain true
    }, [loaded])

    function handleClick() {
        setLoaded(true);
    }

    return (
        <>
            <button onClick={handleClick}>Show Products</button>
            {products.map(item => <Product key={item.id} product={item} />)}
        </>
    )
}