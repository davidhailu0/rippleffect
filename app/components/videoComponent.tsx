
export default function VideoPlayer({ src }: { src: string }) {
    return <video controls className="shadow-custom-shadow md:w-[86%] sx:w-full md:h-[540px] sm:h-[200px] hover:scale-110 transition ease-in-out duration-200 object-contain">
        <source src={src} type="video/mp4" />
    </video>
}