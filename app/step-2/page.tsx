import Logo from "../components/LogoComponent";
import Content from './Content';

export default function Home() {
    return (
        <>
            <Logo />
            <div className="flex flex-col gap-7 mt-7 items-center w-full md:w-9/12 mx-auto px-4">
                <p className="text-4xl font-bold text-white mb-9">Step 2</p>
                <Content />
            </div>
        </>
    );
}
