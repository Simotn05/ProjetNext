import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const { name, email, password, phoneNumber, regionIds } = await request.json();

  if (!name || !email || !password || !phoneNumber || !regionIds || regionIds.length === 0) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
  }

  const phoneRegex = /^(06|07)\d{8}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return NextResponse.json({
      error: 'Le numéro de téléphone doit être au format 06XXXXXXXX ou 07XXXXXXXX.',
    }, { status: 400 });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return NextResponse.json({
      error: 'Le mot de passe doit comporter au moins 8 caractères, inclure des lettres majuscules et minuscules, et contenir au moins un chiffre.',
    }, { status: 400 });
  }

  try {
    const existingEtudiant = await prisma.etudiant.findUnique({
      where: { email },
    });

    const existingCommercial = await prisma.commercial.findUnique({
      where: { email },
    });

    const existingAutoEcole = await prisma.ecole.findUnique({
      where: { email },
    });

    if (existingEtudiant || existingCommercial || existingAutoEcole) {
      return NextResponse.json({
        error: 'Cet email est déjà utilisé.',
      }, { status: 400 });
      
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newCommercial = await prisma.commercial.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        regions: {
          create: regionIds.map((regionId: number) => ({
            region: {
              connect: { id: regionId },
            },
          })),
        },
      },
      include: { regions: true }, 
    });

    for (const regionId of regionIds) {
      const etudiantsSansCommercial = await prisma.etudiant.findMany({
        where: {
          regionId,
          commercialId: null, 
        },
      });

      for (const etudiant of etudiantsSansCommercial) {
        await prisma.etudiant.update({
          where: { id: etudiant.id },
          data: {
            commercialId: newCommercial.id, 
          },
        });
      }
    }

    return NextResponse.json(newCommercial, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du commercial:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du commercial' }, { status: 500 });
  }
}