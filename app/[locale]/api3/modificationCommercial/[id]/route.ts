import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';

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




// POST request to update commercial details
// POST request to update commercial details and regions
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, email, phoneNumber, regions } = await req.json();

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

    return NextResponse.json(updatedCommercial);
  } catch (error) {
    console.error('Error updating commercial:', error);
    return NextResponse.json({ error: 'Error updating commercial' }, { status: 500 });
  }
}

