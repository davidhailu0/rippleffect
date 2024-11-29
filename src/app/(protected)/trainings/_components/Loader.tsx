"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

interface LoaderProps
    extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const loaderVariants = cva("animate-spin text-muted-foreground", {
    variants: {
        size: {
            default: "w-4 h-4",
            sm: "w-3 h-3",
            lg: "w-6 h-6",
            xl: "w-8 h-8",
        },
        variant: {
            default: "text-white",
            secondary: "text-secondary-foreground",
            muted: "text-muted-foreground",
        },
    },
    defaultVariants: {
        size: "default",
        variant: "default",
    },
});

export interface LoaderComponentProps
    extends LoaderProps,
    VariantProps<typeof loaderVariants> { }

export function Loader({
    className,
    size,
    variant,
    ...props
}: LoaderComponentProps) {
    return (
        <div
            role="status"
            className={cn("flex items-center justify-center", className)}
            {...props}
        >
            <Loader2 className={cn(loaderVariants({ size, variant }))} />
            <span className="sr-only">Loading...</span>
        </div>
    );
}