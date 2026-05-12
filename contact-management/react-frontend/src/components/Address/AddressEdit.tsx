import { useState } from "react";
import { Link, useParams } from "react-router";
import { useEffectOnce } from "react-use";
import { contactDetail } from "../../lib/api/contactApi";
import { errorAlert, successAlert } from "../../lib/alert/sweetAlert";
import { addressUpdate } from "../../lib/api/addressApi";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import AddressForm from "./AddressForm";
import type { Form, FormErrors } from "../../types/address";

export default function AddressEdit() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const params = useParams();
    const contactId = Number(params.contactId);
    const addressId = Number(params.addressId);

    const navigate = useNavigate();

    const [errors, setErrors] = useState<FormErrors>({
        street: '',
        city: '',
        province: '',
        country: '',
        postalCode: ''
    });

    async function fetchContact() {
        try {
            const response = await contactDetail(contactId)
            if (response.status === 200) {
                const { first_name, last_name, email, phone } = response.data.data
                setFirstName(first_name)
                setLastName(last_name)
                setEmail(email)
                setPhone(phone)
            }
        } catch (error) {
            if (error instanceof Error) {
                return errorAlert(error.message);
            } else {
                return errorAlert('Unknown error');
            }
        }
    }

    async function handleAddressUpdate({ street, city, province, country, postalCode }: Form) {
        try {
            const response = await addressUpdate({ contactId, addressId, street, city, province, country, postalCode });
            if (response.status === 200) {
                successAlert('Updated Address Successfully');
                navigate(`/dashboard/contacts/${contactId}`);
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 400) {
                const formattedErrors: FormErrors = {};
                error.response.data.errors.forEach(
                    (item: Partial<FormErrors>) => {
                        Object.assign(formattedErrors, item);
                    }
                );
                setErrors(formattedErrors);
            } else if (error instanceof Error) {
                return errorAlert(error.message);
            } else {
                return errorAlert('Unknown error');
            }
        }
    }

    useEffectOnce(() => {
        fetchContact();
    })

    return (
        <>
            <div className="flex items-center mb-6">
                <Link to={`/dashboard/contacts/${contactId}`} className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
                    <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
                </Link>
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <i className="fas fa-map-marker-alt text-blue-400 mr-3" /> Edit Address
                </h1>
            </div>
            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
                <div className="p-8">
                    <div className="mb-6 pb-6 border-b border-gray-700">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                                <i className="fas fa-user text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">{firstName} {lastName}</h2>
                                <p className="text-gray-300 text-sm">{email} • {phone}</p>
                            </div>
                        </div>
                    </div>
                    <AddressForm onSubmit={handleAddressUpdate} isEdit={true} errors={errors} />
                </div>
            </div>
        </>
    )
}