"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface SubmitButtonProps {
    label: string;
    pending: boolean;
    className?: string;
}

export default function SubmitButton({
    label,
    pending,
    className
}: SubmitButtonProps) {
    return (
        <Button
            disabled={pending}
            className={cn("group flex items-center gap-3", className)}
        >
            <span>{label}</span>
            <LoaderCircle className="size-5 hidden group-disabled:animate-spin group-disabled:block" />
        </Button>
    );
}