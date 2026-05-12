import { useNavigate } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use"

export default function App() {
    const [token,] = useLocalStorage('token', '');
    const navigate = useNavigate();

    useEffectOnce(() => {
        if (token) {
            navigate('/dashboard/contacts');
        } else {
            navigate('/login');
        }
    })

    return (
        <></>
    )
}