import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, city, phoneNumber, licenseTypes, vehiclesPerType } = await request.json();

    console.log('Request Data:', { name, email, password, city, phoneNumber, licenseTypes, vehiclesPerType });

    // Validation des types de permis
    const validLicenseTypes = Array.isArray(licenseTypes) ? licenseTypes.filter(id => id !== undefined) : [];
    console.log('Valid License Types:', validLicenseTypes);

    const existingLicenseTypes = await prisma.licenseType.findMany({
      where: {
        id: {
          in: validLicenseTypes
        }
      }
    });

    const existingLicenseTypeIds = existingLicenseTypes.map(type => type.id);
    const invalidLicenseTypes = validLicenseTypes.filter(id => !existingLicenseTypeIds.includes(id));

    if (invalidLicenseTypes.length > 0) {
      return NextResponse.json({
        error: `Les types de permis suivants ne sont pas valides : ${invalidLicenseTypes.join(', ')}`
      }, { status: 400 });
    }

    // Vérification de la ville et récupération de la région associée
    const cityData = await prisma.ville.findUnique({
      where: { name: city }, // Supposons que 'name' est la clé unique pour les villes
      include: { region: true } // Inclut la région associée à la ville
    });

    if (!cityData) {
      return NextResponse.json({
        error: `La ville ${city} n'existe pas.`
      }, { status: 400 });
    }

    const regionId = cityData.regionId;

    if (!regionId) {
      return NextResponse.json({
        error: `La ville ${city} n'est associée à aucune région.`
      }, { status: 400 });
    }

    // Validation des véhicules par type
    const validVehiclesPerType = Array.isArray(vehiclesPerType) ? vehiclesPerType.filter(vehicle => 
      vehicle && vehicle.licenseTypeId !== undefined && vehicle.count !== undefined && vehicle.vehicleType !== undefined && vehicle.ecoleId !== undefined
    ) : [];
    console.log('Valid Vehicles Per Type:', validVehiclesPerType);

    // Si `vehiclesPerType` est `undefined`, nous définissons un tableau vide pour éviter les erreurs
    const vehiclesToCreate = validVehiclesPerType.length > 0 ? validVehiclesPerType : [];

    // Validation du mot de passe
    if (!validatePassword(password)) {
      return NextResponse.json({
        error: 'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre.'
      }, { status: 400 });
    }

    // Hachage du mot de passe
    const saltRounds = 10; // Nombre de tours pour le hachage
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Création de l'école avec les types de permis, les véhicules associés, et la région
    const newEcole = await prisma.ecole.create({
      data: {
        name,
        email,
        password: hashedPassword, // Stockez le mot de passe haché
        city,
        phoneNumber,
        regionId, // Utilisez la région associée à la ville
        licenseTypes: {
          connect: validLicenseTypes.map(id => ({ id }))
        },
        vehiclesPerType: {
          create: vehiclesToCreate.map(vehicle => ({
            licenseTypeId: vehicle.licenseTypeId,
            count: vehicle.count,
            vehicleType: vehicle.vehicleType,
            ecoleId: vehicle.ecoleId
          }))
        }
      }
    });

    console.log('New Ecole Created:', newEcole);

    return NextResponse.json(newEcole);
  } catch (error) {
    console.error('Erreur lors de la création de l\'école:', error);
    return NextResponse.json({ error: 'Une erreur est survenue lors de la création de l\'école.' }, { status: 500 });
  }
}