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

import { deletePartnershipRequest, accepterPartnershipRequest, refuserPartnershipRequest 
} from "@/actions/partnershipRequests";
import { Edit, Delete, Trash2 } from "react-feather";

type Props = {
    id: number;
};

export default function Actions({ id }: Props) {
    const locale = useLocale();
    const router = useRouter();

    const handleDelete = async () => {
 
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette demande de partenariat ?');

        if (confirmed) {
            try {
                await deletePartnershipRequest(id); 
                toast("La demande de partenariat a été supprimée avec succès.");
                router.refresh();
            } catch (error) {
                toast("Échec de la suppression : veuillez réessayer.");
            }
        }
    };

    const handleAcceptation = async () => {
            try {
                await accepterPartnershipRequest(id); 
                toast("La demande de partenariat a été acceptée avec succès.");
                router.refresh(); 
                router.push("/add-ecole"); 
            } catch (error) {
                toast("Échec de la suppression : veuillez réessayer.");
            }
    };

    const handleRefus = async () => {
            try {
                await refuserPartnershipRequest(id); 
                toast("La demande de partenariat a été refusée avec succès.");
                router.refresh(); 
            } catch (error) {
                toast("Échec de la suppression : veuillez réessayer.");
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

                <DropdownMenuItem className="text-black-500 cursor-pointer"
                    onClick={handleAcceptation}
                > 
                     <Edit className="mr-2 h-4 w-4" /> Accepter
                </DropdownMenuItem>

                <DropdownMenuItem className="text-black-500 cursor-pointer"
                    onClick={handleRefus}
                > 
                     <Delete className="mr-2 h-4 w-4" /> Refuser
                </DropdownMenuItem>

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