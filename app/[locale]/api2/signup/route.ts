import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { lang: string } }) {
  try {
    console.log('Requête reçue pour la langue:', params.lang); // Vérifiez la langue reçue
    const data = await req.json();

    const { username, email, number, password, birthdate, drivingLicenseType, regionId, villeId } = data;

    if (!username || !email || !number || !password || !birthdate || !drivingLicenseType || !regionId || !villeId) {
      return NextResponse.json({ error: 'Tous les champs sont obligatoires' }, { status: 400 });
    }

    // Validation du numéro de téléphone
    const phoneRegex = /^(06|07)\d{8}$/;
    if (!phoneRegex.test(number)) {
      return NextResponse.json({
        error: 'Le numéro de téléphone doit être au format 06XXXXXXXX ou 07XXXXXXXX.',
      }, { status: 400 });
    }

    // Validation de la force du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({
        error: 'Le mot de passe doit comporter au moins 8 caractères, inclure des lettres majuscules et minuscules, et contenir au moins un chiffre.',
      }, { status: 400 });
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
        return NextResponse.json({ error: 'Nom d\'utilisateur déjà pris' }, { status: 400 });
      }
      if (existingUser.email === email) {
        return NextResponse.json({ error: 'Email déjà enregistré' }, { status: 400 });
      }
    }

    // Hachage du mot de passe
    const saltRounds = 10; // Nombre de tours de salage
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Convertir les IDs en nombres entiers
    const regionIdInt = parseInt(regionId, 10);
    const villeIdInt = parseInt(villeId, 10);

    if (isNaN(regionIdInt) || isNaN(villeIdInt)) {
      return NextResponse.json({ error: 'Les identifiants de région ou de ville sont invalides.' }, { status: 400 });
    }

    // Trouver le commercial responsable de cette région
    const commercial = await prisma.commercial.findFirst({
      where: { regionId: regionIdInt }
    });

    if (!commercial) {
      return NextResponse.json({ error: 'Aucun commercial trouvé pour cette région.' }, { status: 404 });
    }

    // Insertion dans la base de données avec le mot de passe haché, type de permis, et relations
    const nouvelEtudiant = await prisma.etudiant.create({
      data: {
        username,
        email,
        number,
        password: hashedPassword,
        birthdate: new Date(birthdate),
        drivingLicenseType,
        region: {
          connect: { id: regionIdInt } // Connexion à la région
        },
        ville: {
          connect: { id: villeIdInt } // Connexion à la ville
        },
        commercial: {
          connect: { id: commercial.id } // Connexion au commercial
        }
      },
    });

    return NextResponse.json(nouvelEtudiant, { status: 201 });
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    return NextResponse.json({ error: 'Échec de l\'inscription' }, { status: 500 });
  }
}
