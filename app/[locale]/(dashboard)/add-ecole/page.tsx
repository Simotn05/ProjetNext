'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'react-feather';
import ChevronLeftIcon from '@heroicons/react/24/solid/ChevronLeftIcon';

const cities = [
  "Afourar", "Agadir", "Aghbala", "Aghbalou", "Agdz", "Agouraï", "Aguelmous",
  "Ahfir", "Aïn Leuh", "Aïn Bni Mathar", "Aïn Cheggag", "Aïn Dorij", "Aïn El Aouda",
  "Aïn Erreggada", "Aïn Harrouda", "Aïn Jemaa", "Aïn Karma", "Aïn Taoujdate",
  "Aït Iaaza", "Aït Baha", "Ait Benhaddou", "Ait Ourir", "Ait Melloul", "Ait Tamlil",
  "Ait Zineb", "Akka", "Al Hoceima", "Al Jadida", "Amizmiz", "Anoual", "Arfoud",
  "Azilal", "Azrou", "Berkane", "Beni Mellal", "Ben Guerir", "Beni Mella", "Bouarfa",
  "Boujad", "Bouizakarne", "Boulemane", "Boumia", "Bouznika", "Casablanca", "Chefchaouen",
  "Chichaoua", "Chtouka Ait Baha", "Dcheira El Jihadia", "El Ayoun", "El Hajeb",
  "El Jadida", "El Kelaa des Sraghna", "El Kelâa", "El Menzel", "El Ouatia", "El Oued",
  "Errachidia", "Essaouira", "Fès", "Figuig", "Fquih Ben Salah", "Goulmima", "Guercif",
  "Haddada", "Ifrane", "Igli", "Imlil", "Imouzzer Kandar", "Imouzzer Marmoucha",
  "Issaguen", "Jorf El Melha", "Karia", "Khemisset", "Khouribga", "Ksar El Kebir",
  "Ksar el Hadid", "Ksar Ouled Selmane", "Kssiba", "Larache", "Marrakech", "Meknes",
  "Midelt", "Moulay Bousselham", "Nador", "Ouarzazate", "Oujda", "Oulad Teima",
  "Oulad Zem", "Rabat", "Rissani", "Safi", "Salé", "Sefrou", "Sidi Kacem",
  "Sidi Slimane", "Tafraout", "Taza", "Temara", "Tiznit", "Tizi Ouzou", "Taroudant",
  "Tantan", "Taounate", "Taourirt", "Tétouan", "Tinejdad", "Tineghir", "Youssoufia",
  "Zagora", "Zenata", "Zerhoun", "Zagora", "Zouagha", "Zouitat", "Zour", "Zrarda"
];

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

const AddEcole: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [licenseTypes, setLicenseTypes] = useState<{ id: number; name: string }[]>([]);
  const [selectedLicenseTypes, setSelectedLicenseTypes] = useState<number[]>([]);
  const [vehicleCounts, setVehicleCounts] = useState<Record<number, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // const fetchLicenseTypes = async () => {
    //   try {
    //     const response = await fetch('/api3/license-types');
    //     if (response.ok) {
    //       const data = await response.json();
    //       setLicenseTypes(data.licenseTypes || []);
    //     } else {
    //       setError('Impossible de charger les types de permis.');
    //     }
    //   } catch (err) {
    //     setError('Erreur lors du chargement des types de permis.');
    //   }
    // };

    // fetchLicenseTypes();
  }, []);

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^(06|07)[0-9]{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleLicenseTypeChange = (id: number) => {
    setSelectedLicenseTypes((prev) =>
      prev.includes(id) ? prev.filter((typeId) => typeId !== id) : [...prev, id]
    );
  };

  const handleVehicleCountChange = (id: number, count: number) => {
    setVehicleCounts((prev) => ({
      ...prev,
      [id]: count
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!validatePhoneNumber(phoneNumber)) {
        setError('Le numéro de téléphone doit être au format 06XXXXXXXX ou 07XXXXXXXX.');
        setLoading(false);
        return;
    }

    try {
        const response = await fetch('/api3/ecoles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name, 
                email, 
                password, 
                city, 
                phoneNumber, 
                licenseTypes: selectedLicenseTypes,
                vehicleCounts 
            }),
        });

        if (response.ok) {
            setName('');
            setEmail('');
            setPassword('');
            setCity('');
            setPhoneNumber('');
            setSelectedLicenseTypes([]);
            setVehicleCounts({});
            setError(null);
            router.push('/add-ecole');
        } else {
            const result = await response.json();
            setError(result.error || "Une erreur est survenue lors de l'ajout de l'auto-école.");
        }
    } catch (err) {
        setError('Impossible de se connecter au serveur. Veuillez vérifier votre connexion Internet.');
    } finally {
        setLoading(false);
    }
};


  return (
    <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
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
          <h1 className="text-2xl font-bold mt-8">Ajouter une Auto-École</h1>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block mb-1">Nom</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nom de l'auto-école"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block mb-1">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email de contact"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block mb-1">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="city" className="block mb-1">Ville</Label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="block w-full border-gray-300 rounded-lg"
              required
            >
              <option value="">Sélectionner une ville</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="block mb-1">Numéro de téléphone</Label>
            <Input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Numéro de téléphone"
            />
          </div>
          <div>
            <Label className="block mb-1">Types de permis :</Label>
            
            {licenseTypesList.map((type) => (
              <div key={type.id} className="flex items-center mb-2">
               
                <input
                  type="checkbox"
                  id={`license-${type.id}`}
                  checked={selectedLicenseTypes.includes(type.id)}
                  onChange={() => handleLicenseTypeChange(type.id)}
                  className="mr-2"
                />
                <Label htmlFor={`license-${type.id}`}>{type.name}</Label>
              </div>
            ))}
          </div>
          {/* {selectedLicenseTypes.map((id) => (
            <div key={id} className="mb-4">
              <Label className="block mb-1">{licenseTypesList.find((type) => type.id === id)?.name} - Nombre de véhicules</Label>
              <Input
                type="number"
                min="0"
                value={vehicleCounts[id] || 0}
                onChange={(e) => handleVehicleCountChange(id, parseInt(e.target.value, 10))}
                className="w-full border-gray-300 rounded-lg"
              />
            </div>
          ))} */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200"
          >
            {loading ? 'Enregistrement...' : 'Ajouter'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEcole;
