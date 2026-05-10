import { useState, type SubmitEvent } from "react"
import { Link, useNavigate } from "react-router";
import { userLogin } from "../../lib/api/userApi";
import { useLocalStorage } from "react-use";
import { errorAlert } from "../../lib/alert/sweetAlert";
import { AxiosError } from "axios";

export default function UserLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setToken] = useLocalStorage('token', '');

    const navigate = useNavigate();

    async function handleLogin(e: SubmitEvent) {
        e.preventDefault();
        try {
            const response = await userLogin({ username, password });
            if (response.status === 200) {
                setToken(response.data.data.token);
                navigate('/dashboard/contacts');
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 401) {
                return errorAlert(error.response.data.errors);
            } else if (error instanceof Error) {
                return errorAlert(error.message);
            }
        }
    }

    return (
        <>
            <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient rounded-full mb-4">
                    <i className="fas fa-address-book text-3xl text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Contact Management</h1>
                <p className="text-gray-300 mt-2">Sign in to your account</p>
            </div>
            <form onSubmit={handleLogin}>
                <div className="mb-5">
                    <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">Username</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-user text-gray-500" />
                        </div>
                        <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter your username" required />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-lock text-gray-500" />
                        </div>
                        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter your password" required />
                    </div>
                </div>
                <div className="mb-6">
                    <button type="submit" className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                        <i className="fas fa-sign-in-alt mr-2" /> Sign In
                    </button>
                </div>
                <div className="text-center text-sm text-gray-400">
                    Don't have an account?
                    <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Sign up</Link>
                </div>
            </form>
        </>
    )
}