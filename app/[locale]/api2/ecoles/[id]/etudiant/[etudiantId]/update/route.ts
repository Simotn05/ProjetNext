// app/[locale]/api2/ecoles/[id]/etudiant/[etudiantId]/update/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assurez-vous que ce chemin est correct

// Méthode PUT pour mettre à jour les informations de l'étudiant
export async function PUT(req: NextRequest, { params }: { params: { id: string, etudiantId: string } }) {
  const { id, etudiantId } = params;

  console.log('Params reçus :', params); // Debugging
  
  if (isNaN(Number(etudiantId))) {
    return NextResponse.json({ error: 'ID de l\'étudiant invalide' }, { status: 400 });
  }

  const { seancesPratique } = await req.json();
  
  try {
    // Récupérer les informations actuelles de l'étudiant
    const currentStudent = await prisma.etudiant.findUnique({
      where: {
        id: Number(etudiantId),
      },
    });

    if (!currentStudent) {
      return NextResponse.json({ error: 'Étudiant non trouvé' }, { status: 404 });
    }

    // Vérifier si le nouveau nombre de séances est supérieur à l'ancien nombre
    if (Number(seancesPratique) < currentStudent.seancesPratique) {
      return NextResponse.json({ error: 'Le nombre de séances de pratique doit être supérieur à l\'ancien nombre' }, { status: 400 });
    }

    // Mettre à jour les informations de l'étudiant
    const updatedStudent = await prisma.etudiant.update({
      where: {
        id: Number(etudiantId),
      },
      data: {
        seancesPratique: Number(seancesPratique),
      },
    });

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'étudiant :', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de l\'étudiant' }, { status: 500 });
  }
}
