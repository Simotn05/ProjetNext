import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assurez-vous que le chemin est correct pour votre instance Prisma

// Fonction pour récupérer une auto-école spécifique par ID
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split('/').pop() || '', 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }
    
    const ecole = await prisma.ecole.findUnique({
      where: { id },
      include: {
        licenseTypes: true, // Inclure les types de permis associés
      },
    });
    
    if (!ecole) {
      return NextResponse.json({ error: 'Auto-école non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json({ ecole });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'auto-école:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération de l\'auto-école.' }, { status: 500 });
  }
}

// Fonction pour mettre à jour une auto-école spécifique par ID
export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split('/').pop() || '', 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }
    
    const data = await request.json();
    const updatedEcole = await prisma.ecole.update({
      where: { id },
      data,
    });
    
    return NextResponse.json({ updatedEcole });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'auto-école:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de l\'auto-école.' }, { status: 500 });
  }
}
