import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { etudiantId, ecoleId } = body;

    const etudiantIdInt = parseInt(etudiantId, 10);
    const ecoleIdInt = parseInt(ecoleId, 10);

    if (isNaN(etudiantIdInt) || isNaN(ecoleIdInt)) {
      return NextResponse.json({ error: 'Etudiant ID et Ecole ID doivent être des entiers.' }, { status: 400 });
    }

    const etudiant = await prisma.etudiant.findUnique({
      where: { id: etudiantIdInt },
    });

    if (!etudiant) {
      return NextResponse.json({ error: 'Étudiant non trouvé.' }, { status: 404 });
    }

    const ecole = await prisma.ecole.findUnique({
      where: { id: ecoleIdInt },
    });

    if (!ecole) {
      return NextResponse.json({ error: 'École non trouvée.' }, { status: 404 });
    }

    const updatedEtudiant = await prisma.etudiant.update({
      where: { id: etudiantIdInt },
      data: { ecoleId: ecoleIdInt },
    });

    return NextResponse.json({ message: 'École attribuée avec succès.', etudiant: updatedEtudiant });
  } catch (error) {
    console.error('Erreur lors de l\'attribution de l\'école:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}
