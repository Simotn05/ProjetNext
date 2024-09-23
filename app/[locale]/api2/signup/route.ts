import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { lang: string } }) {
  try {
    console.log('Requête reçue pour la langue:', params.lang); 
    const data = await req.json();

    const { username, email, number, password, birthdate, drivingLicenseType, regionId, villeId } = data;

    if (!username || !email || !number || !password || !birthdate || !drivingLicenseType || !regionId || !villeId) {
      return NextResponse.json({ error: 'Tous les champs sont obligatoires' }, { status: 400 });
    }

    const phoneRegex = /^(06|07)\d{8}$/;
    if (!phoneRegex.test(number)) {
      return NextResponse.json({
        error: 'Le numéro de téléphone doit être au format 06xxxxxxxx ou 07xxxxxxxx.',
      }, { status: 400 });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({
        error: 'Le mot de passe doit comporter au moins 8 caractères, inclure des lettres majuscules et minuscules, et contenir au moins un chiffre.',
      }, { status: 400 });
    }
    
    const existingEtudiant = await prisma.etudiant.findUnique({
      where: { email },
    });

    const existingCommercial = await prisma.commercial.findUnique({
      where: { email },
    });

    const existingAutoEcole = await prisma.ecole.findUnique({
      where: { email },
    });

    if (existingEtudiant || existingCommercial || existingAutoEcole) {
      return NextResponse.json({
        error: 'Cet email est déjà utilisé.',
      }, { status: 400 });
    }

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const regionIdInt = parseInt(regionId, 10);
    const villeIdInt = parseInt(villeId, 10);

    if (isNaN(regionIdInt) || isNaN(villeIdInt)) {
      return NextResponse.json({ error: 'Les identifiants de région ou de ville sont invalides.' }, { status: 400 });
    }

    const commercials = await prisma.commercialRegion.findMany({
      where: {
        regionId: regionIdInt
      },
      include: {
        commercial: true 
      },
      orderBy: {
        commercialId: 'asc' 
      }
    });

    if (commercials.length === 0) {
      return NextResponse.json({ error: 'La région sélectionnée n\'est pas encore disponible sur notre site. Veuillez vérifier ou contacter notre support.' }, { status: 404 });
    }

    const lastAssignedCommercial = await prisma.etudiant.findFirst({
      where: {
        regionId: regionIdInt
      },
      orderBy: { id: 'desc' }, 
      select: { commercialId: true } 
    });

    let nextCommercial;
    if (lastAssignedCommercial) {
      const lastCommercialIndex = commercials.findIndex(c => c.commercial.id === lastAssignedCommercial.commercialId);
      nextCommercial = commercials[(lastCommercialIndex + 1) % commercials.length].commercial;
    } else {
      nextCommercial = commercials[0].commercial;
    }

    const nouvelEtudiant = await prisma.etudiant.create({
      data: {
        username,
        email,
        number,
        password: hashedPassword,
        birthdate: new Date(birthdate),
        drivingLicenseType,
        region: {
          connect: { id: regionIdInt } 
        },
        ville: {
          connect: { id: villeIdInt } 
        },
        commercial: {
          connect: { id: nextCommercial.id } 
        }
      },
    });

    return NextResponse.json(nouvelEtudiant, { status: 201 });
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    return NextResponse.json({ error: 'Échec de l\'inscription' }, { status: 500 });
  }
}
