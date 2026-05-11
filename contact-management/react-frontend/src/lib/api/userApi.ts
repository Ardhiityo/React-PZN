import api from "./api"
import type { AxiosResponse } from "axios";

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

export const userLogout = async (): Promise<AxiosResponse> => {
    return api.delete('/users/logout');
}
