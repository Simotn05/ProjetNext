import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
        clients: true, 
      },
    });

    if (!commercial) {
      return NextResponse.json({ error: 'Commercial not found' }, { status: 404 });
    }

    const commercialData = {
      name: commercial.name,
      email: commercial.email,
      phoneNumber: commercial.phoneNumber,
      regions: commercial.regions.map((cr) => cr.region),
      clients: commercial.clients,
    };

    return NextResponse.json({ commercial: commercialData });
  } catch (error) {
    console.error('Error fetching commercial details:', error);
    return NextResponse.json({ error: 'Error fetching commercial details' }, { status: 500 });
  }
}