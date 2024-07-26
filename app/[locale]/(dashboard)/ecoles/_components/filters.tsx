"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, InferType, boolean } from "yup";

import { ChevronDownIcon, Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { LangsEnum, PermisEnum, TutorsSexEnum } from "@/schemas/autoecoles";

import { setQueryParams } from "@/lib/search";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";

const FormSchema = object({
    permis: string().oneOf([...Object.values(PermisEnum), "all"]),
    practicalLang: string().oneOf([...Object.values(LangsEnum), "all"]),
    theoreticalLang: string().oneOf([...Object.values(LangsEnum), "all"]),
    theoreticalTutorSex: string().oneOf([
        ...Object.values(TutorsSexEnum),
        TutorsSexEnum.both,
    ]),
    practicalTutorSex: string().oneOf([
        ...Object.values(TutorsSexEnum),
        TutorsSexEnum.both,
    ]),
    city: string(),
    brand: string(),
    model: string(),
    features: object({
        disabled: boolean(),
        outOfTownTraining: boolean(),
        eveningSessions: boolean(),
        badWeatherTraining: boolean(),
        mechanicalPrinciplesTraining: boolean(),
        firstAidPrinciplesTraining: boolean(),
        trainingOnEmulator: boolean(),
        theoreticalOnline: boolean(),
        practicalOnlineBooking: boolean(),
        practicalPhoneBooking: boolean(),
        documentPreparation: boolean(),
        paymentConvenience: boolean(),
    }),
});

type FormType = InferType<typeof FormSchema>;

export default function Filters() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => {
        setIsOpen(false);
    });

    const form = useForm<FormType>({
        mode: "onChange",
        resolver: yupResolver(FormSchema),
        defaultValues: {
            permis: searchParams.get("permis")?.toString() || "all",
            practicalLang:
                searchParams.get("practicalLang")?.toString() || "all",
            theoreticalLang:
                searchParams.get("theoreticalLang")?.toString() || "all",
            theoreticalTutorSex:
                (searchParams
                    .get("theoreticalTutorSex")
                    ?.toString() as TutorsSexEnum) || TutorsSexEnum.both,
            practicalTutorSex:
                (searchParams
                    .get("practicalTutorSex")
                    ?.toString() as TutorsSexEnum) || TutorsSexEnum.both,
            city: searchParams.get("city")?.toString() || "",
            brand: searchParams.get("brand")?.toString() || "",
            model: searchParams.get("model")?.toString() || "",
            features: {
                disabled:
                    searchParams.get("disabled")?.toLowerCase() === "true",
                outOfTownTraining:
                    searchParams.get("outOfTownTraining")?.toLowerCase() ===
                    "true",
                eveningSessions:
                    searchParams.get("eveningSessions")?.toLowerCase() ===
                    "true",
                badWeatherTraining:
                    searchParams.get("badWeatherTraining")?.toLowerCase() ===
                    "true",
                mechanicalPrinciplesTraining:
                    searchParams
                        .get("mechanicalPrinciplesTraining")
                        ?.toLowerCase() === "true",
                firstAidPrinciplesTraining:
                    searchParams
                        .get("firstAidPrinciplesTraining")
                        ?.toLowerCase() === "true",
                trainingOnEmulator:
                    searchParams.get("trainingOnEmulator")?.toLowerCase() ===
                    "true",
                theoreticalOnline:
                    searchParams.get("theoreticalOnline")?.toLowerCase() ===
                    "true",
                practicalOnlineBooking:
                    searchParams
                        .get("practicalOnlineBooking")
                        ?.toLowerCase() === "true",
                practicalPhoneBooking:
                    searchParams.get("practicalPhoneBooking")?.toLowerCase() ===
                    "true",
                documentPreparation:
                    searchParams.get("documentPreparation")?.toLowerCase() ===
                    "true",
                paymentConvenience:
                    searchParams.get("paymentConvenience")?.toLowerCase() ===
                    "true",
            },
        },
    });

    function onSubmit(data: FormType) {
        const params = new URLSearchParams(searchParams);

        setQueryParams(params, "permis", data.permis);
        setQueryParams(params, "practicalLang", data.practicalLang);
        setQueryParams(params, "theoreticalLang", data.theoreticalLang);
        setQueryParams(
            params,
            "theoreticalTutorSex",
            data.theoreticalTutorSex,
            TutorsSexEnum.both
        );
        setQueryParams(
            params,
            "practicalTutorSex",
            data.practicalTutorSex,
            TutorsSexEnum.both
        );
        setQueryParams(params, "city", data.city, "");
        setQueryParams(params, "brand", data.brand, "");
        setQueryParams(params, "model", data.model, "");

        setQueryParams(
            params,
            "disabled",
            data.features.disabled?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "outOfTownTraining",
            data.features.outOfTownTraining?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "eveningSessions",
            data.features.eveningSessions?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "badWeatherTraining",
            data.features.badWeatherTraining?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "mechanicalPrinciplesTraining",
            data.features.mechanicalPrinciplesTraining?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "firstAidPrinciplesTraining",
            data.features.firstAidPrinciplesTraining?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "trainingOnEmulator",
            data.features.trainingOnEmulator?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "theoreticalOnline",
            data.features.theoreticalOnline?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "practicalOnlineBooking",
            data.features.practicalOnlineBooking?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "practicalPhoneBooking",
            data.features.practicalPhoneBooking?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "documentPreparation",
            data.features.documentPreparation?.toString(),
            "false"
        );
        setQueryParams(
            params,
            "paymentConvenience",
            data.features.paymentConvenience?.toString(),
            "false"
        );

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-start gap-3 mb-4 flex-wrap"
            >
                <FormField
                    name="permis"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                dir="rtl"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="all">
                                        جميع الرخص
                                    </SelectItem>
                                    {Object.values(PermisEnum).map((permis) => (
                                        <SelectItem key={permis} value={permis}>
                                            الرخصة {permis}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="theoreticalLang"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                dir="rtl"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="all">
                                        جميع اللغات النظرية
                                    </SelectItem>
                                    {Object.values(LangsEnum).map((lang) => (
                                        <SelectItem key={lang} value={lang}>
                                            {lang}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="practicalLang"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                dir="rtl"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="all">
                                        جميع اللغات التطبيقية
                                    </SelectItem>
                                    {Object.values(LangsEnum).map((lang) => (
                                        <SelectItem key={lang} value={lang}>
                                            {lang}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="theoreticalTutorSex"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                dir="rtl"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-44">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={TutorsSexEnum.both}>
                                        {TutorsSexEnum.both} نظرية
                                    </SelectItem>
                                    <SelectItem value={TutorsSexEnum.men}>
                                        {TutorsSexEnum.men}
                                    </SelectItem>
                                    <SelectItem value={TutorsSexEnum.women}>
                                        {TutorsSexEnum.women}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="practicalTutorSex"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                dir="rtl"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-44">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={TutorsSexEnum.both}>
                                        {TutorsSexEnum.both} تطبيقية
                                    </SelectItem>
                                    <SelectItem value={TutorsSexEnum.men}>
                                        {TutorsSexEnum.men}
                                    </SelectItem>
                                    <SelectItem value={TutorsSexEnum.women}>
                                        {TutorsSexEnum.women}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="city"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="المدينة" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="brand"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="شركة العربة" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="model"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="موديل العربة"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DropdownMenu open={isOpen} dir="rtl">
                    <DropdownMenuTrigger asChild>
                        <button
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="flex gap-2 h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&>span]:line-clamp-1"
                        >
                            <span>المميزات</span>
                            <ChevronDownIcon className="size-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent ref={ref} className="w-64">
                        <DropdownMenuCheckboxItem
                            checked={form.watch("features.disabled")}
                            onCheckedChange={(checked) =>
                                form.setValue("features.disabled", checked)
                            }
                        >
                            تعليم دوي الإحتياجات الخاصة
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch("features.outOfTownTraining")}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.outOfTownTraining",
                                    checked
                                )
                            }
                        >
                            تعليم خارج المدينة
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch("features.eveningSessions")}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.eveningSessions",
                                    checked
                                )
                            }
                        >
                            تعليم في المساء
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch("features.badWeatherTraining")}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.badWeatherTraining",
                                    checked
                                )
                            }
                        >
                            تعليم في أجواء صعبة
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch(
                                "features.mechanicalPrinciplesTraining"
                            )}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.mechanicalPrinciplesTraining",
                                    checked
                                )
                            }
                        >
                            تعليم أساسيات الميكانيك
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch(
                                "features.firstAidPrinciplesTraining"
                            )}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.firstAidPrinciplesTraining",
                                    checked
                                )
                            }
                        >
                            تعليم أساسيات الإسعافات الأولية
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch("features.trainingOnEmulator")}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.trainingOnEmulator",
                                    checked
                                )
                            }
                        >
                            تعليم في محاكي السياقة
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch("features.theoreticalOnline")}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.theoreticalOnline",
                                    checked
                                )
                            }
                        >
                            تعليم الكود عن بعد
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch(
                                "features.practicalOnlineBooking"
                            )}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.practicalOnlineBooking",
                                    checked
                                )
                            }
                        >
                            حجز الحصص التطبيقية عبر الأنترنت
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch(
                                "features.practicalPhoneBooking"
                            )}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.practicalPhoneBooking",
                                    checked
                                )
                            }
                        >
                            حجز الحصص التطبيقية عبر الهاتف
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch("features.documentPreparation")}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.documentPreparation",
                                    checked
                                )
                            }
                        >
                            التكلف بتجهيز ملف الترشيح
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={form.watch("features.paymentConvenience")}
                            onCheckedChange={(checked) =>
                                form.setValue(
                                    "features.paymentConvenience",
                                    checked
                                )
                            }
                        >
                            دعم التقسيط
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button size="icon">
                    <Search className="size-5" />
                </Button>
            </form>
        </Form>
    );
}
