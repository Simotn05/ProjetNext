'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Utiliser useParams
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { number } from 'yup';

// type LicenseType = {
//   id: number;
//   name: string;
// };

// type VehiclePerType = {
//   id: number;
//   vehicleType: string;
//   count: number;
// };

type Etudiant = {
  id: number;
  username: string;
  email: string;
  number: number;
};

type Ecole = {
  id: number;
  name: string;
  email: string;
  city: string;
  phoneNumber: string;
  // licenseTypes: LicenseType[];
  // vehiclesPerType: VehiclePerType[];
  students: Etudiant[];
};

const AutoEcoleDashboard = () => {
  const [ecole, setEcole] = useState<Ecole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();
  const { id } = useParams(); // Utiliser useParams pour obtenir l'ID
  const params = useParams();

  useEffect(() => {
    if (!id) return; // Assurez-vous que l'ID est disponible

    const fetchEcoleData = async () => {
      try {
        const response = await fetch(`/api2/dashboard_ecole/profile/${id}`);
        if (response.ok) {
          const data: Ecole = await response.json();
          setEcole(data);
        } else {
          setError('Erreur lors du chargement des informations de l\'auto-école.');
        }
      } catch (err) {
        setError('Erreur de connexion.');
      } finally {
        setLoading(false);
      }
    };

    fetchEcoleData();
  }, [id]);

//   if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Bienvenue, {ecole?.name}</CardTitle>
          <CardDescription>Email : {ecole?.email}</CardDescription>
          <CardDescription>Ville : {ecole?.city}</CardDescription>
          <CardDescription>Numéro de téléphone : {ecole?.phoneNumber}</CardDescription>
        </CardHeader>
      </Card>

      {/* Liste des étudiants */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Étudiants inscrits</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom de l'étudiant</TableHead>
                <TableHead>Numéro de téléphone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ecole?.students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>Aucun étudiant inscrit pour le moment.</TableCell>
                </TableRow>
              ) : (
                ecole?.students.map((etudiant) => (
                  <TableRow key={etudiant.id}>
                    <TableCell>{etudiant.username}</TableCell>
                    <TableCell>{etudiant.number}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-8 flex gap-4 mb-8">
        <Button onClick={() => router.push(`/ecole/${params.id}/liste-etudiants`)}>Gérer les étudiants</Button>
      </div>
      {/* Liste des véhicules */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Véhicules disponibles par type de permis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type de véhicule</TableHead>
                <TableHead>Nombre</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ecole?.vehiclesPerType.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>Aucun véhicule disponible pour le moment.</TableCell>
                </TableRow>
              ) : (
                ecole?.vehiclesPerType.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.vehicleType}</TableCell>
                    <TableCell>{vehicle.count}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bouton pour gérer les véhicules ou étudiants /}
      <div className="mt-8 flex gap-4">
        <Button onClick={() => router.push('/gestion-vehicules')}>Gérer les véhicules</Button>
      </div> */}
    </div>
  );
};

export default AutoEcoleDashboard;
