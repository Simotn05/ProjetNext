// pages/api3/ecole/profile/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    const ecole = await prisma.ecole.findUnique({
      where: { id },
      include: {
        students: true,
        vehiclesPerType: true,
        licenseTypes: true,
      },
    });

    if (!ecole) {
      return NextResponse.json({ error: 'Auto-école non trouvée' }, { status: 404 });
    }

    return NextResponse.json(ecole, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'auto-école:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
