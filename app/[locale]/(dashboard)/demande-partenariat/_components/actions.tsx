"use client";

import { useLocale } from "next-intl";
import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePartnershipRequest } from "@/actions/partnershipRequests"; // Modifiez selon le chemin réel

type Props = {
    id: number;
};

export default function Actions({ id }: Props) {
    const locale = useLocale();

    return (
        <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={async () => {
                        try {
                            await deletePartnershipRequest(id); // Appel à la fonction appropriée
                            toast("La demande de partenariat a été supprimée avec succès.");
                        } catch (error) {
                            toast("Échec de la suppression : veuillez réessayer.");
                        }
                    }}
                >
                    Supprimer la demande
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}