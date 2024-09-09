// app/[locale]/api3/students/route.ts

import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // Assure-toi que Prisma est configuré ici

export async function GET() {
    try {
        // Récupérer les étudiants avec leurs relations
        const etudiants = await prisma.etudiant.findMany({
            include: {
                region: true, // Inclure la région
                ville: true,  // Inclure la ville
                commercial: true, // Inclure le commercial s'il existe
                ecole: true, // Inclure l'école s'il existe
            },
        });

        // Réponse en JSON avec la liste des étudiants
        return NextResponse.json(etudiants);
    } catch (error) {
        console.error('Error fetching students:', error);
        return NextResponse.json({ message: 'Erreur lors de la récupération des étudiants.' }, { status: 500 });
    }
}
