import { LogoImg } from "@/assets/brand";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
    return (
        <Link
            href="/"
            className={cn(
                "text-foreground block w-fit font-black text-xl lg:text-2xl text-center",
                className
            )}
        >
            {/* Mon<span className="text-primary">AutoEcole</span> */}
            <Image src={LogoImg} alt="Mon Auto Ecole Logo" className="w-24" />
        </Link>
    );
}
