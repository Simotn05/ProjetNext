import Image from "next/image";

import { useTranslations } from "next-intl";

import { drivingImg } from "@/assets/images";
import NewClientForm from "@/components/forms/new-client";
import Features from "../_res/features";


export default function HeroSection() {
    const t = useTranslations("HomePage.HeroSection");

    return (
        <section className="relative py-12 md:pt-12 lg:pt-12">
            <div className="size-[90%] max-w-[1300px] rotate-6 max-h-[1000px] absolute -top-[160px] -start-[60px] rounded-[50px] -z-10 bg-gradient-to-tr to-background from-muted/10" />
            <div className="container">
                <div className="space-y-12">
                    <div className="flex flex-col gap-6 md:flex-row-reverse md:items-center ">
                        <div className="w-full md:w-1/2">
                            <Image
                                src={drivingImg}
                                width={484}
                                height={445.34}
                                alt="Driver Drive a car and teaching a student"
                                className="w-full md:max-w-lg ms-auto block"
                            />
                        </div>

                        <div className="text-center md:text-start md:w-1/2">
                            <h1 className="text-2xl mb-[.35em] font-extrabold text-balance md:text-3xl lg:text-4xl lg:leading-[1.2]">
                                {t("title")}
                            </h1>
                            <p className="md:text-lg max-w-3xl mx-auto font-medium text-balance">
                                {t("desc")}
                            </p>
                        </div>
                    </div>

                    <NewClientForm />

                    <Features />
                </div>
            </div>
        </section>
    );
}
