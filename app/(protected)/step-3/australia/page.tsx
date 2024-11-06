'use client'
import { GetVideoContext } from "@/app/hooks/VideoContext";
import Content from "../_components/content";

export default function Home() {
    const VideoContext = GetVideoContext()
    const step_3_aus_strt = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step3') && tag_list.includes('aud'))

    return (<Content countryFlagImg={'/australia.png'} bestStrategyVideo={step_3_aus_strt} />);
}
