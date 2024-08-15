import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma'; // Assurez-vous que Prisma est configuré correctement

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: NextRequest) {
  try {
    // Récupérer le token d'authentification des cookies
    const token = request.cookies.get('authToken')?.value;

    if (token) {
      // Vérifier et décoder le token
      const decoded = verify(token, JWT_SECRET) as { userId: string };

      // Mettre à jour l'état de connexion de l'utilisateur dans la base de données
      await prisma.etudiant.update({
        where: { id: parseInt(decoded.userId, 10) },
        data: { isLoggedIn: false },
      });
    }

    // Préparer la réponse de déconnexion réussie
    const response = NextResponse.json({ message: 'Déconnexion réussie' });

    // Supprimer le cookie d'authentification
    response.cookies.delete('authToken');

    return response;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return NextResponse.json({ error: 'Erreur lors de la déconnexion' }, { status: 500 });
  }
}
