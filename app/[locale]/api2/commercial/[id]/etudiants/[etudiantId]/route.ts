import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Extraction des params depuis l'URL
export async function GET(request: Request, { params }: { params: { id: string, etudiantId: string } }) {
  try {
    const etudiantId = parseInt(params.etudiantId); // Récupération de l'ID de l'étudiant depuis params

    if (isNaN(etudiantId)) {
      return NextResponse.json({ error: 'Invalid student ID' }, { status: 400 });
    }

    // Recherche de l'étudiant dans la base de données
    const etudiant = await prisma.etudiant.findUnique({
      where: { id: etudiantId },
      select: {
        id: true,
        username: true,
        email: true,
        number: true,
        birthdate: true,
        drivingLicenseType: true,
        region: { select: { name: true } },
        ville: { select: { name: true } },
      }
    });

    if (!etudiant) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(etudiant);
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
