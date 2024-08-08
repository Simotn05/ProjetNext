import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { lang: string } }) {
  try {
    const data = await req.json();

    const { username, email, number, password, birthdate } = data;

    // Data validation
    if (!username || !email || !number || !password || !birthdate) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Additional validation (e.g., check email format, password strength) can be added here

    // Insert the new student into the database
    const newStudent = await prisma.etudiant.create({
      data: {
        username,
        email,
        number,
        password,
        birthdate: new Date(birthdate), // Convert birthdate string to Date object
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
