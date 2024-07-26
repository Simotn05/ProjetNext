"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteComplain(id: number) {
    await db.message.delete({
        where: {
            id,
        },
    });
    revalidatePath("/complains");
}