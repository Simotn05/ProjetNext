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
import { completeTicket, deleteTicket } from "@/actions/tickets";
import { Button } from "@/components/ui/button";

type Props = {
    id: number;
};

export default function TickerActions({ id }: Props) {
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
                    className="cursor-pointer"
                    onClick={async () => {
                        try {
                            await completeTicket(id);
                            toast("لقد تم إتمام الطلب بنجاح");
                        } catch (error) {
                            toast("فشلة العملية: حاول مجددا");
                        }
                    }}
                >
                    إكتمل الطلب
                </DropdownMenuItem>
                {/* <DropdownMenuItem className="cursor-pointer">
                    توجيه الطلب
                </DropdownMenuItem> */}
                <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={async () => {
                        try {
                            await deleteTicket(id);
                            toast("لقد حذف الطلب بنجاح");
                        } catch (error) {
                            toast("فشلة العملية: حاول مجددا");
                        }
                    }}
                >
                    حذف الطلب
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
