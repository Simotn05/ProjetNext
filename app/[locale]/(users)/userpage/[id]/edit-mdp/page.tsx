'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Eye, EyeOff } from 'react-feather';

const ChangePasswordPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const params = useParams(); 

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }

    try {
      const res = await fetch(`/api2/change-password/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
        credentials: 'include',
      });

      if (res.ok) {
        setSuccess('Le mot de passe a été mis à jour avec succès.');
        setError(null);
        setTimeout(() => {
          router.push(`/userpage/${params.id}/profile`);
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.error || 'Une erreur est survenue lors de la mise à jour du mot de passe.');
      }
    } catch (err) {
      setError('Impossible de changer le mot de passe. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="flex justify-center w-full max-w-lg mx-auto my-16 shadow-lg rounded-lg m-10 p-10">
      <div className="max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Changer le mot de passe</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handlePasswordChange}>
          <div className="mb-4 relative">
            <label htmlFor="currentPassword" className="block font-medium text-gray-700">Mot de passe actuel</label>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
            <button
              type="button"
              className="absolute inset-y-7 right-0 px-3 py-2 text-gray-500"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="newPassword" className="block font-medium text-gray-700">Nouveau mot de passe</label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
            <button
              type="button"
              className="absolute inset-y-7 right-0 px-3 py-2 text-gray-500"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
            <button
              type="button"
              className="absolute inset-y-7 right-0 px-3 py-2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="text-center">
            <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;