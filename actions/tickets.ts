"use server";

import { db } from "@/lib/db";
import { newClientSchema } from "@/schemas/new-client";
import { revalidatePath } from "next/cache";

export async function addTicket(formData: FormData) {
    const entries = Object.fromEntries(formData);

    if (!newClientSchema.isValidSync(entries)) return null;

    const data = newClientSchema.validateSync(entries);

    await db.ticket.create({ data });
}

export async function deleteTicket(id: number) {
    await db.ticket.delete({
        where: {
            id,
        },
    });
    revalidatePath("/tickets");
}

export async function completeTicket(id: number) {
    await db.ticket.update({
        where: {
            id,
        },
        data: {
            status: "completed",
        },
    });
    revalidatePath("/tickets");
}
