"use client";

import { usePathname, useRouter } from "@/lib/navigation";
import { useLocale } from "next-intl";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Globe } from "lucide-react";
import { Button } from "./button";

export default function LocaleSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const langs = [
        {
            label: "العربية",
            value: "ar",
        },
        {
            label: "French",
            value: "fr",
        },
        {
            label: "English",
            value: "en",
        },
        {
            label: "Spanish",
            value: "es",
        },
    ];

    function handleSwitch(locale: string) {
        router.push(pathname, { locale });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                    <Globe className="size-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={locale === "ar" ? "start" : "end"}>
                <DropdownMenuRadioGroup
                    value={locale}
                    onValueChange={handleSwitch}
                >
                    {langs.map((lang) => (
                        <DropdownMenuRadioItem
                            key={lang.value}
                            value={lang.value}
                        >
                            {lang.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
