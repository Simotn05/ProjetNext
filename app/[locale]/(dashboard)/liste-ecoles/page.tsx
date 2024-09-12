'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assurez-vous d'importer votre composant Input
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit2, Trash2, Search } from "react-feather"; // Importation des icônes

const ListeEcoles: React.FC = () => {
  const [ecoles, setEcoles] = useState<
    { id: number; name: string; email: string; phoneNumber: string; city: string; licenseTypes: { name: string }[] }[]
  >([]);
  const [filteredEcoles, setFilteredEcoles] = useState(ecoles); // État pour stocker la liste filtrée
  const [searchTerm, setSearchTerm] = useState(''); // État pour stocker le texte de recherche
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchEcoles = async () => {
      try {
        const response = await fetch('/api3/list-ecole'); 
        if (!response.ok) {
          throw new Error('Réponse réseau non ok');
        }
        const data = await response.json();
        console.log('Data reçue:', data); 
        setEcoles(data.ecoles); 
        setFilteredEcoles(data.ecoles); // Initialiser la liste filtrée avec toutes les auto-écoles
      } catch (err) {
        console.error('Erreur lors du chargement des auto-écoles:', err); 
        setError('Erreur lors du chargement des auto-écoles.');
      }
    };

    fetchEcoles();
  }, []);

  // Fonction pour gérer la recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setFilteredEcoles(ecoles); // Si la recherche est vide, réinitialiser la liste
    } else {
      const filtered = ecoles.filter((ecole) =>
        ecole.name.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
        ecole.email.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
        ecole.phoneNumber.toLowerCase().startsWith(event.target.value.toLowerCase()) ||
        ecole.city.toLowerCase().startsWith(event.target.value.toLowerCase()) 

      );
      setFilteredEcoles(filtered);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/edit-ecole/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api3/delete-ecole/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEcoles(ecoles.filter((ecole) => ecole.id !== id));
        setFilteredEcoles(filteredEcoles.filter((ecole) => ecole.id !== id)); // Mettre à jour la liste filtrée
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
    <Card className="w-full max-w-4xl mx-auto my-16 shadow-lg rounded-lg mt-4">
      <CardContent className="p-10">
        <h1 className="text-2xl font-bold mb-6">Liste des Auto-écoles</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {/* Barre de recherche */}
        <div className="relative w-full mb-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </span>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Rechercher (par nom, numéro, ville, email) ..."
            className="pl-10 w-full"
          />
        </div>
  
        {filteredEcoles.length === 0 && !error ? (
          <p className="text-gray-500">Aucune auto-école à afficher.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-100">Nom</th>
                  <th className="border p-2 bg-gray-100">Email</th>
                  <th className="border p-2 bg-gray-100">Numéro de téléphone</th>
                  <th className="border p-2 bg-gray-100">Ville</th>
                  <th className="border p-2 bg-gray-100">Types de permis</th>
                  <th className="border p-2 bg-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEcoles.map((ecole, index) => (
                  <tr
                    key={ecole.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-white'
                    }`}
                  >
                    <td className="border p-2 rounded-l-lg">{ecole.name}</td>
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
                    <td className="border p-2 rounded-r-lg text-center align-middle">
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
          </div>
        )}
        <Button className="mt-6" onClick={() => router.push('/gestion-ecoles')}>
          Retour
        </Button>
      </CardContent>
    </Card>
  );
  
};

export default ListeEcoles;