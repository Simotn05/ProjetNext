"use client";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

const AttribuerEcolePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [ecoles, setEcoles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedEcole, setSelectedEcole] = useState<number | null>(null);
  const [etudiantPermisType, setEtudiantPermisType] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!params.id || !params.etudiantId) {
          setError('Les paramètres de la requête sont manquants.');
          return;
        }
  
        const etudiantRes = await fetch(`/api2/commercial/${params.id}/etudiants/${params.etudiantId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (etudiantRes.ok) {
          const etudiantData = await etudiantRes.json();
          console.log('Données de l\'étudiant:', etudiantData);
          setEtudiantPermisType(etudiantData.drivingLicenseType);
        } else {
          setError('Erreur lors de la récupération des informations de l\'étudiant.');
          return;
        }
  
        const ecolesRes = await fetch(`/api2/auto-ecoles?commercialId=${params.id}&etudiantId=${params.etudiantId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (ecolesRes.ok) {
          const data = await ecolesRes.json();
          console.log('Données des auto-écoles:', data);
          console.log('Type de permis de l\'étudiant:', etudiantPermisType);
  
          const filteredEcoles = data.filter((ecole: any) => {
            console.log('Types de permis de l\'école:', ecole.licenseTypes);
            return ecole.licenseTypes.some((licenseType: any) => licenseType.name === etudiantPermisType);
          });
          console.log('Auto-écoles filtrées:', filteredEcoles);
          setEcoles(filteredEcoles);
        } else {
          setError('Erreur lors de la récupération des auto-écoles.');
        }
      } catch (err) {
        setError('Impossible de récupérer les données. Veuillez vérifier votre connexion Internet.');
      }
    };
  
    fetchData();
  }, [params.id, params.etudiantId, etudiantPermisType]);
  

  const handleAttribuerEcole = async () => {
    if (selectedEcole === null || !params.etudiantId) return;

    try {
      const res = await fetch(`/api2/attribuer-ecole`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          etudiantId: params.etudiantId,
          ecoleId: selectedEcole
        }),
        credentials: 'include',
      });

      if (res.ok) {
        router.push(`/fr/commercial/${params.id}/liste-etudiants`);
      } else {
        const errorData = await res.json();
        setError(`Erreur lors de l'attribution de l'auto-école: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      setError('Impossible d\'attribuer l\'auto-école. Veuillez vérifier votre connexion Internet.');
    }
  };

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto my-16 shadow-lg rounded-lg">
        <CardContent className="p-6">
          <p className="text-red-500 text-center text-lg font-semibold">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex min-h-screen bg-white-100">
      <main className="flex-1 p-6">
        <Card className="w-full bg-white shadow-xl rounded-lg flex flex-col">
          <CardContent className="p-6 flex-1">
            <h2 className="text-3xl font-bold text-center text-black mb-6">Attribuer une Auto-école</h2>
            {ecoles.length > 0 ? (
              <div className="overflow-x-auto">
                <select
                  onChange={(e) => setSelectedEcole(Number(e.target.value))}
                  className="block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Sélectionnez une auto-école</option>
                  {ecoles.map((ecole) => (
                    <option key={ecole.id} value={ecole.id}>
                      {ecole.name} - {ecole.city}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAttribuerEcole}
                  className="mt-4 inline-flex justify-center rounded-md border border-gray-300 bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Attribuer
                </button>
              </div>
            ) : (
              <p className="text-center text-xl font-medium text-gray-600">Aucune auto-école disponible pour le cas de cet étudiant.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AttribuerEcolePage;
