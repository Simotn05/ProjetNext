import Logo from "@/components/logo";
import LocaleSwitcher from "@/components/ui/locale-switcher";

export default function Header() {
    return (
        <header className="px-4 py-2 sticky top-0 inset-x-0 bg-background z-40 shadow-sm">
            <div className="container">
                <div className="flex items-center gap-4 justify-between">
                    <Logo />

                    <LocaleSwitcher />
                </div>
            </div>
        </header>
    );
}
