"use client";

import { useLocale } from "next-intl";
import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteComplain } from "@/actions/complains";

type Props = {
    id: number;
};

export default function Actions({ id }: Props) {
    const locale = useLocale();

    return (
        <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                <DropdownMenuLabel>الأوامر</DropdownMenuLabel>
                <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={async () => {
                        try {
                            await deleteComplain(id);
                            toast("لقد حذف الشكاية بنجاح بنجاح");
                        } catch (error) {
                            toast("فشلة العملية: حاول مجددا");
                        }
                    }}
                >
                    حذف الشكاية
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
