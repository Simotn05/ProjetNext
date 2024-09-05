'use client'; 
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Eye, EyeOff } from 'react-feather'; // Assurez-vous d'installer react-feather pour les icônes
import Header2 from '../../(landing)/_res/header-v2';

interface FormValues {
  username: string;
  email: string;
  number: string;
  password: string;
  birthdate: string; 
  drivingLicenseType: string; 
  regionId: number;
  villeId: number;
}

const SignupForm: React.FC = () => {
  const [form, setForm] = useState<FormValues>({
    username: '',
    email: '',
    number: '',
    password: '',
    birthdate: '',
    drivingLicenseType: '', 
    regionId: 0,
    villeId: 0
  });

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false); // État pour afficher ou masquer le mot de passe
  const [regions, setRegions] = useState<{ id: number, name: string }[]>([]);
  const [villes, setVilles] = useState<{ id: number, name: string }[]>([]);
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null); // Référence à l'élément du formulaire

  useEffect(() => {
    const fetchRegions = async () => {
      const response = await fetch('/api2/regions'); // Assurez-vous que cette API est disponible
      const data = await response.json();
      setRegions(data);
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    if (form.regionId) {
      const fetchVilles = async () => {
        const response = await fetch(`/api2/villes?regionId=${form.regionId}`); // Assurez-vous que cette API est disponible
        const data = await response.json();
        setVilles(data);
      };

      fetchVilles();
    } else {
      setVilles([]);
    }
  }, [form.regionId]);

  useEffect(() => {
    if (error && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérification de l'âge
    const today = new Date();
    const birthDate = new Date(form.birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setError('Vous devez avoir au moins 18 ans pour vous inscrire.');
      return;
    }

    try {
      const lang = 'fr';
      const response = await fetch(`/${lang}/api2/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Échec de l\'inscription!');
      }

      console.log('Inscription réussie!');
      setForm({ username: '', email: '', number: '', password: '', birthdate: '', drivingLicenseType: '', regionId: 0, villeId: 0 });
      setError(null);
      router.push('/connexion');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Une erreur inconnue est survenue');
      }
      console.error('Erreur d\'inscription:', error);
    }
  };

  return (
    <><Header2/>
    <Card className="w-full max-w-lg mx-auto my-8 mt-20" ref={formRef}>
      <CardContent className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Inscription</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="number" className="block mb-2 text-sm font-medium">Numéro</label>
            <input
              type="text"
              id="number"
              name="number"
              value={form.number}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />} {/* Icône pour afficher/masquer le mot de passe */}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="birthdate" className="block mb-2 text-sm font-medium">Date de naissance</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={form.birthdate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="drivingLicenseType" className="block mb-2 text-sm font-medium">Type de permis de conduire</label>
            <select
              id="drivingLicenseType"
              name="drivingLicenseType"
              value={form.drivingLicenseType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Sélectionnez un type de permis</option>
              <option value="AM : Cyclomoteur">AM (Cyclomoteur)</option>
              <option value="A1 : Motocyclette légère">A1 (Motocyclette légère)</option>
              <option value="A : Motocyclette">A (Motocyclette)</option>
              <option value="B : Véhicule léger">B (Véhicule léger)</option>
              <option value="EB : Véhicule léger avec remorque">EB (Véhicule léger avec remorque)</option>
              <option value="C : Véhicule de plus de 3,5 tonnes">C (Véhicule de plus de 3,5 tonnes)</option>
              <option value="EC : Camion avec remorque">EC (Camion avec remorque)</option>
              <option value="D : Véhicule transportant des passagers">D (Véhicule transportant des passagers)</option>
              <option value="ED : Véhicule de transport en commun avec remorque">ED (Véhicule de transport en commun avec remorque)</option>
            </select>
          </div>
          <div>
            <label htmlFor="regionId" className="block mb-2 text-sm font-medium">Région</label>
            <select
              id="regionId"
              name="regionId"
              value={form.regionId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Sélectionnez une région</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="villeId" className="block mb-2 text-sm font-medium">Ville</label>
            <select
              id="villeId"
              name="villeId"
              value={form.villeId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={!form.regionId} // Désactiver le champ ville si aucune région n'est sélectionnée
              required
            >
              <option value="">Sélectionnez une ville</option>
              {villes.map((ville) => (
                <option key={ville.id} value={ville.id}>{ville.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            S'inscrire
          </button>
        </form>
        <p className="text-sm text-center">
        <br />
          Vous avez déjà un compte ? <Link href="/connexion" className="text-primary">Connectez-vous</Link>
        </p>
      </CardContent>
    </Card>
    </>
  );
};

export default SignupForm;
