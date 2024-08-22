"use client";

import { Link } from "@/lib/navigation";

import Logo from "@/components/logo";
import { NavLink } from "@/types";

import { cn } from "@/lib/utils";

import { usePathname } from "@/lib/navigation";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "@heroicons/react/24/outline"; // Importez l'icône souhaitée

export default function Sidebar({ navLinks }: { navLinks: NavLink[] }) {
    const pathname = usePathname();

    // Ajoutez un nouvel élément "Ajouter commercial" à la liste navLinks
    const updatedNavLinks = [
        ...navLinks,
        {
            href: '/add-commercial',
            label: 'Ajouter commercial',
            icon: <PlusIcon className="h-4 w-4" />, // Icône d'ajout
        },
    ];

    return (
        <aside className="hidden sticky top-0 start-0 border-r bg-muted/40 md:block h-screen">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo className="lg:text-xl" />
                </div>
                <div className="flex-1">
                    <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
                        {updatedNavLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                className={cn(
                                    "flex [&>svg]:size-4 items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                                    {
                                        "bg-muted text-primary":
                                            link.href === pathname,
                                    }
                                )}
                            >
                                {link.icon}
                                {link.label}

                              
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    );
}
