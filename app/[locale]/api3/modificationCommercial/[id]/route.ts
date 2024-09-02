import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Utility function for phone number validation
const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^(06|07)\d{8}$/;
  return phoneRegex.test(phoneNumber);
};

// API - GET request to fetch commercial details along with all regions
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const commercial = await prisma.commercial.findUnique({
      where: { id: parseInt(id) },
      include: {
        regions: {
          include: {
            region: true,
          },
        },
      },
    });

    if (!commercial) {
      return NextResponse.json({ error: 'Commercial not found' }, { status: 404 });
    }

    const allRegions = await prisma.region.findMany(); // Récupérer toutes les régions

    const commercialData = {
      ...commercial,
      regions: commercial.regions.map((cr) => cr.region),
      allRegions, // Ajouter toutes les régions à la réponse
    };

    return NextResponse.json(commercialData);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching commercial details' }, { status: 500 });
  }
}

// POST request to update commercial details and regions
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, email, phoneNumber, regions } = await req.json();

  // Validate phone number
  if (!validatePhoneNumber(phoneNumber)) {
    return NextResponse.json({ error: 'Le numéro de téléphone doit être au format 06xxxxxxxx ou 07xxxxxxxx.' }, { status: 400 });
  }

  try {
    // Mettre à jour les détails du commercial
    const updatedCommercial = await prisma.commercial.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    // Récupérer les régions actuellement associées au commercial
    const currentRegions = await prisma.commercialRegion.findMany({
      where: { commercialId: parseInt(id) },
      select: { regionId: true },
    });

    // Supprimer les régions existantes
    await prisma.commercialRegion.deleteMany({
      where: { commercialId: parseInt(id) },
    });

    // Ajouter les nouvelles régions sélectionnées
    const newRegions = regions.map((regionId: number) => ({
      commercialId: parseInt(id),
      regionId,
    }));

    await prisma.commercialRegion.createMany({
      data: newRegions,
    });

    // Réassignation des étudiants des anciennes régions qui ne sont plus gérées par ce commercial
    const oldRegionIds = currentRegions.map(cr => cr.regionId);
    const regionsToRemove = oldRegionIds.filter(regionId => !regions.includes(regionId));

    if (regionsToRemove.length > 0) {
      await prisma.etudiant.updateMany({
        where: {
          regionId: { in: regionsToRemove },
          commercialId: parseInt(id),
        },
        data: {
          commercialId: null,  // Suppression de l'ID du commercial pour ces régions
        },
      });
    }

    // Réassignation des étudiants sans commercial pour les nouvelles régions associées à ce commercial
    for (const regionId of regions) {
      await prisma.etudiant.updateMany({
        where: {
          regionId: regionId,
          commercialId: null, // Seuls les étudiants sans commercial sont concernés
        },
        data: {
          commercialId: parseInt(id), // Réassignation au commercial mis à jour
        },
      });
    }

    return NextResponse.json(updatedCommercial);
  } catch (error) {
    console.error('Error updating commercial:', error);
    return NextResponse.json({ error: 'Error updating commercial' }, { status: 500 });
  }
}