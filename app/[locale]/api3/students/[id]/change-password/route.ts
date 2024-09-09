import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Fonction pour gérer la requête POST
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Récupère l'ID de l'URL
    const { password } = await request.json(); // Récupère le nouveau mot de passe

    if (!password) {
      return NextResponse.json({ error: 'Le mot de passe est requis.' }, { status: 400 });
    }

    // Trouver l'étudiant par son ID
    const etudiant = await prisma.etudiant.findUnique({
      where: { id: Number(id) },
    });

    if (!etudiant) {
      return NextResponse.json({ error: 'Étudiant non trouvé.' }, { status: 404 });
    }

    // Hacher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Mettre à jour le mot de passe de l'étudiant
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
