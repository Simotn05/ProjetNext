import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {

  try {
    const villes = await prisma.ville.findMany({
      orderBy: {
        name: 'asc' 
      }
    });

    return NextResponse.json(villes);
  } catch (error) {
    console.error('Erreur lors de la récupération des villes:', error);
    return NextResponse.json({ error: 'Échec de la récupération des villes' }, { status: 500 });
  }
}
