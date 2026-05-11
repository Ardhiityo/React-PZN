import api from "./api";

export const addressList = async function name(idContacts: number) {
    return api.get(`/contacts/${idContacts}/addresses`);
}