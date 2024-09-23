'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Eye, EyeOff } from 'react-feather'; 
import Header2 from '../../(landing)/_res/header-v2';

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState<boolean>(false); 
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api2/check-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });

        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            const redirectPath = data.user.role === 'commercial'
              ? `/commercial/${data.user.id}/acceuil`
              : data.user.role === 'ecole'
              ? `/ecole/${data.user.id}/acceuil`
              : `/userpage/${data.user.id}/acceuil`;
            router.push(redirectPath);
          }
        }
      } catch (err) {
        console.error('Erreur lors de la vérification de l’authentification:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const res = await fetch('/api2/signin', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });

      const result = await res.json();

      if (res.ok) {
        const user = result.user; 
        
        const redirectPath = user.role === 'commercial'
          ? `/commercial/${user.id}/acceuil`
          : user.role === 'ecole'
          ? `/ecole/${user.id}/acceuil`
          : `/userpage/${user.id}/acceuil`;
        router.push(redirectPath);
      } else {
        setError(result.error || 'Une erreur est survenue lors de la connexion.');
      }
    } catch (err) {
      setError('Impossible de se connecter.');
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-lg mx-auto my-8">
        <CardContent className="p-8">
          <p className="text-center">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Header2/>
    <Card className="w-full max-w-lg mx-auto my-8 mt-20">
      <CardContent className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                {showPassword ? <EyeOff /> : <Eye />} 
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-dark transition">Se connecter</button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Vous n'avez pas de compte ?{' '}
            <Link href="/inscription" className="text-primary hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
    </>
  );
};

export default LoginPage;
