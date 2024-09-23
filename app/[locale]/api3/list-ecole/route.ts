import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 

export async function GET() {
  try {
    const ecoles = await prisma.ecole.findMany({
      include: {
        licenseTypes: true, 
      },
    });
    return NextResponse.json({ ecoles });
  } catch (error) {
    console.error('Erreur lors de la récupération des auto-écoles:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des auto-écoles.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = parseInt(request.url.split('/').pop() || '', 10); 
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }
    
    await prisma.ecole.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Auto-école supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'auto-école:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression de l\'auto-école.' }, { status: 500 });
  }
}
