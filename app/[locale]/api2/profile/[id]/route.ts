import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await prisma.etudiant.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        ville: {
          include: {
            region: true, 
          },
        },
        commercial: true,  
        ecole: true,       
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const currentRegionId = user.ville.region.id;
    const commercialForRegion = await prisma.commercialRegion.findFirst({
      where: { regionId: currentRegionId },
      include: {
        commercial: true,
      },
    });

    if (commercialForRegion) {
      if (!user.commercial || user.commercial.id !== commercialForRegion.commercial.id) {
        await prisma.etudiant.update({
          where: { id: user.id },
          data: { commercialId: commercialForRegion.commercial.id },
        });

        const updatedUser = await prisma.etudiant.findUnique({
          where: { id: parseInt(id, 10) },
          include: {
            ville: {
              include: {
                region: true,
              },
            },
            commercial: true,
            ecole: true, 
          },
        });

        return NextResponse.json(updatedUser);
      }
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
