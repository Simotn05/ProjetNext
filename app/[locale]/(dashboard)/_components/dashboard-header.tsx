"use client";

import { Link } from "@/lib/navigation";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import AccountDropdown from "./account-dropdown";
import Logo from "@/components/logo";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { NavLink } from "@/types";

import { usePathname } from "@/lib/navigation";

export default function DashboardHeader({ navLinks }: { navLinks: NavLink[] }) {
    const pathname = usePathname();

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 backdrop-blur top-0 sticky z-40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="flex flex-col">
                    <nav className="grid gap-2 font-medium">
                        <Logo className="mb-2" />
                        {navLinks.map((link, i) => (
                            <SheetClose asChild key={i}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "mx-[-0.65rem] duration-200 transition-colors [&>svg]:size-4 flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-primary",
                                        {
                                            "text-primary":
                                                link.href === pathname,
                                        }
                                    )}
                                >
                                    {link.icon}
                                    {link.label}
                                    {!!link.notifications && (
                                        <Badge className="ms-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                            {link.notifications}
                                        </Badge>
                                    )}
                                </Link>
                            </SheetClose>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                {/* <form>
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    />
                </form> */}
            </div>
            <AccountDropdown />
        </header>
    );
}
