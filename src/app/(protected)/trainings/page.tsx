"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrainingsHandler } from "@/services/trainingService";
import { Training } from "@/types/Training";
import { TrainingCard } from "./_components/TrainingCard";
import { Loader } from "./_components/Loader";

export default function Trainings() {
  const { data, isLoading } = useQuery<Training[]>({
    queryKey: ["trainings"],
    queryFn: getTrainingsHandler,
  });

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader size="xl" />
          </div>
        ) : (
          <>
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Available Trainings
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore our comprehensive training programs designed to help you
                master new skills and advance your career.
              </p>
            </div>
            <div className="grid gap-6">
              {data?.map((training) => (
                <TrainingCard
                  key={training.id}
                  title={training.title}
                  description={training.description}
                  shareLink={`/training/?slug=${training.share_link.slug}`}
                  topics={training.topics}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
