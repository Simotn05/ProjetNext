// app/api2/commercial/[id]/etudiants/[etudiantId]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const etudiantId = parseInt(url.pathname.split('/')[4]); // Assurez-vous que l'extraction de l'ID est correcte

    if (isNaN(etudiantId)) {
      return NextResponse.json({ error: 'Invalid student ID' }, { status: 400 });
    }

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
        ville: { select: { name: true } }
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
