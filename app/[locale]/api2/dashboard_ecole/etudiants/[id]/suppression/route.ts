import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const segments = url.pathname.split('/');
    const studentId = segments[segments.length - 2]; 

    if (!studentId || isNaN(Number(studentId))) {
      return NextResponse.json({ error: 'ID de l\'étudiant invalide.' }, { status: 400 });
    }

    const studentIdNumber = parseInt(studentId, 10);

    await prisma.etudiant.update({
      where: { id: studentIdNumber },
      data: {
        ecole: { disconnect: true }, 
        seancesPratique: 0 
      },
    });

    return NextResponse.json({ message: 'Étudiant dissocié de l\'école et seancesPratique réinitialisé avec succès.' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la dissociation de l\'étudiant:', error);
    return NextResponse.json({ error: 'Erreur lors de la dissociation de l\'étudiant.' }, { status: 500 });
  }
}
