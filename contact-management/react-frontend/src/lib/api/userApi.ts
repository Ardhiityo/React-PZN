import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

type Register = {
    username: string,
    name: string,
    password: string
}

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const userRegister = async ({ username, name, password }: Register): Promise<AxiosResponse> => {
    return api.post('/users', {
        username,
        name,
        password
    });
}