import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split('/').pop() || '');
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    await prisma.ecole.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Auto-école supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'auto-école:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression de l\'auto-école' }, { status: 500 });
  }
}