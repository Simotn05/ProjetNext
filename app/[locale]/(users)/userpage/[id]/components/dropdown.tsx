import { FaUserCircle } from "react-icons/fa"; 
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export default function Dropdown() {
    const locale = useLocale();
    const router = useRouter();
   
    const handleLogout = async () => {
        try {
          const res = await fetch('/api2/signout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
    
          if (res.ok) {
            router.push('/connexion');
          } else {
            const result = await res.json();
            setError(result.message || 'Une erreur est survenue lors de la déconnexion.');
          }
        } catch (err) {
          setError('Impossible de se déconnecter. Veuillez vérifier votre connexion Internet.');
        }
      };
    
    return (
        <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <FaUserCircle className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form action={handleLogout}>
                        <button type="submit" className="w-full text-start">
                            Se déconnecter
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
function setError(arg0: any) {
    throw new Error("Function not implemented.");
}

