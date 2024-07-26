import {
    Gauge,
    ShieldCheck,
    Users,
    Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function Features() {
    const t = useTranslations("HomePage.HeroSection.Features");

    const features = [
        {
            icon: <Wallet />,
            title: t("pricing.title"),
            desc: t("pricing.desc"),
        },
        {
            icon: <ShieldCheck />,
            title: t("quality.title"),
            desc: t("quality.desc"),
        },
        {
            icon: <Gauge />,
            title: t("speed.title"),
            desc: t("speed.desc"),
        },
        {
            icon: <Users />,
            title: t("caring.title"),
            desc: t("caring.desc"),
        },
    ];

    return (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, i) => (
                <div
                    key={i}
                    className="p-6 bg-background rounded-lg shadow-sm border"
                >
                    <div className="rounded-md size-9 [&>svg]:size-full p-2 mb-4 bg-primary text-primary-foreground">
                        {feature.icon}
                    </div>
                    <h3 className="text-xl mb-[.35em] font-bold">
                        {feature.title}
                    </h3>
                    <p className="text-pretty">{feature.desc}</p>
                </div>
            ))}
        </div>
    );
}
