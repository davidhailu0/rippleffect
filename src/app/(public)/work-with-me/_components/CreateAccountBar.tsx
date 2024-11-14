import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateAccountBar() {
    return (
        <div className="flex items-center justify-end w-full h-16 bg-white shadow-md z-50 border-b border-gray-200 mb-4 px-24 sticky top-0">
            <Link href={"/sign-up"}>
                <Button className="px-12 h-12 bg-pink-400 text-white hover:bg-pink-600 transitionh-12 rounded-[50px]">
                    Create Account
                </Button>
            </Link>
        </div>
    )
}