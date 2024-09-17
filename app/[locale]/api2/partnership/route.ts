// app/api/partnership/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validation (Vous pouvez ajouter des validations plus robustes ici)
    if (!data.schoolName || !data.email || !data.phone || !data.message) {
      return NextResponse.json({ message: 'Tous les champs sont requis.' }, { status: 400 });
    }
    
    const phoneRegex = /^(05|06|07|08)\d{8}$/;
    if (!phoneRegex.test(data.phone)) {
      return NextResponse.json({
        message: 'Le numéro de téléphone doit être au format 05xxxxxxxx/06xxxxxxxx/07xxxxxxxx/08xxxxxxxx.',
      }, { status: 400 });
    }
    // Création de la demande dans la base de données
    await prisma.partnershipRequest.create({
      data: {
        schoolName: data.schoolName,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
    });

    return NextResponse.json({ message: 'Votre demande a été envoyée avec succès !' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Une erreur s\'est produite. Veuillez réessayer.' }, { status: 500 });
  }
}