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
    let user;
    if (decoded.role === 'commercial') {
      user = await prisma.commercial.findUnique({ where: { id: parseInt(decoded.userId) } });
    } else if (decoded.role === 'etudiant') {
      user = await prisma.etudiant.findUnique({ where: { id: parseInt(decoded.userId) } });
    } else if (decoded.role === 'ecole') {
      user = await prisma.ecole.findUnique({ where: { id: parseInt(decoded.userId) } });
    }

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
    console.error('Erreur lors de la vérification de l’authentification:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
