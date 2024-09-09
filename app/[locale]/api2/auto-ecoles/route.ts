import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const commercialId = parseInt(url.searchParams.get('commercialId') || '');
    const etudiantId = parseInt(url.searchParams.get('etudiantId') || '');

    if (isNaN(commercialId) || isNaN(etudiantId)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const etudiant = await prisma.etudiant.findUnique({
      where: { id: etudiantId },
      select: {
        villeId: true,
        regionId: true,
        drivingLicenseType: true,
      },
    });

    if (!etudiant) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const { villeId, regionId, drivingLicenseType } = etudiant;

    console.log('Étudiant trouvé:', { villeId, regionId, drivingLicenseType });

    const regionsCommercial = await prisma.commercialRegion.findMany({
      where: { commercialId },
      select: { regionId: true },
    });

    const regionIds = regionsCommercial.map(r => r.regionId);

    console.log('Region IDs du commercial:', regionIds);

    const ville = await prisma.ville.findUnique({
      where: { id: villeId },
      select: { name: true },
    });

    if (!ville) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    console.log('Ville trouvée:', ville.name);

    const ecolesDansRegion = await prisma.ecole.findMany({
      where: {
        regionId: {
          in: regionIds,
        },
        city: {
          equals: ville.name,
        },
        licenseTypes: {
          some: {
            name: drivingLicenseType,
          },
        },
      },
      include: {
        licenseTypes: true,  // Inclure les types de permis pour vérification
      },
    });

    console.log('Écoles trouvées:', ecolesDansRegion);

    return NextResponse.json(ecolesDansRegion);
  } catch (error) {
    console.error('Error fetching auto-écoles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
