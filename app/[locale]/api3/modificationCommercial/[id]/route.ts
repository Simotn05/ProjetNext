import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; 
import prisma from '@/lib/prisma';

const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^(06|07)\d{8}$/;
  return phoneRegex.test(phoneNumber);
};

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

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

    const allRegions = await prisma.region.findMany(); 

    const commercialData = {
      ...commercial,
      regions: commercial.regions.map((cr) => cr.region),
      allRegions, 
    };

    return NextResponse.json(commercialData);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching commercial details' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, email, phoneNumber, regions, password } = await req.json();

  if (!validatePhoneNumber(phoneNumber)) {
    return NextResponse.json({ error: 'Le numéro de téléphone doit être au format 06xxxxxxxx ou 07xxxxxxxx.' }, { status: 400 });
  }

  if (password && !validatePassword(password)) {
    return NextResponse.json({
      error: 'Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre.',
    }, { status: 400 });
  }

  try {
    
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10); 
      hashedPassword = await bcrypt.hash(password, salt); 
    }

    const updatedCommercial = await prisma.commercial.update({
      where: { id: parseInt(id) },
      data: {
        name,
        // email,
        phoneNumber,
        ...(hashedPassword && { password: hashedPassword }), 
      },
    });

    const currentRegions = await prisma.commercialRegion.findMany({
      where: { commercialId: parseInt(id) },
      select: { regionId: true },
    });

    await prisma.commercialRegion.deleteMany({
      where: { commercialId: parseInt(id) },
    });

    const newRegions = regions.map((regionId: number) => ({
      commercialId: parseInt(id),
      regionId,
    }));

    await prisma.commercialRegion.createMany({
      data: newRegions,
    });

    const oldRegionIds = currentRegions.map(cr => cr.regionId);
    const regionsToRemove = oldRegionIds.filter(regionId => !regions.includes(regionId));

    if (regionsToRemove.length > 0) {
      await prisma.etudiant.updateMany({
        where: {
          regionId: { in: regionsToRemove },
          commercialId: parseInt(id),
        },
        data: {
          commercialId: null, 
        },
      });
    }

    for (const regionId of regions) {
      await prisma.etudiant.updateMany({
        where: {
          regionId: regionId,
          commercialId: null, 
        },
        data: {
          commercialId: parseInt(id),
        },
      });
    }

    return NextResponse.json(updatedCommercial);
  } catch (error) {
    console.error('Error updating commercial:', error);
    return NextResponse.json({ error: 'Error updating commercial' }, { status: 500 });
  }
}