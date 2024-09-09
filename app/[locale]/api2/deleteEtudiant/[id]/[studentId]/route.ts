import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: { id: string, studentId: string } }) {
  const commercialId = parseInt(params.id, 10);
  const studentId = parseInt(params.studentId, 10);

  if (isNaN(commercialId) || isNaN(studentId)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    // Exemple de suppression d'un étudiant dans la base de données
    await prisma.etudiant.delete({
      where: { id: studentId },
    });

    return NextResponse.json({ message: 'Étudiant supprimé avec succès' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression de l\'étudiant' }, { status: 500 });
  }
}
