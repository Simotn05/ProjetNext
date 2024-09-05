import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Trouver le commercial avec ses régions et les écoles associées à ces régions
    const commercial = await prisma.commercial.findUnique({
      where: { id: parseInt(params.id, 10) },
      include: {
        regions: {
          include: {
            region: {
              include: {
                ecoles: true, // Inclure les écoles associées à chaque région
              },
            },
          },
        },
      },
    });

    //console.log("Données du commercial :", commercial); // Vérifiez les données du commercial dans le log

    if (!commercial) {
      return NextResponse.json({ error: 'Commercial non trouvé' }, { status: 404 });
    }

    // Extraire les écoles des régions
    const ecoles = commercial.regions.flatMap(region => region.region.ecoles);

   // console.log("Ecoles extraites :", ecoles); // Vérifiez les écoles extraites dans le log

    return NextResponse.json({ ecoles });
  } catch (error) {
    console.error("Erreur lors de la récupération des informations du commercial :", error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des informations du commercial' }, { status: 500 });
  }
}
