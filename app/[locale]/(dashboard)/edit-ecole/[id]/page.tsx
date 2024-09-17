'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Eye, EyeOff } from 'react-feather';
import { Input } from '@/components/ui/input';
import { ChevronLeftIcon } from 'lucide-react';


const licenseTypesList = [
  { id: 1, name: "AM : Cyclomoteur" },
  { id: 2, name: "A1 : Motocyclette légère" },
  { id: 3, name: "A : Motocyclette" },
  { id: 4, name: "B : Véhicule léger" },
  { id: 5, name: "EB : Véhicule léger avec remorque" },
  { id: 6, name: "C : Véhicule de plus de 3,5 tonnes" },
  { id: 7, name: "EC : Camion avec remorque" },
  { id: 8, name: "D : Véhicule transportant des passagers" },
  { id: 9, name: "ED : Véhicule de transport en commun avec remorque" },
];

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const EditEcole: React.FC = () => {
  const { id } = useParams();
  const [ecole, setEcole] = useState<{
    name: string;
    // email: string;
    phoneNumber: string;
    licenseTypes: { name: string }[];
    regionId?: number;
  } | null>(null);
  const [initialCheckedLicenseTypes, setInitialCheckedLicenseTypes] = useState<string[]>([]);
  const [selectedLicenseTypes, setSelectedLicenseTypes] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setError("ID de l'école non défini.");
      setLoading(false);
      return;
    }

    const fetchEcole = async () => {
      try {
        const response = await fetch(`/api3/modificationEcole/${id}`);

        if (!response.ok) {
          throw new Error(`Erreur de récupération des données, status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.ecole) {
          throw new Error("Données de l'école manquantes dans la réponse.");
        }

        setEcole(data.ecole);
        const initialChecked = data.ecole.licenseTypes.map((type: { name: string }) => type.name);
        setInitialCheckedLicenseTypes(initialChecked);
        setSelectedLicenseTypes(initialChecked);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'école:', err);
        setError('Erreur lors du chargement de l\'école.');
      } finally {
        setLoading(false);
      }
    };

    fetchEcole();
  }, [id]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedLicenseTypes(prev =>
      checked ? [...prev, value] : prev.filter(type => type !== value)
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Validation des mots de passe
    if (newPassword && (newPassword !== confirmPassword || !passwordRegex.test(newPassword))) {
      setError('Le mot de passe ne correspond pas au format requis.');
      return;
    }

    const updatedEcole = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      licenseTypes: licenseTypesList.filter(type => selectedLicenseTypes.includes(type.name)).map(type => ({ name: type.name })),
      regionId: formData.get('regionId') ? parseInt(formData.get('regionId') as string) : undefined,
      password: newPassword || undefined, // Envoyer le mot de passe uniquement s'il est défini
    };

    try {
      const response = await fetch(`/api3/modificationEcole/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEcole),
      });

      if (response.ok) {
        router.push('/liste-ecoles');
      } else {
        const result = await response.json();
        setError(result.error ||'Erreur')
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'école:', err);
      setError('Erreur lors de la mise à jour de l\'école.');
    }
  };

 
  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  return (
    <div className="container mx-auto px-4">
      {ecole ? (
        <Card className="w-full max-w-4xl mx-auto my-16 shadow-lg rounded-lg mt-4">
          <CardContent className="p-10">
          <div className="relative mb-6">
          <div className="absolute top-0 right-0">
            <Button
              type="button"
              onClick={() => router.back()}
              className="bg-red-600 text-white py-1 px-3 rounded-lg font-semibold hover:bg-red-800 transition duration-200"
            >
              <ChevronLeftIcon className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform duration-300 ease-in-out" />
            </Button>
          </div>
          <h1 className="text-2xl font-bold mt-8">Modifier l'auto-École</h1>
        </div>
            {error && (
            <div className="text-red-700 rounded relative mb-6" role="alert">
              <span >{error}</span>
            </div>
              )}
            <form onSubmit={handleSubmit} className="relative">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={ecole.name}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  required
                  aria-required="true"
                />
              </div>
              {/* <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={ecole.email}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  required
                  aria-required="true"
                />
              </div> */}
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  defaultValue={ecole.phoneNumber}
                  pattern="06[0-9]{8}|07[0-9]{8}"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  required
                  aria-required="true"
                />
                <p className="text-xs text-gray-500">Format : 06xxxxxxxx ou 07xxxxxxxx</p>
              </div>
      
              <fieldset className="mb-4">
              <legend className="block text-sm font-medium text-gray-700">Type de permis</legend>
              <div className="mt-1">
                {licenseTypesList.map(type => (
                  <div key={type.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`licenseType-${type.id}`}
                      value={type.name}
                      checked={selectedLicenseTypes.includes(type.name)}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <label htmlFor={`licenseType-${type.id}`} className="text-sm text-gray-700">{type.name}</label>

                    {/* Icône et message uniquement pour les cases initialement cochées */}
                    {initialCheckedLicenseTypes.includes(type.name) && selectedLicenseTypes.includes(type.name) && (
                      <div className="flex items-center text-red-500 ml-4">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span className="text-sm">Attention : La suppression de ce type pourrait affecter les étudiants.</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>
              {showPasswordFields && (
                <>
                  <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        minLength={8}
                        required
                        aria-required="true"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showNewPassword ? <EyeOff className="h-5 w-5 text-black-400" /> : <Eye className="h-5 w-5 text-black-400" />}
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 ">Confirmer le mot de passe</label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        minLength={8}
                        required
                        aria-required="true"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5 text-black-400" /> : <Eye className="h-5 w-5 text-black-400" />}
                      </button>
                    </div>
                  </div>
                </>
              )}
              <button className='underline md:hover:no-underline text-red-700' type="button" onClick={() => setShowPasswordFields(!showPasswordFields)}>
                {showPasswordFields ? 'Masquer les champs de mot de passe' : 'Changer le mot de passe'}
              </button>
              <br />
              <Button type="submit" className="mt-4 w-full" disabled={loading}>
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <p className="text-center mt-10"></p>
      )}
    </div>
  );
};

export default EditEcole;