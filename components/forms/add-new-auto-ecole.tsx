"use client";

import { Fragment, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";

import { Trash } from "lucide-react";

import { objectToFormData } from "@/lib/utils";

import {
    AddNewAutoEcoleSchema,
    LangsEnum,
    PermisEnum,
    TutorsSexEnum,
} from "@/schemas/autoecoles";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/forms/submit-button";
import { addAutoEcole } from "@/actions/autoecole";
import { toast } from "sonner";
import { useRouter } from "@/lib/navigation";
import { useLocale } from "next-intl";

type AddNewAutoEcoleType = InferType<typeof AddNewAutoEcoleSchema>;

export default function AddNewAutoEcoleForm() {
    const router = useRouter();
    const locale = useLocale();
    const [pending, startTransition] = useTransition();
    const form = useForm<AddNewAutoEcoleType>({
        mode: "onChange",
        resolver: yupResolver(AddNewAutoEcoleSchema),
        defaultValues: {
            name: "",
            ownerName: "",
            city: "",
            address: "",
            phone: "",
            fix: "",
            registerNumber: undefined,
            businessDocNumber: undefined,
            [PermisEnum.A1]: {
                status: false,
                vehicles: [
                    {
                        brand: "",
                        model: "",
                    },
                ],
                languages: {
                    practical: [],
                    theoretical: [],
                },
                prices: {
                    training: {
                        min: undefined,
                        max: undefined,
                    },
                    theoretical: {
                        min: undefined,
                        max: undefined,
                    },
                    practical: {
                        min: undefined,
                        max: undefined,
                    },
                    repeated: {
                        min: undefined,
                        max: undefined,
                        numSeances: undefined,
                    },
                },
                tutorsSex: {},
            },
            [PermisEnum.AM]: {
                status: false,
                vehicles: [
                    {
                        brand: "",
                        model: "",
                    },
                ],
                languages: {
                    practical: [],
                    theoretical: [],
                },
                prices: {
                    training: {
                        min: undefined,
                        max: undefined,
                    },
                    theoretical: {
                        min: undefined,
                        max: undefined,
                    },
                    practical: {
                        min: undefined,
                        max: undefined,
                    },
                    repeated: {
                        min: undefined,
                        max: undefined,
                        numSeances: undefined,
                    },
                },
                tutorsSex: {},
            },
            [PermisEnum.A]: {
                status: false,
                vehicles: [
                    {
                        brand: "",
                        model: "",
                    },
                ],
                languages: {
                    practical: [],
                    theoretical: [],
                },
                prices: {
                    training: {
                        min: undefined,
                        max: undefined,
                    },
                    theoretical: {
                        min: undefined,
                        max: undefined,
                    },
                    practical: {
                        min: undefined,
                        max: undefined,
                    },
                    repeated: {
                        min: undefined,
                        max: undefined,
                        numSeances: undefined,
                    },
                },
                tutorsSex: {},
            },
            [PermisEnum.B]: {
                status: false,
                vehicles: [
                    {
                        brand: "",
                        model: "",
                    },
                ],
                languages: {
                    practical: [],
                    theoretical: [],
                },
                prices: {
                    training: {
                        min: undefined,
                        max: undefined,
                    },
                    theoretical: {
                        min: undefined,
                        max: undefined,
                    },
                    practical: {
                        min: undefined,
                        max: undefined,
                    },
                    repeated: {
                        min: undefined,
                        max: undefined,
                        numSeances: undefined,
                    },
                },
                tutorsSex: {},
            },
            [PermisEnum.C]: {
                status: false,
                vehicles: [
                    {
                        brand: "",
                        model: "",
                    },
                ],
                languages: {
                    practical: [],
                    theoretical: [],
                },
                prices: {
                    training: {
                        min: undefined,
                        max: undefined,
                    },
                    theoretical: {
                        min: undefined,
                        max: undefined,
                    },
                    practical: {
                        min: undefined,
                        max: undefined,
                    },
                    repeated: {
                        min: undefined,
                        max: undefined,
                        numSeances: undefined,
                    },
                },
                tutorsSex: {},
            },
            [PermisEnum.EC]: {
                status: false,
                vehicles: [
                    {
                        brand: "",
                        model: "",
                    },
                ],
                languages: {
                    practical: [],
                    theoretical: [],
                },
                prices: {
                    training: {
                        min: undefined,
                        max: undefined,
                    },
                    theoretical: {
                        min: undefined,
                        max: undefined,
                    },
                    practical: {
                        min: undefined,
                        max: undefined,
                    },
                    repeated: {
                        min: undefined,
                        max: undefined,
                        numSeances: undefined,
                    },
                },
                tutorsSex: {},
            },
            [PermisEnum.ED]: {
                status: false,
                vehicles: [
                    {
                        brand: "",
                        model: "",
                    },
                ],
                languages: {
                    practical: [],
                    theoretical: [],
                },
                prices: {
                    training: {
                        min: undefined,
                        max: undefined,
                    },
                    theoretical: {
                        min: undefined,
                        max: undefined,
                    },
                    practical: {
                        min: undefined,
                        max: undefined,
                    },
                    repeated: {
                        min: undefined,
                        max: undefined,
                        numSeances: undefined,
                    },
                },
                tutorsSex: {},
            },
            [PermisEnum.F]: {
                status: false,
                vehicles: [
                    {
                        brand: "",
                        model: "",
                    },
                ],
                languages: {
                    practical: [],
                    theoretical: [],
                },
                prices: {
                    training: {
                        min: undefined,
                        max: undefined,
                    },
                    theoretical: {
                        min: undefined,
                        max: undefined,
                    },
                    practical: {
                        min: undefined,
                        max: undefined,
                    },
                    repeated: {
                        min: undefined,
                        max: undefined,
                        numSeances: undefined,
                    },
                },
                tutorsSex: {},
            },
            paymentConvenience: {
                status: false,
                number: 0,
            },
            features: {
                disabled: false,
                outOfTownTraining: false,
                eveningSessions: false,
                badWeatherTraining: false,
                mechanicalPrinciplesTraining: false,
                firstAidPrinciplesTraining: false,
                trainingOnEmulator: false,
                theoreticalOnline: false,
                practicalOnlineBooking: false,
                practicalPhoneBooking: false,
                documentPreparation: false,
            },
        },
    });

    const permisA = useFieldArray({
        control: form.control,
        name: `${PermisEnum.A}.vehicles`,
    });
    const permisA1 = useFieldArray({
        control: form.control,
        name: `${PermisEnum.A1}.vehicles`,
    });
    const permisAM = useFieldArray({
        control: form.control,
        name: `${PermisEnum.AM}.vehicles`,
    });
    const permisB = useFieldArray({
        control: form.control,
        name: `${PermisEnum.B}.vehicles`,
    });
    const permisC = useFieldArray({
        control: form.control,
        name: `${PermisEnum.C}.vehicles`,
    });
    const permisEC = useFieldArray({
        control: form.control,
        name: `${PermisEnum.EC}.vehicles`,
    });
    const permisED = useFieldArray({
        control: form.control,
        name: `${PermisEnum.ED}.vehicles`,
    });
    const permisF = useFieldArray({
        control: form.control,
        name: `${PermisEnum.F}.vehicles`,
    });

    function onSubmit(data: AddNewAutoEcoleType) {
        startTransition(async () => {
            try {
                
                const formData = objectToFormData(data);
                const resp = await addAutoEcole(formData, locale);

                if (resp?.success) {
                    toast(resp.success, {
                        description: "تمت إضافة مدرسة تعليم السياقة بنجاح",
                        cancel: {
                            label: "إغلاق",
                            onClick: () => null,
                        },
                    });
                    // form.reset();
                    return router.push("/ecoles");
                } else if (resp.error) {
                    toast(resp.error, {
                        description:
                            "هناك مشكلة، تأكد من البيانات وأعد المحاولة مجددا",
                        cancel: {
                            label: "إغلاق",
                            onClick: () => null,
                        },
                    });
                }
            } catch (error) {
                toast("فشلة المهمة", {
                    description:
                        "هناك مشكلة، تأكد من البيانات وأعد المحاولة مجددا",
                    cancel: {
                        label: "إغلاق",
                        onClick: () => null,
                    },
                });
            }
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <h2 className="my-4 text-lg lg:text-xl font-semibold">
                    المعلومات الأساسية
                </h2>

                <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-4">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>إسم المدرسة</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="أحمد لتعليم السياقة"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="ownerName"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>إسم صاحب المدرسة</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="أحمد الخبار"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="city"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>المدينة</FormLabel>
                                <FormControl>
                                    <Input placeholder="فاس" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="address"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>العنوان الكامل</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="22 حي النسيم المسيرة فاس"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="phone"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>رقم الهاتف المحمول</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="0701020304"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="fix"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>رقم الهاتف التابث</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="0501020304"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="registerNumber"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>رقم التسجيل</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="1028347392"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="businessDocNumber"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>رقم السجل التجاري</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="1028347392"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <h2 className="my-4 text-lg lg:text-xl font-semibold">
                    رخص السياقة المقدمة
                </h2>

                <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Object.values(PermisEnum).map((permis) => (
                        <FormField
                            key={permis}
                            name={`${permis}.status`}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(e) => {
                                                    field.onChange(e);
                                                    form.trigger([
                                                        `${PermisEnum.A1}.status`,
                                                        `${PermisEnum.AM}.status`,
                                                        `${PermisEnum.A}.status`,
                                                        `${PermisEnum.B}.status`,
                                                        `${PermisEnum.C}.status`,
                                                        `${PermisEnum.EC}.status`,
                                                        `${PermisEnum.ED}.status`,
                                                        `${PermisEnum.F}.status`,
                                                    ]);
                                                }}
                                            />
                                        </FormControl>
                                        الرخصة {permis}
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>

                {/* Cars */}

                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
                    {!!form.getValues(`${PermisEnum.AM}.status`) && (
                        <div>
                            <h2 className="my-4 text-lg lg:text-xl font-semibold">
                                عربات الرخصة {PermisEnum.AM}
                            </h2>

                            <div className="flex flex-col gap-4">
                                {permisAM.fields.map((vehicle, i) => (
                                    <div
                                        key={vehicle.id}
                                        className="flex flex-wrap gap-4 [&>div]:grow"
                                    >
                                        <FormField
                                            name={`${PermisEnum.AM}.vehicles.${i}.brand`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        إسم الشركة
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="إسم الشركة"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name={`${PermisEnum.AM}.vehicles.${i}.model`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الموديل
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="الموديل"
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {permisAM.fields.length > 1 && (
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="outline"
                                                className="self-end"
                                                onClick={() =>
                                                    permisAM.remove(i)
                                                }
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        permisAM.append({
                                            brand: "",
                                            model: "",
                                        })
                                    }
                                    variant="outline"
                                >
                                    أضف عربة أخرى
                                </Button>
                            </div>
                        </div>
                    )}

                    {!!form.getValues(`${PermisEnum.A1}.status`) && (
                        <div>
                            <h2 className="my-4 text-lg lg:text-xl font-semibold">
                                عربات الرخصة {PermisEnum.A1}
                            </h2>

                            <div className="flex flex-col gap-4">
                                {permisA1.fields.map((vehicle, i) => (
                                    <div
                                        key={vehicle.id}
                                        className="flex flex-wrap gap-4 [&>div]:grow"
                                    >
                                        <FormField
                                            name={`${PermisEnum.A1}.vehicles.${i}.brand`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        إسم الشركة
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="إسم الشركة"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name={`${PermisEnum.A1}.vehicles.${i}.model`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الموديل
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="الموديل"
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {permisA1.fields.length > 1 && (
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="outline"
                                                className="self-end"
                                                onClick={() =>
                                                    permisA1.remove(i)
                                                }
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        permisA1.append({
                                            brand: "",
                                            model: "",
                                        })
                                    }
                                    variant="outline"
                                >
                                    أضف عربة أخرى
                                </Button>
                            </div>
                        </div>
                    )}

                    {!!form.getValues(`${PermisEnum.A}.status`) && (
                        <div>
                            <h2 className="my-4 text-lg lg:text-xl font-semibold">
                                عربات الرخصة {PermisEnum.A}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {permisA.fields.map((vehicle, i) => (
                                    <div
                                        key={vehicle.id}
                                        className="flex flex-wrap gap-4 [&>div]:grow"
                                    >
                                        <FormField
                                            name={`${PermisEnum.A}.vehicles.${i}.brand`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        إسم الشركة
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="إسم الشركة"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name={`${PermisEnum.A}.vehicles.${i}.model`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الموديل
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="الموديل"
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {permisA.fields.length > 1 && (
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="outline"
                                                className="self-end"
                                                onClick={() =>
                                                    permisA.remove(i)
                                                }
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        permisA.append({ brand: "", model: "" })
                                    }
                                    variant="outline"
                                >
                                    أضف عربة أخرى
                                </Button>
                            </div>{" "}
                        </div>
                    )}

                    {!!form.getValues(`${PermisEnum.B}.status`) && (
                        <div>
                            <h2 className="my-4 text-lg lg:text-xl font-semibold">
                                عربات الرخصة {PermisEnum.B}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {permisB.fields.map((vehicle, i) => (
                                    <div
                                        key={vehicle.id}
                                        className="flex flex-wrap gap-4 [&>div]:grow"
                                    >
                                        <FormField
                                            name={`${PermisEnum.B}.vehicles.${i}.brand`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        إسم الشركة
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="إسم الشركة"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name={`${PermisEnum.B}.vehicles.${i}.model`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الموديل
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="الموديل"
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {permisB.fields.length > 1 && (
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="outline"
                                                className="self-end"
                                                onClick={() =>
                                                    permisB.remove(i)
                                                }
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        permisB.append({ brand: "", model: "" })
                                    }
                                    variant="outline"
                                >
                                    أضف عربة أخرى
                                </Button>
                            </div>{" "}
                        </div>
                    )}

                    {!!form.getValues(`${PermisEnum.C}.status`) && (
                        <div>
                            <h2 className="my-4 text-lg lg:text-xl font-semibold">
                                عربات الرخصة {PermisEnum.C}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {permisC.fields.map((vehicle, i) => (
                                    <div
                                        key={vehicle.id}
                                        className="flex flex-wrap gap-4 [&>div]:grow"
                                    >
                                        <FormField
                                            name={`${PermisEnum.C}.vehicles.${i}.brand`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        إسم الشركة
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="إسم الشركة"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name={`${PermisEnum.C}.vehicles.${i}.model`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الموديل
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="الموديل"
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {permisC.fields.length > 1 && (
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="outline"
                                                className="self-end"
                                                onClick={() =>
                                                    permisC.remove(i)
                                                }
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        permisC.append({ brand: "", model: "" })
                                    }
                                    variant="outline"
                                >
                                    أضف عربة أخرى
                                </Button>
                            </div>{" "}
                        </div>
                    )}

                    {!!form.getValues(`${PermisEnum.EC}.status`) && (
                        <div>
                            <h2 className="my-4 text-lg lg:text-xl font-semibold">
                                عربات الرخصة {PermisEnum.EC}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {permisEC.fields.map((vehicle, i) => (
                                    <div
                                        key={vehicle.id}
                                        className="flex flex-wrap gap-4 [&>div]:grow"
                                    >
                                        <FormField
                                            name={`${PermisEnum.EC}.vehicles.${i}.brand`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        إسم الشركة
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="إسم الشركة"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name={`${PermisEnum.EC}.vehicles.${i}.model`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الموديل
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="الموديل"
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {permisEC.fields.length > 1 && (
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="outline"
                                                className="self-end"
                                                onClick={() =>
                                                    permisEC.remove(i)
                                                }
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        permisEC.append({
                                            brand: "",
                                            model: "",
                                        })
                                    }
                                    variant="outline"
                                >
                                    أضف عربة أخرى
                                </Button>
                            </div>
                        </div>
                    )}

                    {!!form.getValues(`${PermisEnum.ED}.status`) && (
                        <div>
                            <h2 className="my-4 text-lg lg:text-xl font-semibold">
                                عربات الرخصة {PermisEnum.ED}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {permisED.fields.map((vehicle, i) => (
                                    <div
                                        key={vehicle.id}
                                        className="flex flex-wrap gap-4 [&>div]:grow"
                                    >
                                        <FormField
                                            name={`${PermisEnum.ED}.vehicles.${i}.brand`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        إسم الشركة
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="إسم الشركة"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name={`${PermisEnum.ED}.vehicles.${i}.model`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الموديل
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="الموديل"
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {permisED.fields.length > 1 && (
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="outline"
                                                className="self-end"
                                                onClick={() =>
                                                    permisED.remove(i)
                                                }
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        permisED.append({
                                            brand: "",
                                            model: "",
                                        })
                                    }
                                    variant="outline"
                                >
                                    أضف عربة أخرى
                                </Button>
                            </div>
                        </div>
                    )}

                    {!!form.getValues(`${PermisEnum.F}.status`) && (
                        <div>
                            <h2 className="my-4 text-lg lg:text-xl font-semibold">
                                عربات الرخصة {PermisEnum.F}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {permisF.fields.map((vehicle, i) => (
                                    <div
                                        key={vehicle.id}
                                        className="flex flex-wrap gap-4 [&>div]:grow"
                                    >
                                        <FormField
                                            name={`${PermisEnum.F}.vehicles.${i}.brand`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        إسم الشركة
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="إسم الشركة"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name={`${PermisEnum.F}.vehicles.${i}.model`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        الموديل
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="الموديل"
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {permisF.fields.length > 1 && (
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="outline"
                                                className="self-end"
                                                onClick={() =>
                                                    permisF.remove(i)
                                                }
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        permisF.append({ brand: "", model: "" })
                                    }
                                    variant="outline"
                                >
                                    أضف عربة أخرى
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tutors Sex */}
                <h2 className="my-4 text-lg lg:text-xl font-semibold">
                    المدربين
                </h2>

                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
                    {Object.values(PermisEnum)
                        .filter(
                            (permis) => !!form.getValues(`${permis}.status`)
                        )
                        .map((permis) => (
                            <Fragment key={permis}>
                                <FormField
                                    control={form.control}
                                    name={`${permis}.tutorsSex.theoretical`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                المدربين النظريين لرخصة {permis}
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                dir="rtl"
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="إختر المدربين المتوفرين" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(
                                                        TutorsSexEnum
                                                    ).map((item) => (
                                                        <SelectItem
                                                            key={item}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`${permis}.tutorsSex.practical`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                المدربين التطبيقيين لرخصة{" "}
                                                {permis}
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                dir="rtl"
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="إختر المدربين المتوفرين" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(
                                                        TutorsSexEnum
                                                    ).map((item) => (
                                                        <SelectItem
                                                            key={item}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Fragment>
                        ))}
                </div>

                {/* Languages */}

                {!!form.getValues(`${PermisEnum.A1}.status`) && (
                    <>
                        <h2 className="my-4 text-lg lg:text-xl font-semibold">
                            اللغات المتوفرة لرخصة {PermisEnum.A1}
                        </h2>

                        <FormField
                            name={`${PermisEnum.A1}.languages.practical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم التطبيقي
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.A1}.languages.practical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`${PermisEnum.A1}.languages.theoretical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم النظري
                                        (الكود)
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.A1}.languages.theoretical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {!!form.getValues(`${PermisEnum.AM}.status`) && (
                    <>
                        <h2 className="my-4 text-lg lg:text-xl font-semibold">
                            اللغات المتوفرة لرخصة {PermisEnum.AM}
                        </h2>

                        <FormField
                            name={`${PermisEnum.AM}.languages.practical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم التطبيقي
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.AM}.languages.practical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`${PermisEnum.AM}.languages.theoretical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم النظري
                                        (الكود)
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.AM}.languages.theoretical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {!!form.getValues(`${PermisEnum.A}.status`) && (
                    <>
                        <h2 className="my-4 text-lg lg:text-xl font-semibold">
                            اللغات المتوفرة لرخصة {PermisEnum.A}
                        </h2>

                        <FormField
                            name={`${PermisEnum.A}.languages.practical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم التطبيقي
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.A}.languages.practical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`${PermisEnum.A}.languages.theoretical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم النظري
                                        (الكود)
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.A}.languages.theoretical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {!!form.getValues(`${PermisEnum.B}.status`) && (
                    <>
                        <h2 className="my-4 text-lg lg:text-xl font-semibold">
                            اللغات المتوفرة لرخصة {PermisEnum.B}
                        </h2>

                        <FormField
                            name={`${PermisEnum.B}.languages.practical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم التطبيقي
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.B}.languages.practical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`${PermisEnum.B}.languages.theoretical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم النظري
                                        (الكود)
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.B}.languages.theoretical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {!!form.getValues(`${PermisEnum.C}.status`) && (
                    <>
                        <h2 className="my-4 text-lg lg:text-xl font-semibold">
                            اللغات المتوفرة لرخصة {PermisEnum.C}
                        </h2>

                        <FormField
                            name={`${PermisEnum.C}.languages.practical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم التطبيقي
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.C}.languages.practical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`${PermisEnum.C}.languages.theoretical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم النظري
                                        (الكود)
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.C}.languages.theoretical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {!!form.getValues(`${PermisEnum.EC}.status`) && (
                    <>
                        <h2 className="my-4 text-lg lg:text-xl font-semibold">
                            اللغات المتوفرة لرخصة {PermisEnum.EC}
                        </h2>

                        <FormField
                            name={`${PermisEnum.EC}.languages.practical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم التطبيقي
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.EC}.languages.practical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`${PermisEnum.EC}.languages.theoretical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم النظري
                                        (الكود)
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.EC}.languages.theoretical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {!!form.getValues(`${PermisEnum.ED}.status`) && (
                    <>
                        <h2 className="my-4 text-lg lg:text-xl font-semibold">
                            اللغات المتوفرة لرخصة {PermisEnum.ED}
                        </h2>

                        <FormField
                            name={`${PermisEnum.ED}.languages.practical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم التطبيقي
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.ED}.languages.practical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`${PermisEnum.ED}.languages.theoretical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم النظري
                                        (الكود)
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.ED}.languages.theoretical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {!!form.getValues(`${PermisEnum.F}.status`) && (
                    <>
                        <h2 className="my-4 text-lg lg:text-xl font-semibold">
                            اللغات المتوفرة لرخصة {PermisEnum.F}
                        </h2>

                        <FormField
                            name={`${PermisEnum.F}.languages.practical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم التطبيقي
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.F}.languages.practical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name={`${PermisEnum.F}.languages.theoretical`}
                            control={form.control}
                            render={() => (
                                <FormItem>
                                    <FormLabel>
                                        اللغات المتوفرة في التعليم النظري
                                        (الكود)
                                    </FormLabel>
                                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
                                        {Object.values(LangsEnum).map(
                                            (lang) => (
                                                <FormField
                                                    key={lang}
                                                    control={form.control}
                                                    name={`${PermisEnum.F}.languages.theoretical`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang}
                                                                className="flex-1"
                                                            >
                                                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={(
                                                                                field.value as LangsEnum[]
                                                                            ).includes(
                                                                                lang
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              lang,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          (
                                                                                              field.value as LangsEnum[]
                                                                                          ).filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  lang
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    {lang}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {/* Prices */}

                <h2 className="my-4 text-lg lg:text-xl font-semibold">
                    سعر التدريب الشامل{" "}
                    <span className="text-sm">(غير شامل للملف)</span>
                </h2>

                <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                    {!!form.getValues(`${PermisEnum.AM}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.AM}.prices.training.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.AM}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.AM}.prices.training.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.AM}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.A1}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.A1}.prices.training.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.A1}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A1}.prices.training.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.A1}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.A}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.A}.prices.training.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.A}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A}.prices.training.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.A}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.B}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.B}.prices.training.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.B}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.B}.prices.training.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.B}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.C}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.C}.prices.training.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.C}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.C}.prices.training.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.C}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.EC}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.EC}.prices.training.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.EC}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.EC}.prices.training.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.EC}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.ED}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.ED}.prices.training.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.ED}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.ED}.prices.training.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.ED}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.F}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.F}.prices.training.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.F}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.F}.prices.training.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.F}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                </div>

                <h2 className="my-4 text-lg lg:text-xl font-semibold">
                    سعر التكوين في حالة الرسوب في الإمتحان الأول
                </h2>

                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
                    {!!form.getValues(`${PermisEnum.AM}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.AM}.prices.repeated.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.AM}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.AM}.prices.repeated.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.AM}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.AM}.prices.repeated.numSeances.practical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص التطبيقية لرخصة{" "}
                                            {PermisEnum.AM}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.AM}.prices.repeated.numSeances.theoretical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص النظرية لرخصة{" "}
                                            {PermisEnum.AM}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.A1}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.A1}.prices.repeated.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.A1}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A1}.prices.repeated.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.A1}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A1}.prices.repeated.numSeances.practical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص التطبيقية لرخصة{" "}
                                            {PermisEnum.A1}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A1}.prices.repeated.numSeances.theoretical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص النظرية لرخصة{" "}
                                            {PermisEnum.A1}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.A}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.A}.prices.repeated.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.A}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A}.prices.repeated.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.A}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A}.prices.repeated.numSeances.practical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص التطبيقية لرخصة{" "}
                                            {PermisEnum.A}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A}.prices.repeated.numSeances.theoretical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص النظرية لرخصة{" "}
                                            {PermisEnum.A}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.B}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.B}.prices.repeated.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.B}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.B}.prices.repeated.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.B}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.B}.prices.repeated.numSeances.practical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص التطبيقية لرخصة{" "}
                                            {PermisEnum.B}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.B}.prices.repeated.numSeances.theoretical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص النظرية لرخصة{" "}
                                            {PermisEnum.B}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.C}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.C}.prices.repeated.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.C}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.C}.prices.repeated.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.C}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.C}.prices.repeated.numSeances.practical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص التطبيقية لرخصة{" "}
                                            {PermisEnum.C}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.C}.prices.repeated.numSeances.theoretical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص النظرية لرخصة{" "}
                                            {PermisEnum.C}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.EC}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.EC}.prices.repeated.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.EC}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.EC}.prices.repeated.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.EC}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.EC}.prices.repeated.numSeances.practical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص التطبيقية لرخصة{" "}
                                            {PermisEnum.EC}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.EC}.prices.repeated.numSeances.theoretical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص النظرية لرخصة{" "}
                                            {PermisEnum.EC}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.ED}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.ED}.prices.repeated.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.ED}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.ED}.prices.repeated.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.ED}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.ED}.prices.repeated.numSeances.practical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص التطبيقية لرخصة{" "}
                                            {PermisEnum.ED}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.ED}.prices.repeated.numSeances.theoretical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص النظرية لرخصة{" "}
                                            {PermisEnum.ED}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.F}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.F}.prices.repeated.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.F}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.F}.prices.repeated.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.F}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.F}.prices.repeated.numSeances.practical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص التطبيقية لرخصة{" "}
                                            {PermisEnum.F}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.F}.prices.repeated.numSeances.theoretical`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            عدد الحصص النظرية لرخصة{" "}
                                            {PermisEnum.F}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                </div>

                <h2 className="my-4 text-lg lg:text-xl font-semibold">
                    سعر ساعة التدريب التطبيقي
                </h2>

                <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                    {!!form.getValues(`${PermisEnum.AM}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.AM}.prices.practical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.AM}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.AM}.prices.practical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.AM}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.A1}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.A1}.prices.practical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.A1}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A1}.prices.practical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.A1}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.A}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.A}.prices.practical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.A}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A}.prices.practical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.A}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.B}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.B}.prices.practical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.B}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.B}.prices.practical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.B}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.C}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.C}.prices.practical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.C}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.C}.prices.practical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.C}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.EC}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.EC}.prices.practical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.EC}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.EC}.prices.practical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.EC}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.ED}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.ED}.prices.practical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.ED}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.ED}.prices.practical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.ED}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.F}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.F}.prices.practical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.F}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.F}.prices.practical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.F}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                </div>

                <h2 className="my-4 text-lg lg:text-xl font-semibold">
                    سعر ساعة التدريب النظري (الكود)
                </h2>

                <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                    {!!form.getValues(`${PermisEnum.AM}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.AM}.prices.theoretical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.AM}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.AM}.prices.theoretical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.AM}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.A1}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.A1}.prices.theoretical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.A1}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A1}.prices.theoretical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.A1}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.A}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.A}.prices.theoretical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.A}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.A}.prices.theoretical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.A}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.B}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.B}.prices.theoretical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.B}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.B}.prices.theoretical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.B}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.C}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.C}.prices.theoretical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.C}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.C}.prices.theoretical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.C}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.EC}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.EC}.prices.theoretical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.EC}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.EC}.prices.theoretical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.EC}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.ED}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.ED}.prices.theoretical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.ED}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.ED}.prices.theoretical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.ED}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    {!!form.getValues(`${PermisEnum.F}.status`) && (
                        <>
                            <FormField
                                name={`${PermisEnum.F}.prices.theoretical.min`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أقل سعر لرخصة {PermisEnum.F}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="700 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name={`${PermisEnum.F}.prices.theoretical.max`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            أعلى سعر لرخصة {PermisEnum.F}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="3500 درهم"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                </div>

                <h2 className="my-4 text-lg lg:text-xl font-semibold">
                    تسهيلات الدفع
                </h2>

                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="paymentConvenience.status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    دعم تقسيط
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    {!!form.getValues("paymentConvenience.status") && (
                        <FormField
                            name="paymentConvenience.number"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>عدد الأقساط</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="حدد عدد الدفعات"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                <h2 className="my-4 text-lg lg:text-xl font-semibold">
                    مميزات المدرسة
                </h2>

                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="features.disabled"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    تعليم الأشخاص دوي الإحتياجات الخاصة
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features.outOfTownTraining"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    تدريب الزبون خارج المدينة
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features.eveningSessions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    دروس نظرية مسائية بعد 7 مساءا
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features.badWeatherTraining"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    تعليم السياقة في أجواء صعبة
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features.mechanicalPrinciplesTraining"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    تعليم الزبون أساسيات الميكانيك
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features.firstAidPrinciplesTraining"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    تعليم الزبون أساسيات الإسعافات الأولية
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features.trainingOnEmulator"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    تعليم السياقة على المحاكي
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features.theoreticalOnline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    توفير دروس نظرية عبر الأنترنت
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features.practicalOnlineBooking"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    دعم حجز الحصص تدريبية عبر الأنترنت
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features.practicalPhoneBooking"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    دعم حجز الحصص تدريبية عبر الهاتف
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="features.documentPreparation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    تجهيز الملف للزبون
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                </div>

                <SubmitButton
                    className="w-full mt-2"
                    label="إضافة المدرسة"
                    pending={pending}
                />
            </form>
        </Form>
    );
}
