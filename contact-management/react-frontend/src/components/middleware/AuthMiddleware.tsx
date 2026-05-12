import { Outlet, useNavigate } from 'react-router';
import { useEffectOnce, useLocalStorage } from 'react-use';
import { userCurrent } from '../../lib/api/userApi';

export default function AuthMiddleware() {
    const [token] = useLocalStorage('token', '');

    const navigate = useNavigate();

    async function fetchUser() {
        userCurrent()
        .catch(() => {
            navigate('/login');
        });
    }

    useEffectOnce(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchUser();
        }
    })

    return <Outlet />;
}