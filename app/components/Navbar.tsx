import Link from "next/link"

export default function Navbar() {
    return <div className="flex gap-8 absolute font-bold text-sm text-white right-9 top-28">
        <Link href={'/step-1'}>Step 1</Link>
        <Link href={'/step-2'}>Step 2</Link>
        <Link href={'/step-3'}>Step 3</Link>
        <Link href={'/training'}>Trainings</Link>
        <Link href={'/training'}>Funnels</Link>
        <Link href={'/members'}>Members</Link>
        <Link href={'/members'}>Leaderboard</Link>
        <Link href={'/members'}>Account</Link>
    </div>
}