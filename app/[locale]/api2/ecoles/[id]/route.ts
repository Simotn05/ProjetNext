import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const commercial = await prisma.commercial.findUnique({
      where: { id: parseInt(params.id, 10) },
      include: {
        regions: {
          include: {
            region: {
              include: {
                ecoles: true, 
              },
            },
          },
        },
      },
    });


    if (!commercial) {
      return NextResponse.json({ error: 'Commercial non trouvé' }, { status: 404 });
    }

    const ecoles = commercial.regions.flatMap(region => region.region.ecoles);


    return NextResponse.json({ ecoles });
  } catch (error) {
    console.error("Erreur lors de la récupération des informations du commercial :", error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des informations du commercial' }, { status: 500 });
  }
}
