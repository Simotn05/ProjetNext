import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const etudiant = await prisma.etudiant.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!etudiant) {
      return NextResponse.json({ error: 'Étudiant non trouvé' }, { status: 404 });
    }

    return NextResponse.json(etudiant);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'étudiant :', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération de l\'étudiant' }, { status: 500 });
  }
}
