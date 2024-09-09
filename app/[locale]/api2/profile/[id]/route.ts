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
            region: true, // Inclure la région associée à la ville
          },
        },
        commercial: true,  // Inclure le commercial associé
        ecole: true,       // Inclure l'auto-école associée
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Vérifier si la région de l'étudiant a un commercial assigné
    const currentRegionId = user.ville.region.id;
    const commercialForRegion = await prisma.commercialRegion.findFirst({
      where: { regionId: currentRegionId },
      include: {
        commercial: true,
      },
    });

    if (commercialForRegion) {
      // Si l'étudiant n'a pas de commercial ou si le commercial a changé, mettre à jour
      if (!user.commercial || user.commercial.id !== commercialForRegion.commercial.id) {
        await prisma.etudiant.update({
          where: { id: user.id },
          data: { commercialId: commercialForRegion.commercial.id },
        });

        // Ré-fetcher l'utilisateur mis à jour pour renvoyer la bonne réponse
        const updatedUser = await prisma.etudiant.findUnique({
          where: { id: parseInt(id, 10) },
          include: {
            ville: {
              include: {
                region: true,
              },
            },
            commercial: true,
            ecole: true, // Inclure l'auto-école dans la réponse
          },
        });

        return NextResponse.json(updatedUser);
      }
    }

    // Si tout est correct, retourner l'utilisateur sans mise à jour
    return NextResponse.json(user);

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
