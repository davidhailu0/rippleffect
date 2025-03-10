"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { confirmLead } from "@/services/authService";
import { setIsLogged, setLead } from "@/lib/reduxStore/authSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import CodeInput from "@/components/ui/CodeInput";
import { Lead } from "@/types/Lead";
import { axiosInstance } from "@/config/axiosConfig";

export default function ConfirmAccount() {
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [frontendToken, setFrontendToken] = useState<string>("");
  const email = useRef("")
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate: mutateConfirmAccount, isPending: isPendingConfirmAccount } =
    useMutation<Lead, Error, any>({
      mutationFn: confirmLead,
      onSuccess: (data: Lead) => {
        localStorage.setItem("token", data.login_token);
        axiosInstance.defaults.headers.common["Authorization"] =
          data.login_token;
        sessionStorage.removeItem("frontend_token");
        dispatch(setIsLogged());
        dispatch(setLead(data));
      },
    });

  const confirmAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = confirmationCode;
    if (code.length === 6) {
      const data = {
        lead: {
          confirmation_token: code,
          frontend_token: frontendToken,
        },
      };
      mutateConfirmAccount(data);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("frontend_token");
    const emailStr = sessionStorage.getItem("email");
    if (email) {
      email.current = emailStr!
    }
    if (token) {
      setFrontendToken(token);
    } else {
      router.replace("/sign-up");
    }
  }, [router]);

  return (
    <div className="fixed inset-0 bg-gray-800 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Confirm Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Please enter the 6-digit confirmation code sent to {email.current}
          </CardDescription>
          <CardTitle className="text-2xl font-bold text-center">
            {frontendToken}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={confirmAccount}>
            <div className="grid gap-6">
              <div className="flex justify-between">
                {
                  <CodeInput
                    confirmationCode={confirmationCode}
                    setConfirmationCode={setConfirmationCode}
                    loading={isPendingConfirmAccount}
                  />
                }
              </div>
              <Button
                type="submit"
                className="bg-pink-400 hover:bg-pink-600 text-white"
                disabled={
                  isPendingConfirmAccount || confirmationCode.length !== 6
                }
              >
                {isPendingConfirmAccount && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isPendingConfirmAccount ? "Confirming..." : "Confirm Account"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => router.push("/sign-up")}>
            Didn't receive a code? Sign up again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
