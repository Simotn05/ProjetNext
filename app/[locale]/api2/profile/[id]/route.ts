// app/[locale]/api2/profile/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await prisma.etudiant.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        ville: {
          include: {
            region: true, // Inclure la région associée à la ville
          },
        },
        commercial: true, // Inclure le commercial associé
      },
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
