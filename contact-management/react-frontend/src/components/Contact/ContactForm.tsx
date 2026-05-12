import { useState, type SubmitEvent } from "react";
import { Link, useParams } from "react-router";
import type { FormErrors, OnSubmit } from "../../types/contact";
import { useEffectOnce } from "react-use";
import { errorAlert } from "../../lib/alert/sweetAlert";
import { contactDetail } from "../../lib/api/contactApi";

export default function ContactForm({ onSubmit, errors, isEdit = false }: { onSubmit: OnSubmit, errors: FormErrors, isEdit?: boolean }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const params = useParams()
    const contactId = Number(params.contactId);

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        onSubmit({ firstName, lastName, email, phone });
    }

    async function fetchContact() {
        try {
            const response = await contactDetail(contactId)
            if (response.status === 200) {
                const { first_name, last_name, email, phone } = response.data.data
                setFirstName(first_name)
                setLastName(last_name ?? '')
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

    useEffectOnce(() => {
        if (isEdit) {
            fetchContact();
        }
    })

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label htmlFor="first_name" className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-user-tag text-gray-500" />
                            </div>
                            <input type="text" id="first_name" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter first name" required />
                        </div>
                        {errors.first_name && <p className="text-red-500 text-sm font-bold">{errors.first_name}</p>}
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-user-tag text-gray-500" />
                            </div>
                            <input type="text" id="last_name" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter last name" />
                        </div>
                        {errors.last_name && <p className="text-red-500 text-sm font-bold">{errors.last_name}</p>}
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-envelope text-gray-500" />
                        </div>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter email address" required />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm font-bold">{errors.email}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-phone text-gray-500" />
                        </div>
                        <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter phone number" required />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm font-bold">{errors.phone}</p>}
                </div>
                <div className="flex justify-end space-x-4">
                    <Link to="/dashboard/contacts" className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
                        <i className="fas fa-times mr-2" /> Cancel
                    </Link>
                    <button type="submit" className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                        <i className="fas fa-plus-circle mr-2" /> Save Contact
                    </button>
                </div>
            </form>
        </>
    )
}