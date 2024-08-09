import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { lang: string } }) {
  try {
    console.log('Received request for language:', params.lang); // Vérifiez la langue reçue
    const data = await req.json();

    const { username, email, number, password, birthdate } = data;

    if (!username || !email || !number || !password || !birthdate) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Vérifiez si le nom d'utilisateur ou l'email est déjà présent
    const existingUser = await prisma.etudiant.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
      }
      if (existingUser.email === email) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }
    }

    // Hachage du mot de passe
    const saltRounds = 10; // Nombre de tours de salage
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertion dans la base de données avec le mot de passe haché
    const newStudent = await prisma.etudiant.create({
      data: {
        username,
        email,
        number,
        password: hashedPassword,
        birthdate: new Date(birthdate),
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
