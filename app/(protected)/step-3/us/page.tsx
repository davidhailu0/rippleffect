'use client'
import { useMemo } from "react";
import { GetVideoContext } from "@/app/hooks/VideoContext";
import Content from "../_components/content";

export default function Home() {
    const VideoContext = useMemo(() => GetVideoContext(), [])
    const step_3_usd = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step3') && tag_list.includes('usd'))

    return (<Content countryFlagImg={'/us.png'} bestStrategyVideo={step_3_usd} />);
}
