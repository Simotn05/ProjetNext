'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

type Region = {
  name: string;
};

type Ville = {
  name: string;
};

type Commercial = {
  name: string;
};

type Ecole = {
  name: string;
};

type Etudiant = {
  id: number;
  username: string;
  email: string;
  number: string;
  birthdate: string;
  drivingLicenseType: string;
  region: Region;
  ville: Ville;
  commercial?: Commercial;
  ecole?: Ecole;
  createdAt: string;
};

const EtudiantsPage = () => {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const response = await fetch('/api3/students');
        const data: Etudiant[] = await response.json();
        if (response.ok) {
          setEtudiants(data);
        } else {
          setError('Erreur lors du chargement des étudiants');
        }
      } catch (err) {
        setError('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    };

    fetchEtudiants();
  }, []);

  if (loading) return <p>Chargement des étudiants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Étudiants</CardTitle>
        <CardDescription>Liste des étudiants inscrits sur la plateforme.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom d'utilisateur</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Numéro</TableHead>
              <TableHead className="hidden lg:table-cell">Date de naissance</TableHead>
              <TableHead className="hidden lg:table-cell">Type de permis</TableHead>
              <TableHead className="hidden xl:table-cell">Ville</TableHead>
              <TableHead className="hidden xl:table-cell">Commercial</TableHead>
              <TableHead className="hidden xl:table-cell">École</TableHead>
              <TableHead className="hidden 2xl:table-cell">Date de création</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {etudiants.length === 0 && (
              <TableRow>
                <TableCell colSpan={10}>
                  <div className="flex flex-col gap-1.5 text-muted-foreground items-center justify-center text-center">
                    <p className="font-medium text-sm">Aucun étudiant pour le moment</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {etudiants.map((etudiant) => (
              <TableRow key={etudiant.id}>
                <TableCell>{etudiant.username}</TableCell>
                <TableCell className="hidden md:table-cell">{etudiant.email}</TableCell>
                <TableCell className="hidden md:table-cell">{etudiant.number}</TableCell>
                <TableCell className="hidden lg:table-cell">{new Date(etudiant.birthdate).toLocaleDateString()}</TableCell>
                <TableCell className="hidden lg:table-cell">{etudiant.drivingLicenseType}</TableCell>
                <TableCell className="hidden xl:table-cell">{etudiant.ville?.name || 'Aucune'}</TableCell>
                <TableCell className="hidden xl:table-cell">{etudiant.commercial?.name || 'Aucun'}</TableCell>
                <TableCell className="hidden xl:table-cell">{etudiant.ecole?.name || 'Aucune'}</TableCell>
                <TableCell className="hidden 2xl:table-cell">{new Date(etudiant.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/edit-mdp/${etudiant.id}`)} // Redirection avec l'ID de l'étudiant
                  >
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};


export default EtudiantsPage;
