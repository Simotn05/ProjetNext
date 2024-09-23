import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; 
    const { password } = await request.json(); 

    if (!password) {
      return NextResponse.json({ error: 'Le mot de passe est requis.' }, { status: 400 });
    }

    const etudiant = await prisma.etudiant.findUnique({
      where: { id: Number(id) },
    });

    if (!etudiant) {
      return NextResponse.json({ error: 'Étudiant non trouvé.' }, { status: 404 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.etudiant.update({
      where: { id: Number(id) },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Mot de passe mis à jour avec succès.' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la modification du mot de passe:', error);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
