import { useLocale, useTranslations } from "next-intl";

import ContactUsForm from "@/components/forms/contact-us";

import { cn } from "@/lib/utils";
// import { supportImg } from "@/assets/images";

export default function ContactUsSection() {
    const t = useTranslations("HomePage.ContactSection");
    const locale = useLocale();

    return (
        <section>
            <div className="container">
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                    <div className="grow md:w-1/2">
                        <h2 className="mb-6 text-2xl font-bold">
                            {t("title")}
                        </h2>
                        <p className="mb-6 max-w-md text-balance">
                            {t("desc")}
                        </p>
                        <p className="mb-2 max-w-md text-balance">
                            {t("address")}
                        </p>
                        <p
                            className={cn("mb-2", {
                                "text-right": locale === "ar",
                            })}
                            dir="ltr"
                        >
                            {t("phone")}
                        </p>
                        <p>{t("mail")}</p>
                    </div>

                    {/* <div className="grow md:w-1/2">
                        <Image
                            src={supportImg}
                            width={475}
                            height={392.49}
                            alt="Contact Image"
                            className={cn("w-full md:max-w-lg md:ms-auto", {
                                "-scale-x-100 md:scale-x-100": locale === "ar",
                                "md:-scale-x-100": locale !== "ar"
                            })}
                        />
                    </div> */}

                    <ContactUsForm />
                </div>
            </div>
        </section>
    );
}
