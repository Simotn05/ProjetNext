"use server"
import { db } from "@/lib/db";

export async function deletePartnershipRequest(id: number) {
    await db.partnershipRequest.delete({
        where: { id },
    });
}

export async function accepterPartnershipRequest(id: number) {
    await db.partnershipRequest.update({
        where: { id },
        data: { status: "Accepté" }
    });
}

export async function  refuserPartnershipRequest(id: number) {
    await db.partnershipRequest.update({
        where: { id },
        data: { status: "Refusé" }
    });
}