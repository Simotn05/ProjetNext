"use server";

import { db } from "@/lib/db";
import { formDataToObject } from "@/lib/utils";
import { AddNewAutoEcoleSchema, PermisEnum } from "@/schemas/autoecoles";
import { revalidatePath } from "next/cache";

export async function addAutoEcole(
    formData: FormData,
    locale: string
): Promise<{ success?: string; error?: string }> {
    const entries = formDataToObject(formData);

    if (!AddNewAutoEcoleSchema.isValidSync(entries))
        return { error: "البيانات ليست صحيحة" };

    const data = AddNewAutoEcoleSchema.validateSync(entries);

    const registerNumberExists = await db.autoEcole.count({
        where: {
            registerNumber: data.registerNumber,
        },
    });

    if (registerNumberExists) return { error: "رقم التسجيل موجود بالفعل" };

    const businessDocNumberExists = await db.autoEcole.count({
        where: {
            businessDocNumber: data.businessDocNumber,
        },
    });

    if (businessDocNumberExists)
        return { error: "رقم السجل التجاري موجود بالفعل" };

    const features: string[] = [];
    Object.entries(data.features).forEach(([key, value]) => {
        if (value) features.push(key);
    });

    try {
        await db.$transaction([
            db.autoEcole.create({
                data: {
                    name: data.name,
                    ownerName: data.ownerName,
                    city: data.city,
                    address: data.address,
                    phone: data.phone,
                    fix: data.fix,
                    registerNumber: data.registerNumber,
                    businessDocNumber: data.businessDocNumber,
                    paymentConvenienceStatus: data.paymentConvenience.status,
                    paymentConvenienceNum: data.paymentConvenience.status
                        ? data.paymentConvenience.number
                        : null,
                    features,
                    permis: {
                        create: Object.values(PermisEnum)
                            .filter((permis) => data[permis].status)
                            .map((permis) => ({
                                name: permis as string,
                                practicalTutorsSex: data[permis].tutorsSex
                                    ?.practical as string,
                                theoreticalTutorsSex: data[permis].tutorsSex
                                    ?.theoretical as string,
                                practicalLangs: data[permis].languages
                                    ?.practical as string[],
                                theoreticalLangs: data[permis].languages
                                    ?.theoretical as string[],
                                trainingPrice: data[permis].prices
                                    ?.training as {
                                    min: number;
                                    max: number;
                                },
                                repeatedPrice: {
                                    min: data[permis].prices?.repeated
                                        ?.min as number,
                                    max: data[permis].prices?.repeated
                                        ?.max as number,
                                    theoreticalNumSeances: data[permis].prices
                                        ?.repeated?.numSeances
                                        .theoretical as number,
                                    practicalNumSeances: data[permis].prices
                                        ?.repeated?.numSeances
                                        .practical as number,
                                },
                                theoreticalHourPrice: data[permis].prices
                                    ?.theoretical as number,
                                practicalHourPrice: data[permis].prices
                                    ?.practical as number,
                                vehicles: {
                                    create: data[permis].vehicles?.map(
                                        (vehicle) => ({
                                            brand: vehicle.brand as string,
                                            model: vehicle.model as number,
                                        })
                                    ),
                                },
                            })),
                    },
                },
            }),
        ]);
        revalidatePath(`${locale}/ecoles`);
        return { success: "لقد تمت العملية بنجاح" };
    } catch (error) {
        console.log(error);
        return {
            error: "لقد فشلت المهمة",
        };
    }
}

export async function deleteAutoEcole(id: number, locale: string) {
    try {
        await db.autoEcole.delete({
            where: {
                id,
            },
        });
        revalidatePath(`${locale}/ecoles`);
    } catch (error) {
        console.log(error);
    }
}
