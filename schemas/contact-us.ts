import { object, string } from "yup";
import { phoneRegex } from "@/regex";

export const contactUsSchema = object({
    name: string().trim().required("Contact.name.required"),
    autoEcole: string().trim().required("Contact.autoEcole.required"),
    city: string().trim().required("Contact.city.required"),
    phone: string()
        .trim()
        .required("Contact.phone.required")
        .matches(phoneRegex, "Contact.phone.required"),
    message: string()
        .trim()
        .required("Contact.message.required")
        .min(3, "Contact.message.required"),
});
