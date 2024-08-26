// fichier: app/api3/list-commercial/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assurez-vous que le chemin est correct

export async function GET(request: NextRequest) {
  try {
    // Récupérer les commerciaux depuis la base de données
    const commercials = await prisma.commercial.findMany({
      include: { // Inclure les relations si nécessaire
        regions: true,
      },
    });

    // Répondre avec les commerciaux récupérés
    return NextResponse.json({ commercials });
  } catch (error) {
    console.error('Erreur lors de la récupération des commerciaux:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des commerciaux' }, { status: 500 });
  }
}
