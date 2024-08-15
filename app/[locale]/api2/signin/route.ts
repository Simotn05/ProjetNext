import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prisma from '@/lib/prisma'; // Assurez-vous que Prisma est configuré correctement

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: NextRequest) {
  try {
    // Récupérer les informations de connexion
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    // Trouver l'utilisateur par email
    const user = await prisma.etudiant.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
    }

    // Vérifier si un autre utilisateur est déjà connecté
    const loggedInUser = await prisma.etudiant.findFirst({ where: { isLoggedIn: true } });

    if (loggedInUser) {
      return NextResponse.json({ error: 'Un utilisateur est déjà connecté. Veuillez attendre qu\'il se déconnecte.' }, { status: 403 });
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
    }

    // Mettre à jour l'état de la session de l'utilisateur
    await prisma.etudiant.update({
      where: { id: user.id },
      data: { isLoggedIn: true },
    });

    // Créer un token d'authentification
    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Préparer la réponse avec le token et les informations de l'utilisateur
    const response = NextResponse.json({ user: { id: user.id, email: user.email } });
    response.cookies.set('authToken', token, { httpOnly: true, maxAge: 3600 });

    return response;
  } catch (error) {
    console.error('Erreur lors de la tentative de connexion:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
