import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const headers = request.headers;
    const schoolId = headers.get('school-id');

    if (!schoolId) {
      return NextResponse.json({ error: 'ID de l\'école non fourni' }, { status: 400 });
    }

    const id = parseInt(schoolId, 10);

    const studentsCount = await prisma.etudiant.count({
      where: { ecoleId: id },
    });

    const licenseTypes = await prisma.etudiant.groupBy({
      by: ['drivingLicenseType'],
      where: { ecoleId: id },
      _count: {
        id: true,
      },
    });

    const commercialsCount = await prisma.commercial.count({
      where: {
        regions: {
          some: {
            region: {
              ecoles: {
                some: {
                  id: id,
                },
              },
            },
          },
        },
      },
    });

    const formattedLicenseTypes = licenseTypes.map((item) => ({
      licenseType: item.drivingLicenseType || 'Inconnu',
      count: item._count.id,
    }));

    return NextResponse.json({
      studentsCount,
      licenseTypes: formattedLicenseTypes,
      commercialsCount, 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des statistiques' }, { status: 500 });
  }
}
