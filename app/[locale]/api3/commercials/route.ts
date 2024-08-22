// pages/api/commercials.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const { name, email, password, phoneNumber, regionId } = await request.json();

  // Validation des champs
  if (!name || !email || !password || !phoneNumber || !regionId) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
  }

  // Validation du numéro de téléphone
  const phoneRegex = /^(06|07)\d{8}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return NextResponse.json({
      error: 'Le numéro de téléphone doit être au format 06XXXXXXXX ou 07XXXXXXXX.',
    }, { status: 400 });
  }

  // Validation de la force du mot de passe
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return NextResponse.json({
      error: 'Le mot de passe doit comporter au moins 8 caractères, inclure des lettres majuscules et minuscules, et contenir au moins un chiffre.',
    }, { status: 400 });
  }

  try {
    // Hachage du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newCommercial = await prisma.commercial.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber, // Assurez-vous que ce champ existe dans votre modèle Prisma
        regionId,
      },
    });

    return NextResponse.json(newCommercial, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du commercial:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du commercial' }, { status: 500 });
  }
}
