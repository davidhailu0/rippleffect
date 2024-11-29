"use client";
import { setIsLoggedOut, setLead } from "@/lib/reduxStore/authSlice";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import { updateRegistration } from "@/services/authService";
import { PencilIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const lead = useAppSelector((state) => state.auth.lead);
  const first_name = lead?.first_name || "";
  const last_name = lead?.last_name || "";
  const email = lead?.email_address || "";
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    dispatch(setIsLoggedOut());
    queryClient.clear();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1E213A] text-gray-200 p-4 md:p-8 md:mx-28">
      {/* Side Navigation */}
      <aside className="w-full md:w-1/4 bg-[#2A2D47] p-6 shadow-lg rounded-lg mb-4 md:mb-0">
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/profile-setting.webp"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
            unoptimized
          />
          <div>
            <h2 className="text-lg font-semibold text-white">
              {first_name + " " + last_name}
            </h2>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
        </div>
        <nav className="flex flex-col gap-3">
          <NavItem
            icon={<UserCircleIcon className="h-5 w-5" />}
            label="Profile"
            isActive={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          {/* Additional nav items */}
          <NavItem
            icon={<PencilIcon className="h-5 w-5" />}
            label="Edit Profile"
            isActive={activeTab === "edit"}
            onClick={() => setActiveTab("edit")}
          />
          <NavItem
            icon={<LogOut className="h-5 w-5" />}
            label="Logout"
            isActive={activeTab === "logout"}
            onClick={handleLogout}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-[#252945] rounded-lg shadow-lg overflow-y-auto">
        {activeTab === "profile" && <Profile />}
        {activeTab === "edit" && <EditProfile />}
      </main>
    </div>
  );
};

/* Navigation Item Component */
const NavItem = ({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 p-3 rounded-lg transition ${
      isActive
        ? "bg-pink-400 text-white"
        : "bg-transparent text-white hover:bg-pink-600"
    }`}
  >
    {icon}
    <span className="text-base">{label}</span>
  </button>
);

/* Profile Tab */
const Profile = () => {
  const lead = useAppSelector((state) => state.auth.lead);
  const first_name = lead?.first_name || "";
  const last_name = lead?.last_name || "";
  const email = lead?.email_address || "";
  const phone = lead?.phone || "";
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-100">Profile Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Full Name" value={first_name + " " + last_name} />
        <Card title="Email" value={email || " "} />
        <Card title="Phone" value={phone || " "} />
      </div>
    </section>
  );
};

/* Edit Profile Tab */
const EditProfile = () => {
  const lead = useAppSelector((state) => state.auth.lead);
  const dispatch = useDispatch();
  const first_name = lead?.first_name;
  const last_name = lead?.last_name;
  const email = lead?.email_address;
  const phone = lead?.phone;
  const updateRegistrationMutation = useMutation({
    mutationKey: ["update-account"],
    mutationFn: updateRegistration,
    onSuccess: (response) => {
      dispatch(setLead(response));
      toast.success("Your profile has been updated successfully!");
    },
    onError: (error) => {
      console.error("Failed to update registration:", error);
    },
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      lead: {
        email: formData.get("email")
          ? formData.get("email")?.toString()
          : lead?.email_address || "",
        first_name: formData.get("first_name")
          ? formData.get("first_name")?.toString()
          : lead?.first_name || "",
        last_name: formData.get("last_name")
          ? formData.get("last_name")?.toString()
          : lead?.last_name || "",
        phone: formData.get("phone")
          ? formData.get("phone")?.toString()
          : lead?.phone || "",
        terms_accepted: true,
      },
    };
    updateRegistrationMutation.mutate({ id: lead!.id, leadData: data });
  };
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-100">Edit Profile</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleFormSubmit}
      >
        <InputField
          label="First Name"
          defaultValue={first_name || ""}
          name="first_name"
          disabled={Boolean(first_name)}
        />
        <InputField
          label="Last Name"
          name="last_name"
          defaultValue={last_name || " "}
          disabled={Boolean(last_name)}
        />
        <InputField label="Email" defaultValue={email || ""} name="email" />
        <InputField label="Phone" defaultValue={phone || ""} name="phone" />
        <button className="col-span-1 md:col-span-2 bg-pink-400 text-white py-2 rounded-lg hover:bg-pink-600 transition">
          Save Changes
        </button>
      </form>
    </section>
  );
};

/* Card Component for Profile Overview */
const Card = ({ title, value }: { title: string; value: string }) => (
  <div className="p-4 bg-[#2A2D47] rounded-lg shadow-md">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-lg font-semibold text-gray-200">{value}</p>
  </div>
);

/* Input Field Component */
const InputField = ({
  label,
  defaultValue,
  name,
  disabled,
}: {
  label: string;
  defaultValue: string;
  name: string;
  disabled?: boolean;
}) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-400 mb-1">{label}</label>
    <input
      disabled={Boolean(disabled)}
      type="text"
      name={name}
      defaultValue={defaultValue}
      required
      className="p-3 rounded-lg text-gray-200 bg-[#1E213A] border border-gray-600 focus:border-[#F97316] focus:outline-none"
    />
  </div>
);

export default AccountPage;
