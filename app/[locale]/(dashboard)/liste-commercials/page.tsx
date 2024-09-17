'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit2, Trash2, Search } from "react-feather"; // Importation des icônes
import { Input } from '@/components/ui/input';

const ListeCommercials: React.FC = () => {
  const [commercials, setCommercials] = useState<
    { id: number; name: string; email: string; phoneNumber: string; regions: { name: string }[] }[]
  >([]);
  const [filteredCommercials, setFilteredCommercials] = useState(commercials);
  const [searchTerm, setSearchTerm] = useState<string>('');
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
        setFilteredCommercials(data.commercials); // Initialiser la liste filtrée avec les commerciaux
      } catch (err) {
        console.error('Erreur lors du chargement des commerciaux:', err); 
        setError('Erreur lors du chargement des commerciaux.');
      }
    };

    fetchCommercials();
  }, []);

  useEffect(() => {
    // Filtrer les commerciaux en fonction du terme de recherche
    const filtered = commercials.filter(commercial =>
      commercial.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredCommercials(filtered);
  }, [searchTerm, commercials]);

  const handleEdit = (id: number) => {
    router.push(`/edit-commercial/${id}`);
  };

  const handleDelete = async (id: number) => {
  // Afficher une boîte de dialogue de confirmation avant de procéder à la suppression
  const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce commercial ?');

  if (confirmed) {
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
  }
};


  return (
    <Card className="w-full max-w-4xl mx-auto my-16 shadow-lg rounded-lg mt-4">
      <CardContent className="p-10">
        <h1 className="text-2xl font-bold mb-6">Liste des Commerciaux</h1>
  
        {/* Barre de recherche */}
        <div className="relative w-full mb-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </span>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom ..."
            className="pl-10 w-full"
          />
        </div>
  
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {filteredCommercials.length === 0 && !error ? (
          <p className="text-gray-500">Aucun commercial à afficher.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200"> {/* Nouveau conteneur arrondi */}
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-100">Nom</th>
                  <th className="border p-2 bg-gray-100">Email</th>
                  <th className="border p-2 bg-gray-100">Numéro de téléphone</th>
                  <th className="border p-2 bg-gray-100">Régions</th>
                  <th className="border p-2 bg-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommercials.map((commercial, index) => (
                  <tr key={commercial.id} className="hover:bg-gray-50">
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
          </div>
        )}
        <Button className="mt-6" onClick={() => router.push('/gestion-commercial')}>
          Retour
        </Button>
      </CardContent>
    </Card>
  );
  
  
  
};

export default ListeCommercials;