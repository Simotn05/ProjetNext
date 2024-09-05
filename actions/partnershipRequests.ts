// actions/partnershipRequests.ts
"use server"
import { db } from "@/lib/db";

export async function deletePartnershipRequest(id: number) {
    await db.partnershipRequest.delete({
        where: { id },
    });
}