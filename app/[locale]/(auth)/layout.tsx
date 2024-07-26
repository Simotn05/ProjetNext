import React from "react";
import Logo from "@/components/logo";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center p-4 flex-col gap-6">
            <Logo />
            {children}
        </main>
    );
}
