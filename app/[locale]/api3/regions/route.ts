import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const regions = await prisma.region.findMany();
    return NextResponse.json({ regions });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des régions.' }, { status: 500 });
  }
}
