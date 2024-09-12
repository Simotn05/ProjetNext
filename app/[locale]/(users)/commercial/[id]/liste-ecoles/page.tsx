"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

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

  // Fonction pour formater la date sans l'heure
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <main className="flex-1 p-6">
      <Card className="bg-white shadow-xl rounded-lg">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-center text-black mb-6">Auto-École de votre Région(s)</h2>
          {ecoles.length > 0 ? (
            <div className="overflow-x-auto">
              <div className="flex flex-col space-y-4 md:space-y-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ecoles.map((ecole) => (
                    <div
                      key={ecole.id}
                      className="flex flex-col md:flex-row border border-gray-300 rounded-lg p-4 shadow-sm hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-1 mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold text-gray-800">Ecole "{ecole.name}"</h3>
                        <p className="text-gray-800 hidden lg:block">Numéro : {ecole.phoneNumber}</p>
                        <p className="text-gray-600">Ville : {ecole.city}</p>
                        {/* <p className="text-gray-600">{formatDate(ecole.createdAt)}</p> */}
                      </div>
                     
                    </div>
                  ))}
                </div>
              </div>
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
