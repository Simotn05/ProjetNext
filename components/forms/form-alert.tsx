import { cn } from "@/lib/utils";

interface FormAlertProps {
    message?: string;
    variant: "success" | "error";
}

export default function FormAlert({ message, variant }: FormAlertProps) {
    return (
        message && (
            <div
                className={cn(
                    "px-4 py-2.5 rounded-md ring-2 -ring-offset-2 text-sm",
                    {
                        "text-emerald-500 bg-emerald-500/15 ring-emerald-500/25":
                            variant === "success",
                        "text-red-500 bg-red-500/15 ring-red-500/25":
                            variant === "error",
                    }
                )}
            >
                <p>{message}</p>
            </div>
        )
    );
}
