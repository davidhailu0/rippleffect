'use client'
import { useMemo } from "react";
import { GetVideoContext } from "@/app/hooks/VideoContext";
import Content from "../_components/content";

export default function Home() {
    const VideoContext = useMemo(() => GetVideoContext(), [])
    const step_3_cad_strt = VideoContext?.videos.find(({ tag_list }) => tag_list.includes('step3') && tag_list.includes('cad'))

    return (<Content countryFlagImg={'/canada.png'} bestStrategyVideo={step_3_cad_strt} />);
}
