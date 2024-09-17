import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log('Params reçus :', params); // Affiche les paramètres reçus pour le débogage

  const etudiantId = Number(params.id); // Utilisez `params.id` pour récupérer l'ID

  if (isNaN(etudiantId) || etudiantId <= 0) {
    console.error('ID de l\'étudiant invalide :', etudiantId);
    return NextResponse.json({ error: 'ID de l\'étudiant invalide' }, { status: 400 });
  }

  try {
    const etudiant = await prisma.etudiant.findUnique({
      where: { id: etudiantId },
      include: {
        region: true,
        ville: true,
        ecole: true,
      },
    });

    if (!etudiant) {
      return NextResponse.json({ error: 'Étudiant non trouvé' }, { status: 404 });
    }

    return NextResponse.json(etudiant, { status: 200 });

  } catch (error: any) {
    console.error('Erreur serveur lors de la récupération de l\'étudiant:', error.message);
    return NextResponse.json({ error: 'Erreur lors de la récupération des informations de l\'étudiant' }, { status: 500 });
  }
}
