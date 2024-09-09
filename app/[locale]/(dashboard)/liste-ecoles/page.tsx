'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit2, Trash2 } from "react-feather"; // Importation des icônes

const ListeEcoles: React.FC = () => {
  const [ecoles, setEcoles] = useState<
    { id: number; name: string; email: string; phoneNumber: string; city: string; licenseTypes: { name: string }[] }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchEcoles = async () => {
      try {
        const response = await fetch('/api3/list-ecole'); // Ajustez l'URL selon votre API
        if (!response.ok) {
          throw new Error('Réponse réseau non ok');
        }
        const data = await response.json();
        console.log('Data reçue:', data); 
        setEcoles(data.ecoles); // Assurez-vous que la réponse contient `ecoles`
      } catch (err) {
        console.error('Erreur lors du chargement des auto-écoles:', err); 
        setError('Erreur lors du chargement des auto-écoles.');
      }
    };

    fetchEcoles();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/edit-ecole/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api3/delete-ecole/${id}`, { // Assurez-vous que l'URL correspond à votre API de suppression
        method: 'DELETE',
      });
      if (response.ok) {
        setEcoles(ecoles.filter((ecole) => ecole.id !== id));
      } else {
        console.error('Erreur lors de la suppression de l\'auto-école');
        setError('Erreur lors de la suppression de l\'auto-école.');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'auto-école:', err);
      setError('Erreur lors de la suppression de l\'auto-école.');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-16 shadow-lg rounded-lg">
      <CardContent className="p-10">
        <h1 className="text-2xl font-bold mb-6">Liste des Auto-écoles</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {ecoles.length === 0 && !error ? (
          <p className="text-gray-500">Aucune auto-école à afficher.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Nom</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Numéro de téléphone</th>
                <th className="border p-2">Ville</th>
                <th className="border p-2">Types de permis</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ecoles.map((ecole) => (
                <tr key={ecole.id}>
                  <td className="border p-2">{ecole.name}</td>
                  <td className="border p-2">{ecole.email}</td>
                  <td className="border p-2">{ecole.phoneNumber}</td>
                  <td className="border p-2">{ecole.city}</td>
                  <td className="border p-2">
                    <ul className="list-disc pl-5">
                      {ecole.licenseTypes.map((type, index) => (
                        <li key={index}>{type.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border p-2 text-center align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(ecole.id)}>
                          <Edit2 className="mr-2 h-4 w-4" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(ecole.id)} className="text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Button className="mt-6" onClick={() => router.push('/gestion-ecoles')}>
          Retour
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListeEcoles;