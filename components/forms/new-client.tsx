"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";

import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";

import { getFormData } from "@/lib/utils";

import { Types, newClientSchema } from "@/schemas/new-client";

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
import { Input } from "@/components/ui/input";
import { addTicket } from "@/actions/tickets";
import SubmitButton from "@/components/forms/submit-button";
import { PermisEnum } from "@/schemas/autoecoles";

type newClientType = InferType<typeof newClientSchema>;

export default function NewClientForm() {
    const locale = useLocale();
    const t = useTranslations("HomePage.HeroSection.Form");
    const validationMessages = useTranslations("ValidationMessages.NewClient")
    const [pending, startTransition] = useTransition();
    const form = useForm<newClientType>({
        mode: "onChange",
        resolver: yupResolver(newClientSchema),
        defaultValues: {
            name: "",
            city: "",
            phone: "",
            type: undefined,
            permis: undefined,
        },
    });

    function onSubmit(data: newClientType) {
        startTransition(async () => {
            try {
                const formData = getFormData(data);
                await addTicket(formData);
                form.reset();
                toast(validationMessages("Messages.success.title"), {
                    description: validationMessages("Messages.success.desc"),
                    cancel: {
                        label: validationMessages("Messages.success.action"),
                        onClick: () => null,
                    },
                });
            } catch (error) {
                toast(validationMessages("Messages.failed.title"), {
                    description: validationMessages("Messages.failed.desc"),
                    cancel: {
                        label: validationMessages("Messages.failed.action"),
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
                className="bg-background shadow-sm border rounded-lg flex flex-col md:flex-row gap-4 p-6 md:p-3 md:gap-3"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="grow">
                            <FormControl>
                                <Input
                                    placeholder={t("inputs.name")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="grow">
                            <FormControl>
                                <Input
                                    placeholder={t("inputs.city")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="grow">
                            <FormControl>
                                <Input
                                    placeholder={t("inputs.phone")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="grow">
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                dir={locale === "ar" ? "rtl" : "ltr"}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={t(
                                                "inputs.type.placeholder"
                                            )}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={Types.permis}>
                                        {t("inputs.type.options.permis")}
                                    </SelectItem>
                                    <SelectItem value={Types.seances}>
                                        {t("inputs.type.options.seances")}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="permis"
                    render={({ field }) => (
                        <FormItem className="grow">
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                dir={locale === "ar" ? "rtl" : "ltr"}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={t(
                                                "inputs.category.placeholder"
                                            )}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.values(PermisEnum).map(permis => (
                                            <SelectItem key={permis} value={permis}>
                                                {permis}
                                            </SelectItem>
                                        ))
                                    }
                                    {/* {
                                        Object.values(PermisEnum).map(permis => (
                                            <SelectItem key={permis} value={`الرخصة ${permis}`}>
                                                {t(`inputs.category.options.${permis}`)}
                                            </SelectItem>
                                        ))
                                    } */}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <SubmitButton label={t("action")} pending={pending} />
            </form>
        </Form>
    );
}
