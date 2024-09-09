import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const commercial = await prisma.commercial.findUnique({
      where: { id: parseInt(params.id, 10) },
      include: {
        clients: {
          include: {
            ville: true, // Inclure la ville des étudiants
            ecole: true, // Inclure l'auto-école des étudiants
          },
        },
        regions: true, // Inclure les régions du commercial
      },
    });

    if (!commercial) {
      return NextResponse.json({ error: 'Commercial non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ commercial });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des informations du commercial' }, { status: 500 });
  }
}
