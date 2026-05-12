import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { contactCreate } from "../../lib/api/contactApi";
import { errorAlert, successAlert } from "../../lib/alert/sweetAlert";
import { AxiosError } from "axios";
import ContactForm from "./ContactForm";
import type { Form, FormErrors } from "../../types/contact";

export default function ContactCreate() {
    const [errors, setErrors] = useState<FormErrors>({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });

    const navigate = useNavigate();

    function resetErrorForm() {
        setErrors({
            first_name: '',
            last_name: '',
            email: '',
            phone: ''
        })
    }

    async function handleContactCreate({ firstName, lastName, email, phone }: Form) {
        try {
            const response = await contactCreate({ firstName, lastName, email, phone });
            if (response.status === 201) {
                successAlert('Created Contact Successfully');
                resetErrorForm();
                navigate('/dashboard/contacts');
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
                <Link to="/dashboard/contacts" className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
                    <i className="fas fa-arrow-left mr-2" /> Back to Contacts
                </Link>
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <i className="fas fa-user-plus text-blue-400 mr-3" /> Create New Contact
                </h1>
            </div>
            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
                <div className="p-8">
                    <ContactForm onSubmit={handleContactCreate} errors={errors} />
                </div>
            </div>
        </>
    )
}