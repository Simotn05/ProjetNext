import { Building2, Mails, Ticket, UserRoundCheck, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

export default async function DashboardPage() {
    const newTickets = await db.ticket.count({
        where: {
            status: {
                equals: "pending",
            },
        },
    });
    const completedTickets = await db.ticket.count({
        where: {
            status: {
                equals: "completed",
            },
        },
    });
    const autoEcolesCount = await db.autoEcole.count();
    const complainsCount = await db.message.count();

    return (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 xl:gap-8 xl:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        عدد الطلبات
                    </CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{newTickets}</div>
                    <p className="text-xs text-muted-foreground">
                        عدد الطلبات التي لم يتم أتمامها
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        العمليات الناجحة
                    </CardTitle>
                    <UserRoundCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{completedTickets}</div>
                    <p className="text-xs text-muted-foreground">
                        عدد الطلبات التي تم إتمامها
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        عدد الشكايات
                    </CardTitle>
                    <Mails className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{complainsCount}</div>
                    <p className="text-xs text-muted-foreground">
                        عدد الشكايات الحالية
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        عدد المدارس
                    </CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{autoEcolesCount}</div>
                    <p className="text-xs text-muted-foreground">
                        عدد المدارس المتوفرة في المنصة
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
