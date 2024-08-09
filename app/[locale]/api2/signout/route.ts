// /app/api2/signout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({ message: 'Déconnexion réussie' });

    // Supprimer les cookies de session ou autre mécanisme de gestion de session
    response.cookies.delete('authToken');

    return response;
  } catch (error) {
    console.error('Signout error:', error);
    return NextResponse.json({ error: 'Déconnexion échouée' }, { status: 500 });
  }
}
