import Navbar from "@/app/components/Navbar";
import Logo from "../../components/LogoComponent";
import Content from './Content';

export default function Home() {
    return (
        <>
            <Logo />
            <Navbar />
            <div className="flex flex-col gap-7 mt-7 items-center w-full px-4 md:w-[73%] md:px-0 mx-auto">
                <p className="text-4xl font-bold text-white mb-4 md:mb-9">Step 1</p>
                <Content />
            </div>
        </>
    );
}
