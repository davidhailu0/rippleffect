"use client";
import { useAppSelector } from "@/lib/reduxStore/hooks";
import Content from "../_components/content";

export default function Home() {
  const videos = useAppSelector((state) => state.user.videos);

  const step_3_aud = videos?.find(
    ({ tag_list }) => tag_list.includes("step3") && tag_list.includes("aud")
  );

  return (
    <Content
      countryFlagImg={"/australia.webp"}
      bestStrategyVideo={step_3_aud}
    />
  );
}
