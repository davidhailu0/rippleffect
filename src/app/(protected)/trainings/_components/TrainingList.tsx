import { Training } from "@/types/Training";
import { TrainingCard } from "./TrainingCard";

export function TrainingList({ trainings }: { trainings: Training[] }) {
    return (
        <div className="grid gap-6">
            {trainings.map((training) => (
                <TrainingCard
                    key={training.id}
                    title={training.title}
                    description={training.description}
                    shareLink={`https://example.com/${training.share_link.slug}`}
                    topics={training.topics}
                />
            ))}
        </div>
    );
}