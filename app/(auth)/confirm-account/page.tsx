"use client";
import CodeInput from "@/app/(protected)/work-with-me-old/_components/CodeInput";
import { confirmLead } from "@/app/services/authService";
import { setIsLogged, setUser } from "@/lib/reduxStore/authSlice";
import { User } from "@/types/Common";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ConfirmAccount = () => {
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const [frontendToken, setFrontendToken] = useState<string>("");

  const dispatch = useDispatch();

  const router = useRouter();

  const { mutate: mutateConfirmAccount, isPending: isPendingConfirmAccount } =
    useMutation({
      mutationFn: confirmLead,
      onSuccess: (data: User) => {
        localStorage.removeItem("frontend_token");
        localStorage.setItem("token", data.login_token);
        dispatch(setIsLogged());
        dispatch(setUser(data));
      },
    });

  const confirmAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      lead: {
        confirmation_token: confirmationCode,
        frontend_token: frontendToken,
      },
    };

    mutateConfirmAccount(data);
  };

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("frontend_token");
      if (token) {
        setFrontendToken(token);
      } else {
        router.replace("/sign-up");
      }
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 text-black z-[999]">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg relative transform transition-transform duration-300 scale-100">
          <CodeInput
            confirmationCode={confirmationCode}
            setConfirmationCode={setConfirmationCode}
            frontendToken={frontendToken}
            handleCodeSubmit={confirmAccount}
            loading={isPendingConfirmAccount}
          />
        </div>
      </div>
    </>
  );
};

export default ConfirmAccount;
