import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  // Assurez-vous que l'ID est fourni et valide
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    // Récupérez les données du commercial
    const commercial = await prisma.commercial.findUnique({
      where: { id: Number(id) },
      include: {
        clients: true, // Incluez les étudiants associés
      },
    });

    // Si le commercial n'existe pas, renvoyez une erreur
    if (!commercial) {
      return NextResponse.json({ error: 'Commercial not found' }, { status: 404 });
    }

    // Répondez avec les données du commercial
    return NextResponse.json({ commercial });
  } catch (error) {
    console.error('Error fetching commercial data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
