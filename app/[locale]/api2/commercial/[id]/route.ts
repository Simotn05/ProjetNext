import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assurez-vous que Prisma est configuré correctement

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const commercial = await prisma.commercial.findUnique({
      where: { id: parseInt(params.id, 10) }, // Assurez-vous que l'ID est bien un nombre
    });

    if (!commercial) {
      return NextResponse.json({ error: 'commercial non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ commercial });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des informations commercial' }, { status: 500 });
  }
}