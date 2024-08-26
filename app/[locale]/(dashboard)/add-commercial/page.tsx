'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const AddCommercial: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [regionIds, setRegionIds] = useState<number[]>([]);
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('/api3/regions');
        if (response.ok) {
          const data = await response.json();
          setRegions(data.regions);
        } else {
          setError('Impossible de charger les régions.');
        }
      } catch (err) {
        setError('Erreur lors du chargement des régions.');
      }
    };

    fetchRegions();
  }, []);

  const handleRegionChange = (id: number) => {
    setRegionIds((prev) =>
      prev.includes(id) ? prev.filter((regionId) => regionId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api3/commercials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phoneNumber, regionIds }),
      });

      if (response.ok) {
        // Réinitialiser les champs du formulaire après une soumission réussie
        setName('');
        setEmail('');
        setPassword('');
        setPhoneNumber('');
        setRegionIds([]);

        router.push('/add-commercial'); // Redirection vers une autre page ou rester sur la page actuelle
      } else {
        const result = await response.json();
        setError(result.error || "Une erreur est survenue lors de l'ajout du commercial.");
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
        <h1 className="text-2xl font-bold mb-6">Ajouter un Commercial</h1>
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
              placeholder="Nom du commercial"
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
              placeholder="Email du commercial"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block mb-1">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mot de passe"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="block mb-1">Numéro de téléphone</Label>
            <Input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="Numéro de téléphone du commercial"
            />
          </div>
          <div>
            <Label htmlFor="regions" className="block mb-1">Régions</Label>
            <div className="space-y-2">
              {regions.map((region) => (
                <div key={region.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`region-${region.id}`}
                    value={region.id}
                    onChange={() => handleRegionChange(region.id)}
                    checked={regionIds.includes(region.id)} // Conserve les cases cochées même après soumission
                    className="mr-2"
                  />
                  <label htmlFor={`region-${region.id}`}>{region.name}</label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Enregistrement...' : 'Ajouter Commercial'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCommercial;
