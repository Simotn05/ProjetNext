import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = verify(token, JWT_SECRET) as { userId: string; role: string };

    // Recherchez l'utilisateur dans la base de données en fonction du rôle
    const user = decoded.role === 'commercial'
      ? await prisma.commercial.findUnique({ where: { id: parseInt(decoded.userId) } })
      : await prisma.etudiant.findUnique({ where: { id: parseInt(decoded.userId) } });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: decoded.role,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}