"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';

const EditCommercial: React.FC = () => {
  const { id } = useParams(); // Récupération de l'ID depuis les paramètres de l'URL
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [allRegions, setAllRegions] = useState<{ id: number; name: string }[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setError('ID du commercial manquant.');
      return;
    }

    const fetchCommercial = async () => {
      try {
        const response = await axios.get(`/api3/modificationCommercial/${id}`);
        const { name, email, phoneNumber, regions, allRegions } = response.data;

        // Initialiser les champs d'entrée avec les données récupérées
        setName(name);
        setEmail(email);
        setPhoneNumber(phoneNumber);
        setRegions(regions); // Initialiser les régions déjà associées
        setAllRegions(allRegions); // Initialiser toutes les régions disponibles
        setSelectedRegions(regions.map((region: { id: number }) => region.id)); // Sélectionner les régions associées
      } catch (error) {
        console.error('Erreur lors du chargement des détails du commercial:', error);
        setError('Erreur lors du chargement des détails.');
      }
    };

    fetchCommercial();
  }, [id]);

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
    try {
      await axios.post(`/api3/modificationCommercial/${id}`, {
        name,
        email,
        phoneNumber,
        regions: selectedRegions, // Inclure les régions sélectionnées
      });
      setSuccess(true);
      setError(null);
      router.push('/gestion-commercial');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commercial:', error);
      setError('Erreur lors de la mise à jour du commercial.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-16 shadow-lg rounded-lg">
      <CardContent className="p-10">
        <h1 className="text-2xl font-bold mb-6">Modifier Commercial</h1>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Numéro de Téléphone</label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Régions</label>
          <div className="mt-2">
            {allRegions.map((region) => (
              <div key={region.id} className="flex items-center mb-2">
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
        <Button onClick={handleSave} className="bg-blue-500 text-white w-full py-2">
          Sauvegarder
        </Button>
      </CardContent>
    </Card>
  );
};

export default EditCommercial;
