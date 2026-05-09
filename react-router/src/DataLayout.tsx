import { Outlet, useLocation } from "react-router"
import { NavLink } from "react-router"
import "./data.css";

export default function DataLayout() {
    const location = useLocation();
    return (
        <>
            <div>
                <h1>Header</h1>
                <ul>
                    <li>
                        <NavLink to={{
                            pathname: '/data/products',
                            search: 'category=shoes',
                            hash: '#top'
                        }}>
                            Products
                        </NavLink>
                    </li>
                    <li><NavLink to='/data/sellers'>Sellers</NavLink></li>
                    <li><NavLink to='/data/customers'>Customers</NavLink></li>
                </ul>
            </div>
            <div>
                <Outlet />
            </div>
            <h1>
                Footer
            </h1>
            <p>Path : {location.pathname}, Search : {location.search}, Hash : {location.hash}</p>
        </>
    )
}