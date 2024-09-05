// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma'; // Assurez-vous que votre fichier prisma.ts exporte une instance de PrismaClient

// // GET /api3/license-types
// export async function GET() {
//   try {
//     const licenseTypes = await prisma.licenseType.findMany();
//     return NextResponse.json(licenseTypes);
//   } catch (error) {
//     return NextResponse.error();
//   }
// }

// // POST /api3/license-types
// export async function POST(request: Request) {
//   const { name } = await request.json();

//   try {
//     const newLicenseType = await prisma.licenseType.create({
//       data: {
//         name,
//       },
//     });
//     return NextResponse.json(newLicenseType);
//   } catch (error) {
//     return NextResponse.json({ error: 'Erreur lors de la création du type de permis' }, { status: 500 });
//   }
// }
