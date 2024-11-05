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
        setName(Cookies.get('name') + ' ' + Cookies.get('lname'))
        setEmail(Cookies.get('email') || '')
        setPhone(Cookies.get('phone') || '')
    }, [])

    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
            {/* Side Navigation */}
            <aside className="w-full md:w-1/4 bg-white p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                    <Image src="/profile-setting.png" alt="Profile" width={50} height={50} className="rounded-full" unoptimized />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-4">
                    <NavItem
                        icon={<UserCircleIcon className="h-6 w-6" />}
                        label="Profile"
                        isActive={activeTab === 'profile'}
                        onClick={() => setActiveTab('profile')}
                    />
                    {/* <NavItem
                        icon={<CogIcon className="h-6 w-6" />}
                        label="Settings"
                        isActive={activeTab === 'settings'}
                        onClick={() => setActiveTab('settings')}
                    />
                    <NavItem
                        icon={<KeyIcon className="h-6 w-6" />}
                        label="Security"
                        isActive={activeTab === 'security'}
                        onClick={() => setActiveTab('security')}
                    /> */}
                    <NavItem
                        icon={<PencilIcon className="h-6 w-6" />}
                        label="Edit Profile"
                        isActive={activeTab === 'edit'}
                        onClick={() => setActiveTab('edit')}
                    />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
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
        className={`flex items-center gap-2 p-3 rounded-lg text-left transition ${isActive ? 'bg-[#3b82f6] text-white' : 'bg-transparent text-gray-600 hover:bg-gray-200'
            }`}
    >
        {icon}
        <span className="text-lg">{label}</span>
    </button>
);

/* Profile Tab */
const Profile = ({ name, email, phone }: { name: string, email: string, phone: string }) => (
    <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-800">Profile Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Full Name" value={name} />
            <Card title="Email" value={email} />
            <Card title="Phone" value={phone} />
        </div>
    </section>
);


/* Edit Profile Tab */
const EditProfile = ({ name, email, phone }: { name: string, email: string, phone: string }) => (
    <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-800">Edit Profile</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" defaultValue={name.split(' ')[0]} disabled />
            <InputField label="Last Name" defaultValue={name.split(' ')[1]} disabled />
            <InputField label="Email" defaultValue={email} />
            <InputField label="Phone" defaultValue={phone} />
            <button className="col-span-1 md:col-span-2 bg-pink-400 text-white py-3 rounded-lg hover:bg-pink-600 transition">
                Save Changes
            </button>
        </form>
    </section>
);

/* Card Component for Profile Overview */
const Card = ({ title, value }: { title: string, value: string }) => (
    <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
);

/* Input Field Component */
const InputField = ({ label, defaultValue, disabled }: { label: string, defaultValue: string, disabled?: boolean }) => (
    <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{label}</label>
        <input
            disabled={Boolean(disabled)}
            type="text"
            defaultValue={defaultValue}
            className="p-3 rounded-lg text-black bg-white border border-gray-300 focus:border-pink-600 focus:outline-none"
        />
    </div>
);

export default AccountPage;
