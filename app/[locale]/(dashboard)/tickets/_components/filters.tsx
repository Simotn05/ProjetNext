"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function TicketsFilter() {
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="mb-4">
                    <div className="flex items-center gap-1.5">
                        <span>الطلبات {searchParams.get("completed") === "true" ? "المكتملة" : "الغير مكتملة"}</span>
                        <ChevronDown size={16} />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuCheckboxItem
                    checked={searchParams.get("completed")?.toString() !== "true"}
                    onCheckedChange={(_) => {
                        router.push(pathname);
                    }}
                >
                    الغير مكتملة
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={searchParams.get("completed")?.toString() === "true"}
                    onCheckedChange={(_) => {
                        params.set("completed", "true");
                        router.push(`${pathname}?${params.toString()}`);
                    }}
                >
                    المكتملة
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
