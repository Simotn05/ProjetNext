import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { commercialId: string } }) {
  const { commercialId } = params;

  if (!commercialId || isNaN(Number(commercialId))) {
    return NextResponse.json({ error: 'ID invalide fourni' }, { status: 400 });
  }

  try {
    const stats = await prisma.commercial.findUnique({
      where: { id: parseInt(commercialId) },
      include: {
        clients: {
          include: {
            ecole: true,
          },
        },
        regions: true, 
      },
    });

    if (!stats) {
      return NextResponse.json({ error: 'Commercial non trouvé' }, { status: 404 });
    }

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
    const regionsCount = stats.regions.length; 

    return NextResponse.json({ studentsCount, studentsByEcole, regionsCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des statistiques' }, { status: 500 });
  }
}
