import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assurez-vous que Prisma est configuré correctement

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.etudiant.findUnique({
      where: { id: parseInt(params.id, 10) }, // Assurez-vous que l'ID est bien un nombre
      include: { ville: true } // Inclure les informations sur la ville
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des informations utilisateur' }, { status: 500 });
  }
}
