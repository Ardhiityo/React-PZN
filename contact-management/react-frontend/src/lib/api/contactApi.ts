import api from "./api";

type CreateContact = {
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
};

type UpdateContact = CreateContact & {
    id: number
}

type ContactForm = {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
};

type ContactQueryParams = {
    name?: string;
    phone?: string;
    email?: string;
    size?: string;
    page?: string;
};

export const contactCreate = async ({ firstName, lastName, email, phone }: CreateContact) => {
    const form: ContactForm = {
        first_name: firstName,
        ...(lastName && { last_name: lastName }),
        email,
        phone,
    };

    return api.post("/contacts", form);
};

export const contactList = async (params: ContactQueryParams) => {
    const url = new URL("contacts", import.meta.env.VITE_API_URL);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, value.toString());
        }
    });

    return api.get(url.toString());
};

export const contactDelete = async (id: number) => {
    return api.delete(`/contacts/${id}`);
}

export const contactDetail = async (id: number) => {
    return api.get(`/contacts/${id}`)
}

export const contactUpdate = async ({ id, firstName, lastName, email, phone }: UpdateContact) => {
    const form: ContactForm = {
        first_name: firstName,
        ...(lastName && { last_name: lastName }),
        email,
        phone,
    };

    return api.put(`/contacts/${id}`, form);
}