import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assurez-vous que le chemin d'importation est correct

export async function DELETE(req: Request) {
  try {
    // Extraire les segments de l'URL
    const url = new URL(req.url);
    const segments = url.pathname.split('/');
    const studentId = segments[segments.length - 2]; // Dernier segment avant 'suppression'

    // Vérifiez que l'ID est présent et valide
    if (!studentId || isNaN(Number(studentId))) {
      return NextResponse.json({ error: 'ID de l\'étudiant invalide.' }, { status: 400 });
    }

    // Convertir l'ID en nombre
    const studentIdNumber = parseInt(studentId, 10);

    // Dissocier l'étudiant de l'école et réinitialiser seancesPratique
    await prisma.etudiant.update({
      where: { id: studentIdNumber },
      data: {
        ecole: { disconnect: true }, // Dissocie l'étudiant de l'école
        seancesPratique: 0 // Réinitialise seancesPratique à 0
      },
    });

    return NextResponse.json({ message: 'Étudiant dissocié de l\'école et seancesPratique réinitialisé avec succès.' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la dissociation de l\'étudiant:', error);
    return NextResponse.json({ error: 'Erreur lors de la dissociation de l\'étudiant.' }, { status: 500 });
  }
}
