"use client";

import { useTransition } from "react";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { contactUsSchema } from "@/schemas/contact-us";
import { Textarea } from "@/components/ui/textarea";
import { getFormData } from "@/lib/utils";
import { addMessage } from "@/actions/messages";
import SubmitButton from "./submit-button";

type contactUsType = InferType<typeof contactUsSchema>;

export default function ContactUsForm() {
    const [pending, startTransition] = useTransition();
    const form = useForm<contactUsType>({
        mode: "onChange",
        resolver: yupResolver(contactUsSchema),
        defaultValues: {
            name: "",
            phone: "",
            city: "",
            autoEcole: "",
            message: "",
        },
    });

    const t = useTranslations("HomePage.ContactSection.Form");
    const validationMessages = useTranslations("ValidationMessages.Contact");

    function onSubmit(data: contactUsType) {
        startTransition(async () => {
            try {
                const formData = getFormData(data);
                await addMessage(formData);
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
                className="flex flex-col gap-4 grow md:w-1/2 p-6 shadow-sm rounded-lg border"
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
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="grow">
                            <FormControl>
                                <Input
                                    type="text"
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
                    name="city"
                    render={({ field }) => (
                        <FormItem className="grow">
                            <FormControl>
                                <Input
                                    type="text"
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
                    name="autoEcole"
                    render={({ field }) => (
                        <FormItem className="grow">
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder={t("inputs.autoEcole")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder={t("inputs.message")}
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <SubmitButton label={t("action")} pending={pending} />
            </form>
        </Form>
    );
}
