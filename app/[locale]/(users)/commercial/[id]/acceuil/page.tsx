'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type Client = {
  id: number;
  username: string;
  email: string;
  number: string; // Assurez-vous que cela correspond à votre schéma
};

type Commercial = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  clients: Client[];
};

const CommercialPage = () => {
  const [commercial, setCommercial] = useState<Commercial | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllClients, setShowAllClients] = useState(false);

  const router = useRouter();
  const { id } = useParams(); // Utiliser useParams pour obtenir l'ID

  useEffect(() => {
    if (!id) return; // Assurez-vous que l'ID est disponible

    const fetchCommercialData = async () => {
      try {
        const response = await fetch(`/api2/dashboard_commercial/commercial/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCommercial(data.commercial); // Assurez-vous que `data.commercial` est correct
        } else {
          setError('Erreur lors du chargement des informations du commercial.');
        }
      } catch (err) {
        setError('Erreur de connexion.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommercialData();
  }, [id]);

 
  if (error) return <p>{error}</p>;

  // Définir une valeur par défaut pour les clients
  const clients = commercial?.clients || [];
  const displayedClients = showAllClients ? clients : clients.slice(0, 3);

  return (
    <div className="container mx-auto py-8 pt-4">
      {/* Informations sur le commercial */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Bienvenue, {commercial?.name}</CardTitle>
          <CardDescription>Email : {commercial?.email}</CardDescription>
          <CardDescription>Numéro de téléphone : {commercial?.phoneNumber}</CardDescription>
        </CardHeader>
      </Card>

      {/* Liste des clients */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Clients associés</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Numéro de téléphone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>Aucun client associé pour le moment.</TableCell>
                </TableRow>
              ) : (
                displayedClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.username}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.number}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {clients.length > 3 && !showAllClients && (
            <div className="mt-4 text-center">
              <Button onClick={() => setShowAllClients(true)}>Voir plus...</Button>
            </div>
          )}
          {showAllClients && clients.length > 3 && (
            <div className="mt-4 text-center">
              <Button onClick={() => setShowAllClients(false)}>Voir moins</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Boutons pour gérer les clients */}
      <div className="mt-8 flex gap-4">
        <Button onClick={() => router.push(`/commercial/${id}/liste-etudiants`)}>Gérer les clients</Button>
      </div>
    </div>
  );
};

export default CommercialPage;
