"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'react-feather'; // Import des icônes
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeftIcon } from 'lucide-react';

// Utility function for phone number validation
const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^(06|07)\d{8}$/;
  return phoneRegex.test(phoneNumber);
};

// Utility function for password validation
const validatePassword = (password: string) => {
  const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const EditCommercial: React.FC = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [allRegions, setAllRegions] = useState<{ id: number; name: string }[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false); // Pour contrôler la visibilité du mot de passe
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Pour le champ de confirmation
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false); 

  useEffect(() => {
    if (!id) {
      setError('L\'ID du commercial est manquant.');
      return;
    }

    const fetchCommercial = async () => {
      try {
        const response = await axios.get(`/api3/modificationCommercial/${id}`);
        const { name, email, phoneNumber, regions, allRegions } = response.data;

        setName(name);
        setEmail(email);
        setPhoneNumber(phoneNumber);
        setRegions(regions);
        setAllRegions(allRegions);
        setSelectedRegions(regions.map((region: { id: number }) => region.id));
      } catch (error) {
        setError('Impossible de charger les détails du commercial. Veuillez réessayer plus tard.');
      }
    };

    fetchCommercial();
  }, [id]);

  useEffect(() => {
    if (error && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [error]);

  const handleRegionChange = (regionId: number) => {
    setSelectedRegions((prevSelectedRegions) => {
      if (prevSelectedRegions.includes(regionId)) {
        return prevSelectedRegions.filter(id => id !== regionId);
      } else {
        return [...prevSelectedRegions, regionId];
      }
    });
  };

  const handleSave = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Le numéro de téléphone doit être au format 06xxxxxxxx ou 07xxxxxxxx.');
      return;
    }
  
    if (password && !validatePassword(password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre.');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
  
    try {
      const response = await axios.post(`/api3/modificationCommercial/${id}`, {
        name,
        email,
        phoneNumber,
        regions: selectedRegions,
        password: password ? password : undefined,
      });
      
      setSuccess(true);
      setError(null);
      router.push('/gestion-commercial');
    } catch (error) {
      console.error('Error:', error);  // Debugging: Affichez l'erreur pour comprendre le problème
      setError('Veuillez réessayer (Email peut etre déjà utilisé).');
    }
  };
  

  return (
    <Card className="w-full max-w-xl mx-auto my-16 shadow-lg rounded-lg mt-4" ref={cardRef}>
      <CardContent className="p-10">
      <div className="relative mb-6">
        {/* Conteneur pour positionner le bouton et le titre */}
        <div className="absolute top-0 right-0">
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-red-600 text-white py-1 px-3 rounded-lg font-semibold hover:bg-red-800 transition duration-200"
          >
            <ChevronLeftIcon className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform duration-300 ease-in-out" />
          </Button>
        </div>
        <h1 className="text-2xl font-bold mt-8">Modifier un Commercial</h1> {/* Ajout d'une marge pour éviter le chevauchement */}
      </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Commercial mis à jour avec succès!</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Numéro de Téléphone</label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
          />

        </div>


        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Régions</label>
          <div className="grid grid-cols-2 gap-4">
            {allRegions.map((region) => (
              <div key={region.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`region-${region.id}`}
                  checked={selectedRegions.includes(region.id)}
                  onChange={() => handleRegionChange(region.id)}
                  className="mr-2"
                />
                <label htmlFor={`region-${region.id}`} className="text-sm text-gray-700">
                  {region.name}
                </label>
              </div>
            ))}
          </div>
        </div>


                {/* Nouveau mot de passe */}
          {showPasswordFields && (
              <>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
            <Input
              type={showPassword ? 'text' : 'password'} // Afficher en texte ou masquer
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full"
            />
            <button
              type="button"
              className="absolute inset-y-11 right-0 flex items-center px-3"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Afficher l'icône appropriée */}
            </button>
          </div>

          {/* Confirmation du mot de passe */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <Input
              type={showConfirmPassword ? 'text' : 'password'} // Afficher en texte ou masquer
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full"
            />
            <button
              type="button"
              className="absolute inset-y-11 right-0 flex items-center px-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Afficher l'icône appropriée */}
            </button>
          </div>
          </>
       )}
              <button className='underline md:hover:no-underline text-red-700 pb-3' type="button" onClick={() => setShowPasswordFields(!showPasswordFields)}>
                {showPasswordFields ? 'Masquer les champs de mot de passe' : 'Changer le mot de passe'}
              </button> 
        <Button onClick={handleSave} className="bg-red-500 text-white w-full py-2">
          Sauvegarder
        </Button>
      </CardContent>
    </Card>
  );
};

export default EditCommercial;