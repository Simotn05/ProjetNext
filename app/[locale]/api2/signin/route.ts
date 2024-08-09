import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken'; // Vous pourriez avoir besoin d'un package pour signer les tokens

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Assurez-vous d'utiliser une clé secrète sécurisée

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.etudiant.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Create a JWT token or session cookie
    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Set token in cookies or session
    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('authToken', token, { httpOnly: true, maxAge: 3600 }); // Ajustez selon vos besoins

    return response;
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json({ error: 'Signin failed' }, { status: 500 });
  }
}
