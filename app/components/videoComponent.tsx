
export default function VideoPlayer({ src }: { src: string }) {
    return <video controls className="shadow-custom-shadow w-[89%] h-[560px] hover:scale-110 transition ease-in-out duration-200 object-contain">
        <source src={src} type="video/mp4" />
    </video>
}