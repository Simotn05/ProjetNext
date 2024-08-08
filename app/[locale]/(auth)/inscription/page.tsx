'use client'; // Directive pour indiquer que ce composant est côté client
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface FormValues {
  username: string;
  email: string;
  number: string;
  password: string;
  birthdate: string; // New field for birthday
}

const SignupForm: React.FC = () => {
  const [form, setForm] = useState<FormValues>({
    username: '',
    email: '',
    number: '',
    password: '',
    birthdate: '', // New field initialized to empty string
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();   


    // Data validation (optional but recommended)
    // Check if all fields are filled and email format is valid
    // Validate birthday format (e.g., YYYY-MM-DD)

    try {
      const lang = 'fr';
      const response = await fetch(`/${lang}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Signup failed!');
      }

      console.log('Signup successful!');
      // Optionally clear the form or redirect to a confirmation page
      setForm({ username: '', email: '', number: '', password: '', birthdate: '' });
    } catch (error) {
      console.error('Signup error:', error);
      // Display an error message to the user
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto my-8">
      <CardContent className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Inscription</h1>
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
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
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
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-dark transition">S'inscrire</button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Vous avez déjà un compte ?{' '}
            <Link href="/connexion" className="text-primary hover:underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
