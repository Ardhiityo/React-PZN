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

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

export const userRegister = async ({ username, name, password }: Register): Promise<AxiosResponse> => {
    return api.post('/users', {
        username,
        name,
        password
    });
}

export const userLogin = async ({ username, password }: Login): Promise<AxiosResponse> => {
    return api.post('/users/login', {
        username,
        password
    });
}