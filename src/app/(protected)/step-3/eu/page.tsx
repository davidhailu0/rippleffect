'use client'
import { GetVideoContext } from "@/app/hooks/VideoContext";
import Content from "../_components/content";

export default function Home() {
    const VideoContext = GetVideoContext()
    const step_3_euro_strt = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step3') && tag_list.includes('euro'))

    return (<Content countryFlagImg={'/euwebp'} bestStrategyVideo={step_3_euro_strt} />);
}