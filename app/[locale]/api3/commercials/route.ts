// pages/api/commercials.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const { name, email, password, regionId } = await request.json();

  if (!name || !email || !password || !regionId) {
    return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
  }

  try {
    const newCommercial = await prisma.commercial.create({
      data: {
        name,
        email,
        password,
        regionId,
      },
    });

    return NextResponse.json(newCommercial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création du commercial' }, { status: 500 });
  }
}
