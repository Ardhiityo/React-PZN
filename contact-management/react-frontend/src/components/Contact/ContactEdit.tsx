import { useState } from "react";
import { Link, useParams } from "react-router";
import { errorAlert, successAlert } from "../../lib/alert/sweetAlert";
import { AxiosError } from "axios";
import ContactForm from "./ContactForm";
import type { Form } from "../../types/contact";
import { contactUpdate } from "../../lib/api/contactApi";

type FormErrors = {
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string
};

export default function ContactEdit() {
    const params = useParams()
    const contactId = Number(params.contactId);

    const [errors, setErrors] = useState<FormErrors>({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });

    function resetErrorForm() {
        setErrors({
            first_name: '',
            last_name: '',
            email: '',
            phone: ''
        })
    }

    async function handleContactUpdate({ firstName, lastName, email, phone }: Form) {
        try {
            const response = await contactUpdate({ id: contactId, firstName, lastName, email, phone });
            if (response.status === 200) {
                successAlert('Updated Contact Successfully!');
                resetErrorForm();
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
                <Link
                    to="/dashboard/contacts"
                    className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
                >
                    <i className="fas fa-arrow-left mr-2" /> Back to Contacts
                </Link>
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <i className="fas fa-user-edit text-blue-400 mr-3" /> Edit Contact
                </h1>
            </div>
            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
                <div className="p-8">
                    <ContactForm onSubmit={handleContactUpdate} errors={errors} isEdit={true} />
                </div>
            </div>
        </>
    )
}