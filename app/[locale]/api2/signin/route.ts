import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    // Recherchez l'utilisateur dans les trois tables Commercial, Etudiant et Ecole
    const commercial = await prisma.commercial.findUnique({ where: { email } });
    const etudiant = await prisma.etudiant.findUnique({ where: { email } });
    const ecole = await prisma.ecole.findUnique({ where: { email } });

    const user = commercial || etudiant || ecole;

    if (!user) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
    }

    let passwordMatch = false;

    if (commercial) {
      passwordMatch = await bcrypt.compare(password, commercial.password);
    } else if (etudiant) {
      passwordMatch = await bcrypt.compare(password, etudiant.password);
    } else if (ecole) {
      passwordMatch = await bcrypt.compare(password, ecole.password);
    }

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
    }

    const token = sign({ userId: user.id, role: commercial ? 'commercial' : etudiant ? 'etudiant' : 'ecole' }, JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json({ user: { id: user.id, email: user.email, role: commercial ? 'commercial' : etudiant ? 'etudiant' : 'ecole' } });
    response.cookies.set('authToken', token, { httpOnly: true, maxAge: 3600 });

    return response;
  } catch (error) {
    console.error('Erreur lors de la tentative de connexion:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
