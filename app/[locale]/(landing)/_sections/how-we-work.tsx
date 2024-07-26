import { Car, MessageCircleMore, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HowWeWorkSection() {
    const t = useTranslations("HomePage.HowWeWorkSection");

    const steps = [
        {
            icon: <MessageCircleMore />,
            title: t("steps.sendTicket.title"),
            desc: t("steps.sendTicket.desc"),
        },
        {
            icon: <Phone />,
            title: t("steps.call.title"),
            desc: t("steps.call.desc"),
        },
        {
            icon: <Car />,
            title: t("steps.startLearning.title"),
            desc: t("steps.startLearning.desc"),
        },
    ];

    return (
        <section className="bg-primary">
            {/* <div className="absolute -z-10 -end-10 w-[50%] -rotate-6 inset-y-0 rounded-[50px] bg-primary/5" /> */}
            <div className="container">
                <div className="text-primary-foreground text-balance mb-12 text-center">
                    <h2 className="text-2xl font-bold mb-[.35em]">
                        {t("title")}
                    </h2>
                    <p className="text-medium">{t("desc")}</p>
                </div>

                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className="bg-background rounded-lg p-6 shadow-sm"
                        >
                            <div className="rounded-md size-9 [&>svg]:size-full p-2 mb-4 bg-primary text-primary-foreground">
                                {step.icon}
                            </div>
                            <h3 className="text-xl capitalize font-bold mb-[.35em]">
                                {step.title}
                            </h3>
                            <p className="text-pretty">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
