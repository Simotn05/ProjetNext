import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      orderBy:{
        id:"asc"
      }
    });
    return NextResponse.json(regions);
  } catch (error) {
    console.error('Erreur lors de la récupération des régions:', error);
    return NextResponse.json({ error: 'Échec de la récupération des régions' }, { status: 500 });
  }
}
