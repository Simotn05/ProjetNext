"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

const ListeEcolesPage: React.FC = () => {
  const params = useParams();
  const [ecoles, setEcoles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEcoles = async () => {
      try {
        const res = await fetch(`/api2/ecoles/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.ecoles)) {
            setEcoles(data.ecoles);
          } else {
            setError('Format de réponse invalide.');
          }
        } else {
          setError('Erreur lors de la récupération des auto-écoles.');
        }
      } catch (err) {
        setError('Impossible de récupérer les auto-écoles. Veuillez vérifier votre connexion Internet.');
      }
    };

    fetchEcoles();
  }, [params.id]);

  return (
    <main className="flex-1 p-6">
      <Card className="bg-white shadow-xl rounded-lg">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center text-black mb-6">Auto-École de votre Région(s)</h2>
          {ecoles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm border border-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Nom de l'école</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Téléphone</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Ville</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Nombre d'étudiant</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ecoles.map((ecole) => (
                    <tr key={ecole.id} className="border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-4 text-gray-800">{ecole.name}</td>
                      <td className="py-4 px-4 text-gray-800">{ecole.email}</td>
                      <td className="py-4 px-4 text-gray-800">{ecole.phoneNumber}</td>
                      <td className="py-4 px-4 text-gray-800">{ecole.city}</td>
                      <td className="py-4 px-4 text-gray-800">Pas encore</td>
                      <td className="py-4 px-4 text-gray-800">
                        <button className="text-blue-500 hover:underline">Modifier</button>
                        <button className="text-red-500 hover:underline ml-4">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-xl font-medium text-gray-600">Aucune auto-école trouvée.</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default ListeEcolesPage;
