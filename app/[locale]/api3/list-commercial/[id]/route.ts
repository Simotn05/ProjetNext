import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.commercialRegion.deleteMany({
      where: { commercialId: parseInt(id, 10) },
    });

    await prisma.etudiant.updateMany({
      where: { commercialId: parseInt(id, 10) },
      data: { commercialId: null }, 
    });

    await prisma.commercial.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: 'Commercial supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du commercial:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du commercial' }, { status: 500 });
  }
}