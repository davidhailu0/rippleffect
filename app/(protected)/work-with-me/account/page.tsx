'use client'
import { useEffect, useState } from 'react';
import { UserCircleIcon, CogIcon, KeyIcon, PencilIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import Image from 'next/image';

const AccountPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('profile');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        setName(Cookies.get('name') ? `${Cookies.get('name')} ${Cookies.get('lname')}` : 'User Name');
        setEmail(Cookies.get('email') || 'User Email');
        setPhone(Cookies.get('phone') || 'User Phone');
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-[#1E213A] text-gray-200 p-4 md:p-8 md:mx-28">
            {/* Side Navigation */}
            <aside className="w-full md:w-1/4 bg-[#2A2D47] p-6 shadow-lg rounded-lg mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-6">
                    <Image src="/profile-setting.png" alt="Profile" width={50} height={50} className="rounded-full" unoptimized />
                    <div>
                        <h2 className="text-lg font-semibold text-white">{name}</h2>
                        <p className="text-sm text-gray-400">{email}</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-3">
                    <NavItem
                        icon={<UserCircleIcon className="h-5 w-5" />}
                        label="Profile"
                        isActive={activeTab === 'profile'}
                        onClick={() => setActiveTab('profile')}
                    />
                    {/* Additional nav items */}
                    <NavItem
                        icon={<PencilIcon className="h-5 w-5" />}
                        label="Edit Profile"
                        isActive={activeTab === 'edit'}
                        onClick={() => setActiveTab('edit')}
                    />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8 bg-[#252945] rounded-lg shadow-lg overflow-y-auto">
                {activeTab === 'profile' && <Profile name={name} email={email} phone={phone} />}
                {activeTab === 'edit' && <EditProfile name={name} email={email} phone={phone} />}
            </main>
        </div>
    );
};

/* Navigation Item Component */
const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 p-3 rounded-lg transition ${isActive ? 'bg-pink-400 text-white' : 'bg-transparent text-white hover:bg-pink-600'
            }`}
    >
        {icon}
        <span className="text-base">{label}</span>
    </button>
);

/* Profile Tab */
const Profile = ({ name, email, phone }: { name: string, email: string, phone: string }) => (
    <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-100">Profile Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Full Name" value={name} />
            <Card title="Email" value={email} />
            <Card title="Phone" value={phone} />
        </div>
    </section>
);

/* Edit Profile Tab */
const EditProfile = ({ name, email, phone }: { name: string, email: string, phone: string }) => (
    <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-100">Edit Profile</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" defaultValue={name.split(' ')[0]} disabled />
            <InputField label="Last Name" defaultValue={name.split(' ')[1]} disabled />
            <InputField label="Email" defaultValue={email} />
            <InputField label="Phone" defaultValue={phone} />
            <button className="col-span-1 md:col-span-2 bg-pink-400 text-white py-2 rounded-lg hover:bg-pink-600 transition">
                Save Changes
            </button>
        </form>
    </section>
);

/* Card Component for Profile Overview */
const Card = ({ title, value }: { title: string, value: string }) => (
    <div className="p-4 bg-[#2A2D47] rounded-lg shadow-md">
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-lg font-semibold text-gray-200">{value}</p>
    </div>
);

/* Input Field Component */
const InputField = ({ label, defaultValue, disabled }: { label: string, defaultValue: string, disabled?: boolean }) => (
    <div className="flex flex-col">
        <label className="text-sm text-gray-400 mb-1">{label}</label>
        <input
            disabled={Boolean(disabled)}
            type="text"
            defaultValue={defaultValue}
            className="p-3 rounded-lg text-gray-200 bg-[#1E213A] border border-gray-600 focus:border-[#F97316] focus:outline-none"
        />
    </div>
);

export default AccountPage;
