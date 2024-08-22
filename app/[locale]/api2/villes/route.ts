import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const regionId = parseInt(url.searchParams.get('regionId') || '0');

  try {
    if (!regionId) {
      return NextResponse.json({ error: 'Region ID manquant' }, { status: 400 });
    }

    const villes = await prisma.ville.findMany({
      where: {
        regionId
      }
    });

    return NextResponse.json(villes);
  } catch (error) {
    console.error('Erreur lors de la récupération des villes:', error);
    return NextResponse.json({ error: 'Échec de la récupération des villes' }, { status: 500 });
  }
}
