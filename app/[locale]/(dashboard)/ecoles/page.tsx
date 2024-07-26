import { PackageOpen, Plus } from "lucide-react";

import { db } from "@/lib/db";
import { Link } from "@/lib/navigation";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import Actions from "./_components/actions";
import Filters from "./_components/filters";
import { TutorsSexEnum } from "@/schemas/autoecoles";

type Props = {
    searchParams: {
        permis?: string;
        practicalLang?: string;
        theoreticalLang?: string;
        theoreticalTutorSex?: string;
        practicalTutorSex?: string;
        city?: string;
        brand?: string;
        model?: number;

        disabled?: string;
        outOfTownTraining?: string;
        eveningSessions?: string;
        badWeatherTraining?: string;
        mechanicalPrinciplesTraining?: string;
        firstAidPrinciplesTraining?: string;
        trainingOnEmulator?: string;
        theoreticalOnline?: string;
        practicalOnlineBooking?: string;
        practicalPhoneBooking?: string;
        documentPreparation?: string;
        paymentConvenience?: string;
    };
};

export default async function EcolesPage({ searchParams }: Props) {
    const features: string[] = [];
    if (searchParams.disabled?.toLowerCase() === "true")
        features.push("disabled");
    if (searchParams.outOfTownTraining?.toLowerCase() === "true")
        features.push("outOfTownTraining");
    if (searchParams.eveningSessions?.toLowerCase() === "true")
        features.push("eveningSessions");
    if (searchParams.badWeatherTraining?.toLowerCase() === "true")
        features.push("badWeatherTraining");
    if (searchParams.mechanicalPrinciplesTraining?.toLowerCase() === "true")
        features.push("mechanicalPrinciplesTraining");
    if (searchParams.firstAidPrinciplesTraining?.toLowerCase() === "true")
        features.push("firstAidPrinciplesTraining");
    if (searchParams.trainingOnEmulator?.toLowerCase() === "true")
        features.push("trainingOnEmulator");
    if (searchParams.theoreticalOnline?.toLowerCase() === "true")
        features.push("theoreticalOnline");
    if (searchParams.practicalOnlineBooking?.toLowerCase() === "true")
        features.push("practicalOnlineBooking");
    if (searchParams.practicalPhoneBooking?.toLowerCase() === "true")
        features.push("practicalPhoneBooking");
    if (searchParams.documentPreparation?.toLowerCase() === "true")
        features.push("documentPreparation");

    // Get AutoEcoles With the filters comes from Search Params.
    const autoEcoles = await db.autoEcole.findMany({
        where: {
            permis: {
                some: {
                    name: searchParams.permis,
                    practicalLangs: {
                        array_contains: searchParams.practicalLang,
                    },
                    theoreticalLangs: {
                        array_contains: searchParams.theoreticalLang,
                    },
                    theoreticalTutorsSex: {
                        in: searchParams.theoreticalTutorSex
                            ? [
                                  searchParams.theoreticalTutorSex,
                                  TutorsSexEnum.both,
                              ]
                            : undefined,
                    },
                    practicalTutorsSex: {
                        in: searchParams.practicalTutorSex
                            ? [
                                  searchParams.practicalTutorSex,
                                  TutorsSexEnum.both,
                              ]
                            : undefined,
                    },
                    vehicles: {
                        some: {
                            brand: {
                                contains: searchParams.brand,
                            },
                            model: searchParams.model
                                ? +searchParams.model
                                : undefined,
                        },
                    },
                },
            },
            city: {
                contains: searchParams.city,
            },
            paymentConvenienceStatus:
                searchParams.paymentConvenience?.toLowerCase() === "true"
                    ? true
                    : undefined,
            features: {
                array_contains: features,
            },
        },
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <CardTitle>مدارس تعليم السياقة</CardTitle>
                        <CardDescription>
                            سير جميع مدارس تعليم السياقة التي قمت بإضافتها
                            للنظام.
                        </CardDescription>
                    </div>
                    <Button
                        className="size-10 md:w-auto p-2 md:px-4 shrink-0"
                        asChild
                    >
                        <Link href="/ecoles/add">
                            <span className="hidden md:block">
                                إضافة مدرسة جديدة
                            </span>
                            <Plus className="block md:hidden size-4" />
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Filters />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>الإسم المؤسسة</TableHead>
                            <TableHead>
                                <span className="md:hidden">الأرقام</span>
                                <span className="hidden md:table-cell">
                                    رقم الهاتف
                                </span>
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                رقم الفيكس
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                المدينة
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                العنوان الكامل
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">الأفعال</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {autoEcoles.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex flex-col gap-1.5 text-muted-foreground items-center justify-center text-center">
                                        <PackageOpen
                                            className="size-5"
                                            strokeWidth={1.5}
                                        />
                                        <p className="font-medium text-sm">
                                            لا توجد اي مدرسة لعرضها
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}

                        {autoEcoles.map((ecole) => (
                            <TableRow key={ecole.id}>
                                <TableCell className="font-medium">
                                    <span>{ecole.name}</span>
                                </TableCell>
                                <TableCell dir="ltr" className="text-right">
                                    <a
                                        className="hidden md:inline-block"
                                        href={`tel:${ecole.phone}`}
                                    >
                                        {ecole.phone}
                                    </a>
                                    <div className="md:hidden">
                                        <a
                                            className="block mb-0.5"
                                            href={`tel:${ecole.phone}`}
                                        >
                                            {ecole.phone}
                                        </a>
                                        <a
                                            className="block"
                                            href={`tel:${ecole.fix}`}
                                        >
                                            {ecole.fix}
                                        </a>
                                    </div>
                                </TableCell>
                                <TableCell
                                    dir="ltr"
                                    className="text-right hidden md:table-cell"
                                >
                                    <a href={`tel:${ecole.fix}`}>{ecole.fix}</a>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {ecole.city}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {ecole.address}
                                </TableCell>
                                <TableCell>
                                    <Actions id={ecole.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            {/* <CardFooter className="flex gap-4 items-center">
        <p className="text-sm text-muted-foreground">
          عرض <span className="font-bold">1-10</span> من{" "}
          <span className="font-bold">32</span> طلب مساعدة
        </p>
      </CardFooter> */}
        </Card>
    );
}
