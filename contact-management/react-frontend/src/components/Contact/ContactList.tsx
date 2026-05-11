import { Link } from "react-router"
import { contactDelete, contactList } from "../../lib/api/contactApi";
import { AxiosError } from "axios";
import { confirmAlert, errorAlert, successAlert } from "../../lib/alert/sweetAlert";
import { useEffectOnce } from "react-use";
import { useState, type SubmitEvent } from "react";

type Contact = {
    id: number;
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
};

type FormErrors = {
    name?: string,
    phone?: string,
    email?: string,
    size?: string
    page?: string
};

export default function ContactList() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [size,] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);

    function handleSetPage(page: number) {
        fetchContacts(page);
    }

    async function handleContactDelete(id: number) {
        try {
            if (await confirmAlert()) {
                const response = await contactDelete(id);
                if (response.status === 200) {
                    successAlert('Deleted Contact Successfully!');
                    fetchContacts(page);
                }
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                return errorAlert(error.response.data.errors);
            } else if (error instanceof Error) {
                return errorAlert(error.message);
            }
            return errorAlert('Unknown error');
        }

    }

    const [errors, setErrors] = useState<FormErrors>({
        name: '',
        phone: '',
        email: '',
        size: '',
        page: ''
    });

    function handleSearchContacts(e: SubmitEvent) {
        e.preventDefault()
        fetchContacts(1);
    }

    async function fetchContacts(page: number | string) {
        try {
            const response = await contactList({ name, phone, email, size: String(size), page: String(page) });
            if (response.status === 200) {
                setContacts(response.data.data);
                setTotalPage(response.data.paging.total_page);
                setPage(response.data.paging.page)
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
        const toggleButton = document.getElementById('toggleSearchForm') as HTMLButtonElement | null;
        const searchFormContent = document.getElementById('searchFormContent') as HTMLDivElement | null;
        const toggleIcon = document.getElementById('toggleSearchIcon') as HTMLElement | null;

        if (!toggleButton || !searchFormContent || !toggleIcon) {
            return;
        }

        // Add transition for smooth animation
        searchFormContent.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out';
        searchFormContent.style.overflow = 'hidden';
        searchFormContent.style.maxHeight = '0px';
        searchFormContent.style.opacity = '0';
        searchFormContent.style.marginTop = '0';

        function toggleSearchForm() {
            if (searchFormContent!.style.maxHeight !== '0px') {
                // Hide the form
                searchFormContent!.style.maxHeight = '0px';
                searchFormContent!.style.opacity = '0';
                searchFormContent!.style.marginTop = '0';
                toggleIcon!.classList.remove('fa-chevron-up');
                toggleIcon!.classList.add('fa-chevron-down');
            } else {
                // Show the form
                searchFormContent!.style.maxHeight = searchFormContent!.scrollHeight + 'px';
                searchFormContent!.style.opacity = '1';
                searchFormContent!.style.marginTop = '1rem';
                toggleIcon!.classList.remove('fa-chevron-down');
                toggleIcon!.classList.add('fa-chevron-up');
            }
        }

        toggleButton.addEventListener('click', toggleSearchForm);

        fetchContacts(page);

        return () => {
            toggleButton.removeEventListener('click', toggleSearchForm);
        }
    })

    const pages = []
    let style;
    for (let i = 1; i <= totalPage; i++) {
        style = page === i ? 'px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md' : 'px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200';
        pages.push(
            <button onClick={() => handleSetPage(i)} key={i} className={style}>
                {i}
            </button>
        )
    }

    return (
        <>
            <div className="flex items-center mb-6">
                <i className="fas fa-users text-blue-400 text-2xl mr-3" />
                <h1 className="text-2xl font-bold text-white">My Contacts</h1>
            </div>
            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <i className="fas fa-search text-blue-400 mr-3" />
                        <h2 className="text-xl font-semibold text-white">Search Contacts</h2>
                    </div>
                    <button type="button" id="toggleSearchForm" className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200">
                        <i className="fas fa-chevron-down text-lg" id="toggleSearchIcon" />
                    </button>
                </div>
                <div id="searchFormContent" className="mt-4">
                    <form onSubmit={handleSearchContacts}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label htmlFor="search_name" className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-user text-gray-500" />
                                    </div>
                                    <input type="text" id="search_name" name="search_name" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Search by name" />
                                </div>
                                {errors.name && <p className="text-red-500 text-sm font-bold">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="search_email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-envelope text-gray-500" />
                                    </div>
                                    <input type="text" id="search_email" name="search_email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Search by email" />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm font-bold">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="search_phone" className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-phone text-gray-500" />
                                    </div>
                                    <input type="text" id="search_phone" value={phone} onChange={(e) => setPhone(e.target.value)} name="search_phone" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Search by phone" />
                                </div>
                                {errors.phone && <p className="text-red-500 text-sm font-bold">{errors.phone}</p>}
                            </div>
                        </div>
                        <div className="mt-5 text-right">
                            <button type="submit" className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                                <i className="fas fa-search mr-2" /> Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
                    <Link to="/dashboard/contacts/create" className="block p-6 h-full">
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                                <i className="fas fa-user-plus text-3xl text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-3">Create New Contact</h2>
                            <p className="text-gray-300">Add a new contact to your list</p>
                        </div>
                    </Link>
                </div>
                {contacts.map(contact =>
                    <div key={contact.id} className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
                        <div className="p-6">
                            <Link to={`/dashboard/contacts/${contact.id}`} className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                                        <i className="fas fa-user text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">{contact.first_name} {contact.last_name}</h2>
                                </div>
                                <div className="space-y-3 text-gray-300 ml-2">
                                    <p className="flex items-center">
                                        <i className="fas fa-user-tag text-gray-500 w-6" />
                                        <span className="font-medium w-24">First Name:</span>
                                        <span>{contact.first_name}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <i className="fas fa-user-tag text-gray-500 w-6" />
                                        <span className="font-medium w-24">Last Name:</span>
                                        <span>{contact.last_name}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <i className="fas fa-envelope text-gray-500 w-6" />
                                        <span className="font-medium w-24">Email:</span>
                                        <span>{contact.email}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <i className="fas fa-phone text-gray-500 w-6" />
                                        <span className="font-medium w-24">Phone:</span>
                                        <span>{contact.phone}</span>
                                    </p>
                                </div>
                            </Link>
                            <div className="mt-4 flex justify-end space-x-3">
                                <Link to={`/dashboard/contacts/${contact.id}/edit`} className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
                                    <i className="fas fa-edit mr-2" /> Edit
                                </Link>
                                <button onClick={() => handleContactDelete(contact.id)} className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
                                    <i className="fas fa-trash-alt mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {contacts.length && (
                <div className="mt-10 flex justify-center">
                    <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
                        {page > 1 && <button onClick={() => handleSetPage(page - 1)} className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center">
                            <i className="fas fa-chevron-left mr-2" /> Previous
                        </button>}
                        {pages}
                        {page < totalPage && <button onClick={() => handleSetPage(page + 1)} className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center">
                            Next <i className="fas fa-chevron-right ml-2" />
                        </button>}
                    </nav>
                </div>
            )}
        </>
    )
}