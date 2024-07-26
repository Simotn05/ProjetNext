"use server";

import { loginSchema } from "@/schemas/auth";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { IS_ADMIN_LOGGED_IN_REDIRECT, LOGIN_ROUTE } from "@/routes";

export async function login(formData: FormData) {
    const entries = Object.fromEntries(formData);

    if (!loginSchema.isValidSync(entries)) return "البيانات ليست صحيحة";

    const credentials = loginSchema.validateSync(entries);
    
    try {
        await signIn("credentials", {
            ...credentials,
            redirectTo: IS_ADMIN_LOGGED_IN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "البريد الإلكتروني أو كلمة السر ليست صحيحة";
                default:
                    return "هناك خطأ ما، المرجو المحاولة لاحقا.";
            }
        }
        throw error;
    }
}

export async function logOut() {
    await signOut({
        redirectTo: LOGIN_ROUTE,
    });
}
