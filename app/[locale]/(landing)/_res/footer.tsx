import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("Layout.Footer");

    return (
        <footer className="p-4 bg-primary text-primary-foreground">
            <div className="container">
                <p className="text-center text-sm font-medium">
                    {t("copyright") + " "}
                    <a
                        href="https://j2hb.com"
                        target="_blank"
                        className="font-bold hover:underline"
                    >
                        J2HB
                    </a>
                </p>
            </div>
        </footer>
    );
}
