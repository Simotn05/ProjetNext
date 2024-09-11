import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; 

export async function GET(request: Request) {
  try {
    const schoolId = request.headers.get('school-id');

    if (!schoolId) {
      return NextResponse.json({ error: 'École ID manquant' }, { status: 400 });
    }

    const students = await prisma.etudiant.findMany({
      where: {
        ecoleId: Number(schoolId),
      },
      include: {
        ville: true,
      },
    });

    return NextResponse.json({ students });
  } catch (error) {
    console.error('Erreur lors de la récupération des étudiants:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des étudiants' }, { status: 500 });
  }
}
