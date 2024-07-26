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
import { deleteAutoEcole } from "@/actions/autoecole";

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
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>الأوامر</DropdownMenuLabel>
        {/* <DropdownMenuItem className="cursor-pointer">
          إرفاق زبون
        </DropdownMenuItem> */}
        <DropdownMenuItem
          className="text-red-500 cursor-pointer"
          onClick={async () => {
            try {
              await deleteAutoEcole(id, locale);
              toast("لقد حذف المدرسة بنجاح");
            } catch (error) {
              toast("ثم إرسال طلبك بنجاح");
            }
          }}
        >
          حذف المدرسة
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
