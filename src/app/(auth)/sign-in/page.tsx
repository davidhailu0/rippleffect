"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { requestLogin, verifyLoginTokenRequest } from "@/services/authService";
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
import Loader from "@/components/ui/loader/loader";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setIsLogged, setLead } from "@/lib/reduxStore/authSlice";
import { toast } from "sonner";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [userMessage, setUserMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const signin_token = searchParams.get("login_token");
  const Spinner = icons["LoaderCircle"];
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryFn: () => verifyLoginTokenRequest(signin_token!),
    queryKey: ["verifyLoginTokenRequest", signin_token],
    enabled: !!signin_token, // Only run if signin_token exists
  });

  useEffect(() => {
    if (data && !error) {
      if (data.error) {
        setUserMessage(data.error);
      } else {
        const decodedToken = jwtDecode(data.login_token);
        setCookie("token", data.login_token, { expires: new Date(decodedToken.exp! * 1000) });
        dispatch(setIsLogged());
        dispatch(setLead(data));
        router.replace("/step-1");
      }
    }
  }, [data, error, setCookie, dispatch, router]);

  const { mutate: mutateSignin, isPending: isPendingSignIn } = useMutation({
    mutationFn: requestLogin,
    onSuccess: (data) => {
      if (data.message) {
        setUserMessage("Check Your Email for Login Link. The login link only works for 15 minutes.");
      } else if (data.error) {
        toast.error(data.error);
      }
    },
  });

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateSignin({ email });
  };

  if (isLoading) {
    return <Loader className="h-dvh w-full flex items-center justify-center" />;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {userMessage || "Sign In"}
          </CardTitle>
          {!userMessage && (
            <CardDescription className="text-center">
              Enter your email to Sign In
            </CardDescription>
          )}
        </CardHeader>
        {!userMessage && (
          <CardContent>
            <form onSubmit={handleSignIn}>
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
                  disabled={isPendingSignIn}
                >
                  {isPendingSignIn && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
                  {isPendingSignIn ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
        )}
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
