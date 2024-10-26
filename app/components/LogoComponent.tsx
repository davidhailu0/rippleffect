import Link from "next/link";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
    return <Link href={'/'} className={className ? className : "mb-6"}><Image src='/logo.png' alt='logo' height={95} width={90} className="mx-auto" unoptimized /></Link>
}