import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken'; // Assurez-vous d'avoir ce package installé
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Assurez-vous d'utiliser une clé secrète sécurisée

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Vérifier le token
    const decoded = verify(token, JWT_SECRET) as { userId: number };
    const userId = decoded.userId;

    // Récupérer les informations utilisateur
    const user = await prisma.etudiant.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Répondre avec les informations utilisateur
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
