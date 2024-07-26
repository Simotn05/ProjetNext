"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";

import { useForm } from "react-hook-form";

import { login } from "@/actions/auth";

import { loginSchema } from "@/schemas/auth";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { getFormData } from "@/lib/utils";
import FormAlert from "./form-alert";
import { useState, useTransition } from "react";
import SubmitButton from "./submit-button";
import { toast } from "sonner";

type loginType = InferType<typeof loginSchema>;

export function LoginForm() {
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);

    const form = useForm<loginType>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: loginType) {
        startTransition(async () => {
            try {
                const formData = getFormData(data);
                const resp = await login(formData);
                setError(resp);
                if (!resp) {
                    toast("مرحبا بعودتك", {
                        description: "مرحبا بك في قسم تسيير منصة Mon AutoEcole",
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormAlert variant="error" message={error} />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>البريد الإلكتروني</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="example@mail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>كلمة السر</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="xxxxxxxx"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <SubmitButton
                    label="تسجيل الدخول"
                    pending={pending}
                    className="w-full"
                />
            </form>
        </Form>
    );
}
