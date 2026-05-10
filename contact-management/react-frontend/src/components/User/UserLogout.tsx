import { useEffect } from "react"
import { useLocalStorage } from "react-use";
import { userLogout } from "../../lib/api/userApi";
import { useNavigate } from "react-router";
import { errorAlert } from "../../lib/alert/sweetAlert";

export default function UserLogout() {
    const [, setToken] = useLocalStorage('token', '');
    const navigate = useNavigate();

    useEffect(() => {
        async function handleLogout() {
            try {
                const response = await userLogout();
                if (response.status === 200) {
                    setToken('');
                    return navigate('/login');
                }
            } catch (error) {
                if (error instanceof Error) {
                    return errorAlert(error.message);
                }
                return errorAlert('Unknown error');
            }
        }
        handleLogout();
    }, [navigate, setToken]);

    return (<></>)
}