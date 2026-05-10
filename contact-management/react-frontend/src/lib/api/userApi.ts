import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

type Register = {
    username: string,
    name: string,
    password: string
}

type Login = {
    username: string,
    password: string
}

type UpdateUser = {
    name?: string,
    password?: string
}

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Accept": "application/json"
    }
});

api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = JSON.parse(token);
        }
        return config;
    }
);

export const userRegister = async ({ username, name, password }: Register): Promise<AxiosResponse> => {
    return api.post('/users', { username, name, password });
}

export const userLogin = async ({ username, password }: Login): Promise<AxiosResponse> => {
    return api.post('/users/login', {
        username,
        password
    });
}

export const userCurrent = async () => {
    return api.get('/users/current');
}

export const userUpdateName = async ({ name }: UpdateUser): Promise<AxiosResponse> => {
    return api.patch('/users/current', {
        name
    });
}

export const userUpdatePassword = async ({ password }: UpdateUser): Promise<AxiosResponse> => {
    return api.patch('/users/current', {
        password
    });
}