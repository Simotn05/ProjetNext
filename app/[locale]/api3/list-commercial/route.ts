import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const commercials = await prisma.commercial.findMany({
      include: {
        regions: {
          include: {
            region: true,
          },
        },
      },
    });

    const commercialDetails = commercials.map((commercial) => ({
      id: commercial.id,
      name: commercial.name,
      email: commercial.email,
      phoneNumber: commercial.phoneNumber,
      regions: commercial.regions.map((cr) => ({ name: cr.region.name })),
    }));

    return NextResponse.json({ commercials: commercialDetails });
  } catch (error) {
    console.error('Erreur lors de la récupération des commerciaux:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des commerciaux' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split('/').pop() || '');

    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const commercial = await prisma.commercial.findUnique({
      where: { id },
    });

    if (!commercial) {
      return NextResponse.json({ error: 'Commercial non trouvé' }, { status: 404 });
    }

    await prisma.commercial.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Commercial supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du commercial:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du commercial' }, { status: 500 });
  }
}
