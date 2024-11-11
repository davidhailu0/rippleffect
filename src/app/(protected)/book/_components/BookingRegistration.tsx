"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { differenceInDays } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import PhoneInput from "react-phone-input-2";
import Cookies from "js-cookie";
import { bookSession } from "@/services/bookingServices";
import { updateRegistration } from "@/services/authService";
import "react-phone-input-2/lib/style.css";

type BookingRegistrationProps = {
  callback: () => void;
};

const BookingRegistration: React.FC<BookingRegistrationProps> = ({
  callback,
}) => {
  const [firstName, setFirstName] = useState<string>(Cookies.get("name") || "");
  const [lastName, setLastName] = useState<string>(Cookies.get("lname") || "");
  const [email, setEmail] = useState<string>(Cookies.get("email") || "");
  const [phone, setPhone] = useState<string>(Cookies.get("phone") || "");
  const router = useRouter();

  const bookSessionMutation = useMutation<any, Error>({
    mutationFn: async () => {
      const reservedTime = sessionStorage.getItem("reservedTime");
      if (reservedTime) {
        await bookSession(JSON.parse(reservedTime));
      }
    },
    onError: (error) => {
      console.error("Failed to book session:", error);
    },
  });

  const updateRegistrationMutation = useMutation({
    mutationFn: async () => {
      const id = Cookies.get("id");
      return await updateRegistration(id, {
        lead: {
          email,
          first_name: firstName,
          last_name: lastName,
          phone,
          terms_accepted: true,
        },
      });
    },

    onSuccess: (response) => {
      if (response.message === "Lead has been updated.") {
        const expires = 365 * 10;
        Cookies.set("name", firstName, { path: "/", expires });
        Cookies.set("lname", lastName, { path: "/", expires });
        Cookies.set("phone", phone, { path: "/", expires });

        const bookedTime = Cookies.get("bookedTime");
        if (bookedTime) {
          Cookies.set("booked", "true", {
            path: "/",
            expires: differenceInDays(new Date(bookedTime), new Date()) + 1,
          });
        }

        router.replace("/questionnaire");
      }
    },
    onError: (error) => {
      console.error("Failed to update registration:", error);
    },
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    bookSessionMutation.mutate();
    updateRegistrationMutation.mutate();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl overflow-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        User Information
      </h2>
      <form id="user-form" onSubmit={handleFormSubmit} className="space-y-4">
        <InputField
          id="first-name"
          label="First Name"
          value={firstName}
          onChange={setFirstName}
        />
        <InputField
          id="last-name"
          label="Last Name"
          value={lastName}
          onChange={setLastName}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <PhoneNumberInput
          label="Phone Number"
          id="phone"
          value={phone}
          onChange={setPhone}
        />
        <TermsAndConditions />
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={callback}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-600 transition-colors ease-in-out duration-75 focus:outline-none"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </div>
  );
};

// Separate input field component
const InputField: React.FC<{
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ id, label, type = "text", placeholder = "", value, onChange }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
      required
    />
  </div>
);

const PhoneNumberInput = ({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="text-black">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <PhoneInput
      country={"us"}
      value={value}
      onChange={(phone) => onChange(phone)}
      inputProps={{ id, name: id, required: true }}
      containerStyle={{ width: "100%" }}
      inputStyle={{ width: "100%", height: "2.5rem" }}
      enableSearch
    />
  </div>
);

const TermsAndConditions: React.FC = () => (
  <div className="flex items-start mt-4">
    <input
      type="checkbox"
      id="terms"
      name="terms"
      className="h-4 w-4 text-pink-600 focus:ring-pink-400 border-gray-300 rounded mt-0.5"
      required
    />
    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
      I agree to the{" "}
      <span className="text-pink-600 underline">terms and conditions</span>{" "}
      provided by the company. By providing my phone number, I agree to receive
      text messages from the business.
    </label>
  </div>
);

export default BookingRegistration;
