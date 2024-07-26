import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const primary = Tajawal({
    subsets: ["latin"],
    weight: ["400", "500", "700", "800", "900"],
});

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const t = await getTranslations("Layout.Metadata");

    return {
        metadataBase: new URL(process.env.BASE_URL as string),
        title: {
            default: t("title"),
            template: "MonAutoEcole - %s",
        },
        description: t("desc"),
        openGraph: {
            images: [
                {
                    url: `opengraph-${locale}.png`,
                    width: 1920,
                    height: 1080,
                    alt: t("title"),
                },
            ],
        },
    };
}
export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const messages = await getMessages();

    return (
        <html
            lang={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            // className="dark"
            suppressHydrationWarning
        >
            <body className={cn("overflow-x-hidden", primary.className)}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                    <div className="fixed bottom-0 start-0">
                        <Toaster />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
