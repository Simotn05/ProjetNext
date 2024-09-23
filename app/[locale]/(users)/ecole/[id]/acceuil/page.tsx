'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type Etudiant = {
  id: number;
  username: string;
  email: string;
  number: string; 
};

type Ecole = {
  id: number;
  name: string;
  email: string;
  city: string;
  phoneNumber: string;
  students: Etudiant[];
};

const AutoEcoleDashboard = () => {
  const [ecole, setEcole] = useState<Ecole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAllStudents, setShowAllStudents] = useState(false);

  const router = useRouter();
  const { id } = useParams(); 

  useEffect(() => {
    if (!id) return; 

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

  if (error) return <p>{error}</p>;

  const students = ecole?.students || [];
  const displayedStudents = showAllStudents ? students : students.slice(0, 3);

  return (
    <div className="container mx-auto py-8 pt-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Bienvenue, {ecole?.name}</CardTitle>
          <CardDescription>Email : {ecole?.email}</CardDescription>
          <CardDescription>Ville : {ecole?.city}</CardDescription>
          <CardDescription>Numéro de téléphone : {ecole?.phoneNumber}</CardDescription>
        </CardHeader>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Étudiants inscrits</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom de l'étudiant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Numéro de téléphone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>Aucun étudiant inscrit pour le moment.</TableCell>
                </TableRow>
              ) : (
                displayedStudents.map((etudiant) => (
                  <TableRow key={etudiant.id}>
                    <TableCell>{etudiant.username}</TableCell>
                    <TableCell>{etudiant.email}</TableCell>
                    <TableCell>{etudiant.number}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {students.length > 3 && !showAllStudents && (
            <div className="mt-4 text-center">
              <Button onClick={() => setShowAllStudents(true)}>Voir plus...</Button>
            </div>
          )}
          {showAllStudents && students.length > 3 && (
            <div className="mt-4 text-center">
              <Button onClick={() => setShowAllStudents(false)}>Voir moins</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 flex gap-4 mb-8">
        <Button onClick={() => router.push(`/ecole/${id}/liste-etudiants`)}>Gérer les étudiants</Button>
      </div>
    </div>
  );
};

export default AutoEcoleDashboard;
