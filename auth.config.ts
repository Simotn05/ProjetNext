import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { loginSchema } from "@/schemas/auth";
import { db } from "@/lib/db";

export default {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!loginSchema.isValidSync(credentials)) {
                    return null;
                }

                const { email, password } = loginSchema.validateSync(credentials);

                const user = await db.user.findUnique({ where: { email } });

                if (!user) return null;

                const { password: hashedPassword, ...rest } = user;

                if (!bcrypt.compareSync(password, hashedPassword)) return null;

                return {
                    name: "Ahmed",
                    email: "ahmed@gmail.com",
                };
            },
        }),
    ],
} satisfies NextAuthConfig;
