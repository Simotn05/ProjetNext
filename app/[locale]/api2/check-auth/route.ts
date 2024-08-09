import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Logique pour vérifier l'état de connexion de l'utilisateur
    // Cela peut impliquer la vérification d'un cookie ou d'un token
    const isAuthenticated = !!req.cookies.get('authToken'); // Exemple de vérification avec un cookie

    return NextResponse.json({ isAuthenticated });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
