'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit2, Trash2 } from "react-feather"; // Importation des icônes

const ListeCommercials: React.FC = () => {
  const [commercials, setCommercials] = useState<
    { id: number; name: string; email: string; phoneNumber: string; regions: { name: string }[] }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchCommercials = async () => {
      try {
        const response = await fetch('/api3/list-commercial');
        if (!response.ok) {
          throw new Error('Réponse réseau non ok');
        }
        const data = await response.json();
        console.log('Data reçue:', data); 
        setCommercials(data.commercials);
      } catch (err) {
        console.error('Erreur lors du chargement des commerciaux:', err); 
        setError('Erreur lors du chargement des commerciaux.');
      }
    };

    fetchCommercials();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/edit-commercial/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api3/list-commercial/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCommercials(commercials.filter((commercial) => commercial.id !== id));
      } else {
        console.error('Erreur lors de la suppression du commercial');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression du commercial:', err);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-16 shadow-lg rounded-lg">
      <CardContent className="p-10">
        <h1 className="text-2xl font-bold mb-6">Liste des Commerciaux</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {commercials.length === 0 && !error ? (
          <p className="text-gray-500">Aucun commercial à afficher.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Nom</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Numéro de téléphone</th>
                <th className="border p-2">Régions</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {commercials.map((commercial) => (
                <tr key={commercial.id}>
                  <td className="border p-2">{commercial.name}</td>
                  <td className="border p-2">{commercial.email}</td>
                  <td className="border p-2">{commercial.phoneNumber}</td>
                  <td className="border p-2">
                    <ul className="list-disc pl-5">
                      {commercial.regions.map((region, index) => (
                        <li key={index}>{region.name}</li>
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
                        <DropdownMenuItem onClick={() => handleEdit(commercial.id)}>
                          <Edit2 className="mr-2 h-4 w-4" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(commercial.id)} className="text-red-500">
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
        <Button className="mt-6" onClick={() => router.push('/gestion-commercial')}>
          Retour
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListeCommercials;
