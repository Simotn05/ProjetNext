"use client"
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { Trash2 } from "react-feather";

type Props = {
    id: number;
};

export default function Actions({ id }: Props) {
    const locale = useLocale();
    const router = useRouter();

    const handleDelete = async () => {
        // Afficher une boîte de dialogue de confirmation avant de procéder à la suppression
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette demande de partenariat ?');

        if (confirmed) {
            try {
                await deletePartnershipRequest(id); // Appel à la fonction appropriée
                toast("La demande de partenariat a été supprimée avec succès.");
                router.refresh(); // Rafraîchir la page après suppression
            } catch (error) {
                toast("Échec de la suppression : veuillez réessayer.");
            }
        }
    };

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
                    onClick={handleDelete}
                >
                    <Trash2 className="mr-2 h-4 w-4" />Supprimer
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}