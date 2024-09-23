import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; 

export async function GET() {
    try {
        const etudiants = await prisma.etudiant.findMany({
            include: {
                region: true, 
                ville: true,  
                commercial: true, 
                ecole: true, 
            },
        });

        return NextResponse.json(etudiants);
    } catch (error) {
        console.error('Error fetching students:', error);
        return NextResponse.json({ message: 'Erreur lors de la récupération des étudiants.' }, { status: 500 });
    }
}
