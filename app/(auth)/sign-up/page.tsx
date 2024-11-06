"use client";
import EmailInput from "@/app/(protected)/work-with-me-old/_components/EmailInput";
import { createLead } from "@/app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref_code = searchParams.get("ref_code");

  const { mutate: mutateCreateAccount, isPending: isPendingCreateAccount } =
    useMutation({
      mutationFn: createLead,
      onSuccess: (data: { frontend_token: string }) => {
        localStorage.setItem("frontend_token", data.frontend_token);
        router.push("/confirm-account");
      },
    });

  const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const leadData = ref_code ? { email, referral_code: ref_code } : { email };
    const data = { lead: leadData };
    mutateCreateAccount(data);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 text-black z-[999]">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg relative transform transition-transform duration-300 scale-100">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            One more step...
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Please enter your email to continue
          </p>
          <EmailInput
            email={email}
            setEmail={setEmail}
            handleSubmit={createAccount}
            loading={isPendingCreateAccount}
            ctaText={"Create"} // Pass buttonCtaText here
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
