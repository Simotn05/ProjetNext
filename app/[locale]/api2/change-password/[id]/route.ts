import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log('Requête reçue pour changer le mot de passe de l\'utilisateur:', params.id);

    // Récupération des données de la requête
    const data = await req.json();
    const { currentPassword, newPassword } = data;

    // Validation des champs
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Les champs "mot de passe actuel" et "nouveau mot de passe" sont requis.' }, { status: 400 });
    }

    // Validation du nouveau mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json({
        error: 'Le nouveau mot de passe doit comporter au moins 8 caractères, inclure des lettres majuscules et minuscules, et contenir au moins un chiffre.',
      }, { status: 400 });
    }

    // Récupération de l'utilisateur par ID
    const userId = parseInt(params.id, 10);
    const user = await prisma.etudiant.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé. Veuillez vérifier l\'ID de l\'utilisateur.' }, { status: 404 });
    }

    // Comparaison du mot de passe actuel
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Le mot de passe actuel fourni est incorrect. Veuillez vérifier et réessayer.' }, { status: 400 });
    }

    // Hachage du nouveau mot de passe
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Mise à jour du mot de passe
    await prisma.etudiant.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({ message: 'Le mot de passe a été mis à jour avec succès.' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la mise à jour du mot de passe. Veuillez réessayer plus tard.' }, { status: 500 });
  }
}