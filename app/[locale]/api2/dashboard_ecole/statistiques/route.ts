// app/api/statistiques/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Récupération de l'ID de l'école depuis les headers
    const headers = request.headers;
    const schoolId = headers.get('school-id');

    if (!schoolId) {
      return NextResponse.json({ error: 'ID de l\'école non fourni' }, { status: 400 });
    }

    const id = parseInt(schoolId, 10);

    // Nombre total d'étudiants dans l'école connectée
    const studentsCount = await prisma.etudiant.count({
      where: { ecoleId: id },
    });

    // Types de permis des étudiants dans l'école connectée
    const licenseTypes = await prisma.etudiant.groupBy({
      by: ['drivingLicenseType'],
      where: { ecoleId: id },
      _count: {
        id: true,
      },
    });

    // Commerciaux associés à l'école connectée
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

    // Formatage des résultats pour la réponse
    const formattedLicenseTypes = licenseTypes.map((item) => ({
      licenseType: item.drivingLicenseType || 'Inconnu',
      count: item._count.id,
    }));

    return NextResponse.json({
      studentsCount,
      licenseTypes: formattedLicenseTypes,
      commercialsCount, // Nombre total de commerciaux associés
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des statistiques' }, { status: 500 });
  }
}
