import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Token d\'authentification manquant' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = verify(token, JWT_SECRET) as { userId: string; role: string };
    } catch (error) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    console.log('Token décodé:', decoded);

    let user;
    if (decoded.role === 'etudiant') {
      user = await prisma.etudiant.findUnique({
        where: { id: parseInt(decoded.userId, 10) },
      });
    } else if (decoded.role === 'commercial') {
      user = await prisma.commercial.findUnique({
        where: { id: parseInt(decoded.userId, 10) },
      });
    } else if (decoded.role === 'ecole') {
      user = await prisma.ecole.findUnique({
        where: { id: parseInt(decoded.userId, 10) },
      });
    }

    if (!user) {
      console.log('Utilisateur non trouvé avec l\'ID:', decoded.userId);
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    if (decoded.role === 'etudiant') {
      await prisma.etudiant.update({
        where: { id: parseInt(decoded.userId, 10) },
        data: { isLoggedIn: false },
      });
    } else if (decoded.role === 'commercial') {
      await prisma.commercial.update({
        where: { id: parseInt(decoded.userId, 10) },
        data: { isLoggedIn: false }, 
      });
    } else if (decoded.role === 'ecole') {
      await prisma.ecole.update({
        where: { id: parseInt(decoded.userId, 10) },
        data: { isLoggedIn: false }, 
      });
    }

    const response = NextResponse.json({ message: 'Déconnexion réussie' });

    response.cookies.delete('authToken');

    return response;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
