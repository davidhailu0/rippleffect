'use client'
import { GetVideoContext } from "@/app/hooks/VideoContext";
import Content from "../_components/content";

export default function Home() {
    const VideoContext = GetVideoContext()
    const step_3_usd = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step3') && tag_list.includes('usd'))

    return (<Content countryFlagImg={'/uswebp'} bestStrategyVideo={step_3_usd} />);
}
