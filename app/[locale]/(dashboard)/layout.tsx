import { Car, Home, Mails, TicketSlash } from "lucide-react";

import DashboardHeader from "./_components/dashboard-header";
import Sidebar from "./_components/sidebar";
import { NavLink } from "@/types";
import { db } from "@/lib/db";
import { User } from "react-feather";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const navLinks: NavLink[] = [
        {
            icon: <Home />,
            label: "لوحة التحكم",
            href: "/dashboard",
        },
        {
            icon: <TicketSlash />,
            label: "الطلبات",
            href: "/tickets",
            notifications: await db.ticket.count({
                where: {
                    status: "pending",
                },
            }),
        },
        {
            icon: <Mails />,
            label: "الشكايات",
            href: "/complains",
            notifications: await db.message.count(),
        },
        {
            icon: <Car />,
            label: "المدارس",
            href: "/ecoles",
        },
        {
            icon: <User />,
            label: "Gestion des étudiants",
            href: "/gestion-etudiants",
        },
    ];

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar navLinks={navLinks} />
            <div className="flex flex-col">
                <DashboardHeader navLinks={navLinks} />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 xl:p-8 xl:gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
