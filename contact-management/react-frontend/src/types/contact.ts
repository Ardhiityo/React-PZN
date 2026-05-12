export type FormErrors = {
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string
};

export type Form = {
    firstName: string,
    lastName?: string,
    email: string,
    phone: string
};

export type OnSubmit = (form: Form) => void; 