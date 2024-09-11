import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // Assurez-vous que le chemin d'importation est correct

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const schoolId = searchParams.get('schoolId');

  if (!schoolId) {
    return NextResponse.json({ error: 'L\'ID de l\'école est requis' }, { status: 400 });
  }

  try {
    const schoolIdNumber = Number(schoolId);
    console.log(`Recherche des commerciaux pour l'école ID: ${schoolIdNumber}`);

    // Récupérer l'ID de la région associée à l'école
    const school = await prisma.ecole.findUnique({
      where: {
        id: schoolIdNumber,
      },
      select: {
        regionId: true,
      },
    });

    if (!school || !school.regionId) {
      return NextResponse.json({ error: 'École ou région non trouvée' }, { status: 404 });
    }

    console.log(`ID de la région associée à l'école: ${school.regionId}`);

    // Requête pour trouver les commerciaux associés à la région
    const commercials = await prisma.commercial.findMany({
      where: {
        regions: {
          some: {
            regionId: school.regionId,
          },
        },
      },
    });

    console.log('Commerciaux trouvés:', commercials);
    return NextResponse.json({ commercials });
  } catch (error) {
    console.error('Erreur lors de la récupération des commerciaux:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des commerciaux' }, { status: 500 });
  }
}
