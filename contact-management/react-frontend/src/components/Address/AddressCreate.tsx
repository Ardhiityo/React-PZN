import { useState, type SubmitEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { addressCreate } from "../../lib/api/addressApi";
import { AxiosError } from "axios";
import { errorAlert, successAlert } from "../../lib/alert/sweetAlert";

type FormErrors = {
    street?: string,
    city?: string,
    province?: string,
    country?: string
    postalCode?: string
};

export default function AddressCreate() {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const params = useParams();
    const contactId = params.contactId;

    const navigate = useNavigate();

    const [errors, setErrors] = useState<FormErrors>({
        street: '',
        city: '',
        province: '',
        country: '',
        postalCode: ''
    });

    async function handleAddressCreate(e: SubmitEvent) {
        e.preventDefault();
        try {
            const response = await addressCreate({ contactId: Number(contactId), street, city, province, country, postalCode });
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
                    <form onSubmit={handleAddressCreate}>
                        <div className="mb-5">
                            <label htmlFor="street" className="block text-gray-300 text-sm font-medium mb-2">Street</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-road text-gray-500" />
                                </div>
                                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} id="street" name="street" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter street address" />
                            </div>
                            {errors.street && <p className="text-red-500 text-sm font-bold">{errors.street}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label htmlFor="city" className="block text-gray-300 text-sm font-medium mb-2">City</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-city text-gray-500" />
                                    </div>
                                    <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} name="city" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter city" required />
                                </div>
                                {errors.city && <p className="text-red-500 text-sm font-bold">{errors.city}</p>}
                            </div>
                            <div>
                                <label htmlFor="province" className="block text-gray-300 text-sm font-medium mb-2">Province/State</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-map text-gray-500" />
                                    </div>
                                    <input type="text" id="province" value={province} onChange={(e) => setProvince(e.target.value)} name="province" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter province or state" required />
                                </div>
                                {errors.province && <p className="text-red-500 text-sm font-bold">{errors.province}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <div>
                                <label htmlFor="country" className="block text-gray-300 text-sm font-medium mb-2">Country</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-flag text-gray-500" />
                                    </div>
                                    <input type="text" id="country" name="country" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter country" required value={country} onChange={(e) => setCountry(e.target.value)} />
                                </div>
                                {errors.country && <p className="text-red-500 text-sm font-bold">{errors.country}</p>}
                            </div>
                            <div>
                                <label htmlFor="postal_code" className="block text-gray-300 text-sm font-medium mb-2">Postal Code</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-mail-bulk text-gray-500" />
                                    </div>
                                    <input type="text" id="postal_code" name="postal_code" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                                </div>
                                {errors.postalCode && <p className="text-red-500 text-sm font-bold">{errors.postalCode}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Link to={`/dashboard/contacts/${contactId}`} className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
                                <i className="fas fa-times mr-2" /> Cancel
                            </Link>
                            <button type="submit" className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                                <i className="fas fa-plus-circle mr-2" /> Add Address
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}