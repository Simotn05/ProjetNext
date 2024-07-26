import { object, string } from "yup";
import { phoneRegex } from "@/regex";
import { PermisEnum } from "./autoecoles";

// export enum Permis {
//     motors = "الدراجات",
//     cars = "السيارات",
//     camions = "الحافلات",
//     autobus = "عربات النقل",
//     remorques = "حافلات النقل",
// }

export enum Types {
    permis = "البيرمي",
    seances = "حصص إضافية",
}

export const newClientSchema = object({
    name: string().trim().required("NewClient.name.required"),
    phone: string()
        .trim()
        .required("NewClient.phone.required")
        .matches(phoneRegex, "NewClient.phone.required"),
    city: string().trim().required("NewClient.city.required"),
    type: string()
        .required("NewClient.type.required")
        .oneOf(Object.values(Types), "NewClient.type.required"),
    permis: string()
        .required("NewClient.permis.required")
        .oneOf(Object.values(PermisEnum), "NewClient.permis.required"),
});
