import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingSkeleton() {
    return <div className="mt-6 w-[95%] md:w-[83%] mx-auto space-y-4">
        {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-4 bg-pink-400">
                <Skeleton className="h-4 w-1/2 mb-2 bg-gray-300 rounded" />
                <Skeleton className="h-4 w-1/3 bg-gray-300 rounded" />
            </Card>
        ))}
    </div>
}