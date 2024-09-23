import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const requests = await prisma.partnershipRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(requests);
}
