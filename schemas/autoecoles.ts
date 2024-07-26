import { object, array, string, number, boolean, ref } from "yup";
import { phoneRegex } from "@/regex";

export enum LangsEnum {
    ar = "ar",
    fr = "fr",
    en = "en",
    es = "es",
}

export enum PermisEnum {
    AM = "AM",
    A1 = "A1",
    A = "A",
    B = "B",
    C = "C",
    EC = "EC",
    ED = "ED",
    F = "F",
}

export enum TutorsSexEnum {
    men = "مدرب",
    women = "مدربة",
    both = "مدرب ومدربة",
}

const PermisSchema = object({
    status: boolean().required("المرجو تحديد توفُر هذه الرخصة"),

    vehicles: array()
        .optional()
        .when("status", {
            is: true,
            then: (vehicles) =>
                vehicles
                    .of(
                        object({
                            brand: string().trim().required("إسم الشركة ضروري"),
                            model: number()
                                .typeError("الموديل ضروري")
                                .required("الموديل ضروري"),
                        })
                    )
                    .min(1, "المرجو إضافة عربة واحدة على الأقل"),
        }),

    prices: object({
        training: object({
            min: number().optional(),
            max: number().optional(),
        }).optional(),
        theoretical: object({
            min: number().optional(),
            max: number().optional(),
        }).optional(),
        practical: object({
            min: number().optional(),
            max: number().optional(),
        }).optional(),
        repeated: object({
            min: number().optional(),
            max: number().optional(),
            numSeances: object({
                theoretical: number().optional(),
                practical: number().optional(),
            }),
        }).optional(),
    })
        .optional()
        .when("status", {
            is: true,
            then: (prices) =>
                prices.shape({
                    training: object({
                        min: number()
                            .typeError("المرجو إدخال السعر")
                            .required("المرجو إدخال السعر")
                            .positive(
                                "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                            ),
                        max: number()
                            .typeError("المرجو إدخال السعر")
                            .required("المرجو إدخال السعر")
                            .positive(
                                "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                            )
                            .moreThan(
                                ref("min"),
                                "لا يمكن لأعلى سعر أن يكون أقل من السعر الأقل"
                            ),
                    }),
                    theoretical: object({
                        min: number()
                            .typeError("المرجو إدخال السعر")
                            .required("المرجو إدخال السعر")
                            .positive(
                                "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                            ),
                        max: number()
                            .typeError("المرجو إدخال السعر")
                            .required("المرجو إدخال السعر")
                            .positive(
                                "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                            )
                            .moreThan(
                                ref("min"),
                                "لا يمكن لأعلى سعر أن يكون أقل من السعر الأقل"
                            ),
                    }),
                    practical: object({
                        min: number()
                            .typeError("المرجو إدخال السعر")
                            .required("المرجو إدخال السعر")
                            .positive(
                                "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                            ),
                        max: number()
                            .typeError("المرجو إدخال السعر")
                            .required("المرجو إدخال السعر")
                            .positive(
                                "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                            )
                            .moreThan(
                                ref("min"),
                                "لا يمكن لأعلى سعر أن يكون أقل من السعر الأقل"
                            ),
                    }),
                    repeated: object({
                        min: number()
                            .typeError("المرجو إدخال السعر")
                            .required("المرجو إدخال السعر")
                            .positive(
                                "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                            ),
                        max: number()
                            .typeError("المرجو إدخال السعر")
                            .required("المرجو إدخال السعر")
                            .positive(
                                "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                            )
                            .moreThan(
                                ref("min"),
                                "لا يمكن لأعلى سعر أن يكون أقل من السعر الأقل"
                            ),
                        numSeances: object({
                            practical: number()
                                .typeError("المرجوا إدخال عدد الحصص التطبيقية")
                                .required("المرجوا إدخال عدد الحصص التطبيقية")
                                .positive(
                                    "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                                ),
                            theoretical: number()
                                .typeError("المرجوا إدخال عدد الحصص التطبيقية")
                                .required("المرجوا إدخال عدد الحصص التطبيقية")
                                .positive(
                                    "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                                ),
                        }),
                    }),
                }),
        }),

    tutorsSex: object({
        theoretical: string().optional(),
        practical: string().optional(),
    })
        .optional()
        .when("status", {
            is: true,
            then: (tutorsSex) =>
                tutorsSex.shape({
                    theoretical: string()
                        .required("هذه الخانة ضرورية")
                        .oneOf(Object.values(TutorsSexEnum)),
                    practical: string()
                        .required("هذه الخانة ضرورية")
                        .oneOf(Object.values(TutorsSexEnum)),
                }),
        }),

    languages: object({
        theoretical: array().optional(),
        practical: array().optional(),
    })
        .optional()
        .when("status", {
            is: true,
            then: (languages) =>
                languages.shape({
                    theoretical: array()
                        .of(
                            string()
                                .oneOf(Object.values(LangsEnum))
                                .required("ضروري ملء هذه الخانة")
                        )
                        .min(1, "مطلوب إضافة لغة على الأقل"),
                    practical: array()
                        .of(
                            string()
                                .oneOf(Object.values(LangsEnum))
                                .required("ضروري ملء هذه الخانة")
                        )
                        .min(1, "مطلوب إضافة لغة على الأقل"),
                }),
        }),
});

export const AddNewAutoEcoleSchema = object({
    // * --------------- Basic Infos --------------- * //
    name: string().trim().required("إسم المؤسسة ضروري"),
    ownerName: string().trim().required("إسم المؤسسة ضروري"),
    city: string().trim().required("المرجوا إدخال المدينة"),
    address: string().trim().required("المرجوا إدخال العنوان"),
    phone: string()
        .trim()
        .required("المرجوا إدخال رقم هاتف صحيح")
        .matches(phoneRegex, "المرجوا إدخال رقم هاتف صحيح"),
    fix: string()
        .trim()
        .required("المرجوا إدخال رقم التابث صحيح")
        .matches(phoneRegex, "المرجوا إدخال رقم التابث صحيح"),
    registerNumber: number()
        .typeError("المرجوا إدخال رقم التسجيل")
        .required("المرجوا إدخال رقم التسجيل")
        .max(2147483647),
    businessDocNumber: number()
        .typeError("المرجوا إدخال رقم السجل التجاري")
        .required("المرجوا إدخال رقم السجل التجاري")
        .max(2147483647),

    // * --------------- Categories and Vehicles Infos --------------- * //
    [PermisEnum.A1]: PermisSchema,

    [PermisEnum.AM]: PermisSchema,

    [PermisEnum.A]: PermisSchema,

    [PermisEnum.B]: PermisSchema,

    [PermisEnum.C]: PermisSchema,

    [PermisEnum.EC]: PermisSchema,

    [PermisEnum.ED]: PermisSchema,

    [PermisEnum.F]: PermisSchema,

    // * --------------- Payment Convenience --------------- * //
    paymentConvenience: object({
        status: boolean().required(
            "المرجوا تحديد هل المؤسسة تقدم تسهيلات في عملية الدفع"
        ),
        number: number()
            .optional()
            .when("status", {
                is: true,
                then: (number) =>
                    number
                        .typeError("هذه الخانة ضرورية")
                        .required("هذه الخانة ضرورية")
                        .positive(
                            "لا يمكن لهذه القيمة أن تكون أصغر من أو يساوي صفر"
                        ),
            }),
    }),

    // * --------------- Features --------------- * //
    features: object({
        disabled: boolean().required(
            "المرجوا تحديد هل المؤسسة تقدم تعليم لدوي الإحتياجات الخاصة"
        ),
        outOfTownTraining: boolean().required(
            "المرجوا تحديد هل المؤسسة تقدم تدريب خارج المدينة"
        ),
        eveningSessions: boolean().required(
            "المرجوا تحديد هل المؤسسة تقدم حصص مسائية بعد السابعة مساءا"
        ),
        badWeatherTraining: boolean().required(
            "المرجوا تحديد هل المؤسسة تقدم حصص تدريب في أجواء صعبة"
        ),
        mechanicalPrinciplesTraining: boolean().required(
            "المرجوا تحديد هل المؤسسة تقدم تدريب في أساسيات الميكانيك"
        ),
        firstAidPrinciplesTraining: boolean().required(
            "المرجوا تحديد هل المؤسسة تقدم تدريب في أساسيات الإسعافات الأولية"
        ),
        trainingOnEmulator: boolean().required(
            "المرجوا تحديد هل المؤسسة تقدم تدريب على محاكي السياقة"
        ),
        theoreticalOnline: boolean().required(
            "المرجوا تحديد هل المؤسسة توفر دروس نظرية عبر الأنترنت"
        ),
        practicalOnlineBooking: boolean().required(
            "المرجوا تحديد هل المؤسسة توفر حجز الحصص تدريبية عبر الإنترنت"
        ),
        practicalPhoneBooking: boolean().required(
            "المرجوا تحديد هل المؤسسة توفر حجز الحصص تدريبية عبر الهاتف"
        ),
        documentPreparation: boolean().required(
            "المرجوا تحديد هل المؤسسة تقدم خدمة تجهيز ملف التشخيص"
        ),
    }),
}).test(
    "NO_PERMIS_SELECTED",
    "ضروري من إختيار رخصة واحدة على الأقل",
    (values, context) => {
        const isOnePermisSelected = Object.values(PermisEnum)
            .map((permis) => values[permis].status)
            .some((status) => status);

        if (isOnePermisSelected) {
            return true;
        }

        return context.createError({
            path: `${PermisEnum.AM}.status`,
        });
    }
);
