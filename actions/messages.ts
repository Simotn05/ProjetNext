"use server";

import { db } from "@/lib/db";
import { contactUsSchema } from "@/schemas/contact-us";

export async function addMessage(formData: FormData) {
    const entries = Object.fromEntries(formData);

    if (!contactUsSchema.isValidSync(entries)) return null;

    const data = contactUsSchema.validateSync(entries);

    await db.message.create({
        data,
    });
}
