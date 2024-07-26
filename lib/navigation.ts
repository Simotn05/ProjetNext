import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "fr", "en", "es"];

export const { Link, usePathname, useRouter, redirect } =
    createSharedPathnamesNavigation({ locales });
