import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router"

export default function ProductSearch() {
    const [searchParam] = useSearchParams();
    const [search, setSearch] = useState(searchParam.get('search') || '');
    const navigate = useNavigate();
    
    function handleSearch() {
        if(search) {   
            navigate({
                pathname: '/data/products/search',
                search: `search=${search}`
            })
        }
    }
    
    return (
        <>
        <h1>Product Search</h1>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
        <p>Kamu mencari : {searchParam.get('search')}</p>
        </>
    )
}