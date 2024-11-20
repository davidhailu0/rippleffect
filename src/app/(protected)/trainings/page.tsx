"use client";
import { useQuery } from "@tanstack/react-query";
import TrainingCard from "./_component/TrainingCard";
import { getTrainingsHandler } from "@/services/trainingService";
import Loader from "@/components/ui/loader/loader";
import { Training } from "@/types/Training";

const quickStartItems = [
  {
    title: "How To Use This System",
    description:
      "Learn the essentials of our platform with this introductory guide, detailing step-by-step how to efficiently use this system to start your journey.",
  },
  {
    title: "How To Use Your Personal Link",
    description:
      "Discover how to effectively use your personal link and free sales funnel to attract and engage followers while boosting your online presence.",
  },
  {
    title: "How To Manage Your Leads",
    description:
      "This video provides a straightforward approach to handling your leads, showing you how to use, track and organize them efficiently for better follow-up and engagement.",
  },
];

const organicTrading = [
  {
    title: "How to Grow your Instagram From 0 to 10,000 Followers",
    description:
      "Follow this step-by-step guide to grow your Instagram account organically, starting from scratch. Learn practical tips to increase your reach and follower engagement.",
  },
  {
    title: "The Ultimate Instagram Reels Blueprint",
    description:
      "Explore effective strategies and tips for creating impactful Instagram Reels that capture attention and enhance your social media presence.",
  },
  {
    title: "TikTok Tips for Newbies",
    description:
      "Get started on TikTok with essential tips that help beginners grow their audience and create engaging content on this dynamic platform.",
  },
];

const paidTrainingItems = [
  {
    title: "The BEST Facebook Ads Training for Beginners",
    description:
      "This video offers a clear, step-by-step guide on how to use & set-up Facebook Ads. Learn effective strategies to increase your followers and engagement.",
  },
  {
    title: "The Easy Way to Create Facebook Ads That Convert",
    description:
      "This tutorial breaks down the process of creating effective Facebook ads. Learn how to design ads that capture attention and drive conversions with ease.",
  },
  {
    title: "The New Way to Get Instagram Followers with Ads",
    description:
      "Discover the latest strategies for using Instagram ads to gain followers quickly and efficiently. This video guides you through the latest techniques that really work.",
  },
];

export default function Trainings() {
  const { data, isLoading } = useQuery<Training[]>({
    queryKey: ["trainings"],
    queryFn: getTrainingsHandler,
  });

  return (
    <>
      {}
      <div className="flex flex-col gap-7 mt-7 items-center w-full px-4 md:w-[73%] md:px-0 mx-auto">
        {isLoading && <Loader className="mt-10" />}
        {data && (
          <>
            <p className="text-4xl font-bold text-white mb-4 md:mb-9">
              Training
            </p>
            <div className="flex flex-col md:flex-row gap-x-7">
              {data &&
                data?.map((training) => (
                  <TrainingCard
                    key={training.id}
                    title={training.title}
                    items={quickStartItems}
                    href={`/training/?id=${training.id}`}
                    imageUrl="/marketing.webp" // Replace with the correct path for the image
                    buttonText="Quick start"
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
