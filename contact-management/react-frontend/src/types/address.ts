export type Form = {
    street?: string,
    city: string,
    province: string,
    country: string
    postalCode?: string
}

export type FormErrors = {
    street?: string,
    city?: string,
    province?: string,
    country?: string
    postalCode?: string
};

export type OnSubmit = (form: Form) => void;