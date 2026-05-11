import api from "./api"

type CreateContact = {
    firstName: string,
    lastName?: string,
    email: string,
    phone: string
}

type ContactForm = {
    first_name: string,
    last_name?: string,
    email: string,
    phone: string
}

export const contactCreate = async ({ firstName, lastName, email, phone }: CreateContact) => {
    const form: ContactForm = {
        first_name: firstName,
        ...(lastName && { last_name: lastName }),
        email,
        phone,
    };
    return api.post('/contacts', form)
}