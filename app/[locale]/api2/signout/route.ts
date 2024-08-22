import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: NextRequest) {
  try {
    // Récupérer le token d'authentification des cookies
    const token = request.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Token d\'authentification manquant' }, { status: 401 });
    }

    // Vérifier et décoder le token
    let decoded;
    try {
      decoded = verify(token, JWT_SECRET) as { userId: string; role: string };
    } catch (error) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    console.log('Token décodé:', decoded);

    // Rechercher l'utilisateur en fonction de son rôle
    let user;
    if (decoded.role === 'etudiant') {
      user = await prisma.etudiant.findUnique({
        where: { id: parseInt(decoded.userId, 10) },
      });
    } else if (decoded.role === 'commercial') {
      user = await prisma.commercial.findUnique({
        where: { id: parseInt(decoded.userId, 10) },
      });
    }

    if (!user) {
      console.log('Utilisateur non trouvé avec l\'ID:', decoded.userId);
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Mettre à jour l'état de connexion de l'utilisateur dans la base de données
    if (decoded.role === 'etudiant') {
      await prisma.etudiant.update({
        where: { id: parseInt(decoded.userId, 10) },
        data: { isLoggedIn: false },
      });
    } else if (decoded.role === 'commercial') {
      // Si nécessaire, ajoutez une mise à jour spécifique pour les commerciaux ici
    }

    // Préparer la réponse de déconnexion réussie
    const response = NextResponse.json({ message: 'Déconnexion réussie' });

    // Supprimer le cookie d'authentification
    response.cookies.delete('authToken');

    return response;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
