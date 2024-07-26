import { object, string } from "yup";

export const loginSchema = object({
    email: string()
        .trim()
        .required("المرجوا ادخال البريد الإلكتروني")
        .email("المرجوا ادخال بريد إلكتروني صحيح"),
    password: string()
        .required("المرجوا ادخال كلمة السر")
        .min(8, "كلمة السر تتكون من 8 حروف أو أكثر"),
});
