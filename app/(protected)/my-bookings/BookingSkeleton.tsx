import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingSkeleton() {
    return <div className="mt-6 w-full space-y-4">
        {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-4 bg-[#0F2C40]">
                <Skeleton className="h-4 w-1/2 mb-2 bg-gray-300 rounded" />
                <Skeleton className="h-4 w-1/3 bg-gray-300 rounded" />
            </Card>
        ))}
    </div>
}