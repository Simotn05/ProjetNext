import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { commercialId: string } }) {
  const { commercialId } = params;

  if (!commercialId || isNaN(Number(commercialId))) {
    return NextResponse.json({ error: 'ID invalide fourni' }, { status: 400 });
  }

  try {
    // Récupérer les informations du commercial avec les clients et les régions associées
    const stats = await prisma.commercial.findUnique({
      where: { id: parseInt(commercialId) },
      include: {
        clients: {
          include: {
            ecole: true, // Inclure les informations de l'école pour chaque étudiant
          },
        },
        regions: true, // Inclure les régions associées au commercial
      },
    });

    if (!stats) {
      return NextResponse.json({ error: 'Commercial non trouvé' }, { status: 404 });
    }

    // Calcul des statistiques des étudiants par école
    const studentsByEcole = stats.clients.reduce((acc: { ecoleName: string; count: number }[], student) => {
      const ecoleName = student.ecole?.name || 'Sans École';
      const existing = acc.find((item) => item.ecoleName === ecoleName);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ ecoleName, count: 1 });
      }
      return acc;
    }, []);

    const studentsCount = stats.clients.length;
    const regionsCount = stats.regions.length; // Nombre de régions associées au commercial

    return NextResponse.json({ studentsCount, studentsByEcole, regionsCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des statistiques' }, { status: 500 });
  }
}
