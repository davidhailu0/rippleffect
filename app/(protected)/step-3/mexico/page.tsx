'use client'
import { GetVideoContext } from "@/app/hooks/VideoContext";
import Content from "../_components/content";

export default function Home() {
    const VideoContext = GetVideoContext()
    const step_3_mxn_strt = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step3') && tag_list.includes('mxn'))

    return (<Content countryFlagImg={'/mexicowebp'} bestStrategyVideo={step_3_mxn_strt} />);
}
