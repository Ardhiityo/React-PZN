import { useState, type SubmitEvent } from "react"
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router";
import { errorAlert, successAlert } from "../../lib/alert/sweetAlert";
import { userRegister } from "../../lib/api/userApi";

type FormErrors = {
    username?: string;
    name?: string;
    password?: string;
};

export default function UserRegister() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState<FormErrors>({
        username: '',
        name: '',
        password: ''
    });

    const navigate = useNavigate();

    async function handleRegister(e: SubmitEvent) {
        e.preventDefault();

        if (password != passwordConfirmation) {
            return errorAlert("Password doesn't match");
        }

        try {
            const response = await userRegister({ username, name, password });
            if (response.status === 201) {
                successAlert('Register Successfully!');
                navigate('/login');
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 400) {
                const formattedErrors: FormErrors = {};
                error.response.data.errors.forEach(
                    (item: Partial<FormErrors>) => {
                        Object.assign(formattedErrors, item);
                    }
                );
                setErrors(formattedErrors);
            } else if (error instanceof Error) {
                return errorAlert(error.message);
            }
            return errorAlert('Unknown error');
        }
    }

    return (
        <>
            <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient rounded-full mb-4">
                    <i className="fas fa-user-plus text-3xl text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Contact Management</h1>
                <p className="text-gray-300 mt-2">Create a new account</p>
            </div>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">Username</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-user text-gray-500" />
                        </div>
                        <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Choose a username" required />
                        {errors.username && <p className="text-red-500 text-sm font-bold">{errors.username}</p>}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-id-card text-gray-500" />
                        </div>
                        <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter your full name" required />
                        {errors.name && <p className="text-red-500 text-sm font-bold">{errors.name}</p>}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-lock text-gray-500" />
                        </div>
                        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Create a password" required />
                        {errors.password && <p className="text-red-500 text-sm font-bold">{errors.password}</p>}
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="confirm_password" className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-check-double text-gray-500" />
                        </div>
                        <input type="password" id="confirm_password" name="confirm_password" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Confirm your password" required />
                    </div>
                </div>
                <div className="mb-6">
                    <button type="submit" className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                        <i className="fas fa-user-plus mr-2" /> Register
                    </button>
                </div>
                <div className="text-center text-sm text-gray-400">
                    Already have an account?
                    <Link to='/login' className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Sign in</Link>
                </div>
            </form>
        </>
    )
}