'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'react-feather'; // Import des icônes pour afficher/cacher le mot de passe
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const EditMdpPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Récupère l'ID de l'URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [etudiantName, setEtudiantName] = useState(''); // Pour stocker le nom de l'étudiant
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // État pour gérer la visibilité du mot de passe de confirmation

  // Récupérer les informations de l'étudiant
  useEffect(() => {
    const fetchEtudiant = async () => {
      try {
        const response = await fetch(`/api3/students/${id}`);
        const data = await response.json();

        if (response.ok) {
          setEtudiantName(data.username); // Stocke le nom de l'étudiant
        } else {
          setError('Erreur lors de la récupération des informations de l\'étudiant.');
        }
      } catch (err) {
        setError('Erreur de connexion.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEtudiant();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`/api3/students/${id}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setSuccess('Mot de passe modifié avec succès.');
        router.push('/gestion-etudiants'); // Redirection après succès
      } else {
        setError('Une erreur est survenue.');
      }
    } catch (err) {
      setError('Erreur de connexion.');
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <Card className="w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg">
      <CardContent className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Modifier le mot de passe {etudiantName ? `de : "${etudiantName}"` : ''}
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-black-500 focus:outline-none p-1"
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-black-500 focus:outline-none p-1"
            >
              {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          <Button type="submit" className="w-full">
            Modifier
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditMdpPage;
