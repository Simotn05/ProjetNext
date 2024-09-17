// // app/api/update-password/[id]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import bcrypt from 'bcryptjs';

// // Fonction de validation du mot de passe avec expression régulière
// const validatePassword = (password: string) => {
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//   return passwordRegex.test(password);
// };

// export async function PUT(request: NextRequest) {
//   const { oldPassword, newPassword } = await request.json();

//   // Récupération de l'ID depuis le paramètre d'URL
//   const id = request.nextUrl.pathname.split('/')[3];

//   if (!validatePassword(newPassword)) {
//     return NextResponse.json({
//       error: 'Le mot de passe doit comporter au moins 8 caractères, inclure des lettres majuscules et minuscules, et contenir au moins un chiffre.',
//     }, { status: 400 });
//   }

//   const user = await prisma.etudiant.findUnique({
//     where: { id: Number(id) },
//   });

//   if (!user || !bcrypt.compareSync(oldPassword, user.password)) {
//     return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 400 });
//   }

//   const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

//   await prisma.etudiant.update({
//     where: { id: Number(id) },
//     data: { password: hashedNewPassword },
//   });

//   return NextResponse.json({ message: 'Mot de passe mis à jour avec succès' });
// }
