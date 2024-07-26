import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.upsert({
        where: { email: "admin@j2hb.com" },
        update: {},
        create: {
            name: "Jalal El Amrani",
            email: "admin@j2hb.com",
            password: bcrypt.hashSync("Admin123@", 10),
        },
    });
    console.log(admin);
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
