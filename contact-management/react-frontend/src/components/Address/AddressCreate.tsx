import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { addressCreate } from "../../lib/api/addressApi";
import { AxiosError } from "axios";
import { errorAlert, successAlert } from "../../lib/alert/sweetAlert";
import AddressForm from "./AddressForm";
import type { Form, FormErrors } from "../../types/address";

export default function AddressCreate() {
    const params = useParams();
    const contactId = Number(params.contactId);

    const navigate = useNavigate();

    const [errors, setErrors] = useState<FormErrors>({
        street: '',
        city: '',
        province: '',
        country: '',
        postalCode: ''
    });

    async function handleAddressCreate({ street, city, province, country, postalCode }: Form) {
        try {
            const response = await addressCreate({ contactId, street, city, province, country, postalCode });
            if (response.status === 201) {
                successAlert('Created Address Successfully');
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

    return (
        <>
            <div className="flex items-center mb-6">
                <Link to={`/dashboard/contacts/${contactId}`} className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
                    <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
                </Link>
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <i className="fas fa-plus-circle text-blue-400 mr-3" /> Add New Address
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
                                <h2 className="text-xl font-semibold text-white">John Doe</h2>
                                <p className="text-gray-300 text-sm">john.doe@example.com • +1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                    <AddressForm onSubmit={handleAddressCreate} errors={errors} />
                </div>
            </div>
        </>
    )
}