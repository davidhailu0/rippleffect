'use client'

import { useState } from 'react';
import { UserCircleIcon, CogIcon, KeyIcon, PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const AccountPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('profile');

    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
            {/* Side Navigation */}
            <aside className="w-full md:w-1/4 bg-white p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                    <Image src="/profile-setting.png" alt="Profile" width={50} height={50} className="rounded-full" unoptimized />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Nate Wells</h2>
                        <p className="text-sm text-gray-500">nate@nate.com</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-4">
                    <NavItem
                        icon={<UserCircleIcon className="h-6 w-6" />}
                        label="Profile"
                        isActive={activeTab === 'profile'}
                        onClick={() => setActiveTab('profile')}
                    />
                    <NavItem
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
                    />
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
                {activeTab === 'profile' && <Profile />}
                {activeTab === 'settings' && <Settings />}
                {activeTab === 'security' && <Security />}
                {activeTab === 'edit' && <EditProfile />}
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
const Profile = () => (
    <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-800">Profile Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Full Name" value="Nate Wells" />
            <Card title="Email" value="nate@nate.com" />
            <Card title="Username" value="Nate" />
            <Card title="Website" value="https://netlify.app" />
        </div>
    </section>
);

/* Settings Tab */
const Settings = () => (
    <section>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h1>
        <p className="text-gray-600">This section is for account preferences and customization.</p>
    </section>
);

/* Security Tab */
const Security = () => (
    <section>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Security</h1>
        <p className="text-gray-600">Manage your password, two-factor authentication, and other security features here.</p>
    </section>
);

/* Edit Profile Tab */
const EditProfile = () => (
    <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-gray-800">Edit Profile</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" defaultValue="Nate" />
            <InputField label="Last Name" defaultValue="Wells" />
            <InputField label="Email" defaultValue="nate@nate.com" />
            <InputField label="Website" defaultValue="https://netlify.app" />
            <textarea
                className="col-span-1 md:col-span-2 p-3 h-28 rounded-lg bg-white border border-gray-300 focus:border-[#3b82f6] focus:outline-none"
                placeholder="Enter a short bio"
            />
            <button className="col-span-1 md:col-span-2 bg-[#3b82f6] text-white py-3 rounded-lg hover:bg-[#2563eb] transition">
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
const InputField = ({ label, defaultValue }: { label: string, defaultValue: string }) => (
    <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{label}</label>
        <input
            type="text"
            defaultValue={defaultValue}
            className="p-3 rounded-lg bg-white border border-gray-300 focus:border-[#3b82f6] focus:outline-none"
        />
    </div>
);

export default AccountPage;
