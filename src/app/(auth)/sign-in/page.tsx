"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createLead } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { icons } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref_code = searchParams.get("ref_code");
  const Spinner = icons["LoaderCircle"];

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
    <div className="fixed inset-0 bg-gray-800 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email to create an account or sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={createAccount}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:ring-pink-400"
                />
              </div>
              <Button
                type="submit"
                className="bg-pink-400 hover:bg-pink-600 text-white"
                disabled={isPendingCreateAccount}
              >
                {isPendingCreateAccount && (
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isPendingCreateAccount ? "Creating..." : "Create Account"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
