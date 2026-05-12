import api from "./api";

type CreateAddress = {
    contactId: number,
    street?: string,
    city: string,
    country: string,
    province: string,
    postalCode?: string
}

type UpdateAddress = CreateAddress & {
    addressId: number
}

export const addressList = async function name(contactId: number) {
    return api.get(`/contacts/${contactId}/addresses`);
}

export const addressDelete = async function name(contactId: number, addressId: number) {
    return api.delete(`/contacts/${contactId}/addresses/${addressId}`);
}

export const addressCreate = async function name({ contactId, street, city, province, country, postalCode }: CreateAddress) {
    return api.post(`/contacts/${contactId}/addresses`, {
        ...(street && { street }), //jika street bernilai truthy, maka akan disertakan
        city,
        province,
        country,
        ...(postalCode && { postal_code: postalCode })
    });
}

export const addressUpdate = async function name({ contactId, addressId, street, city, province, country, postalCode }: UpdateAddress) {
    return api.put(`/contacts/${contactId}/addresses/${addressId}`, {
        ...(street && { street }),
        city,
        province,
        country,
        ...(postalCode && { postal_code: postalCode })
    });
}

export const addressDetail = async function name(contactId: number, addressId: number) {
    return api.get(`/contacts/${contactId}/addresses/${addressId}`)
}