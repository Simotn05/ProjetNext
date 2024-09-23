"use client";

import React, { useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import Header from '../../(landing)/_res/header';
import Header2 from '../../(landing)/_res/header-v2';

const PartnershipForm: React.FC = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^(05|06|07|08)\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Le numéro de téléphone doit être au format 05xxxxxxxx/06xxxxxxxx/07xxxxxxxx/08xxxxxxxx.');
      return;
    }

    setError(null);

    try {
      const response = await fetch('/api2/partnership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Votre demande a été envoyée avec succès !');
        setFormData({
          schoolName: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <>
      <Header2/>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md font-primary w-full">
      <h2 className="text-2xl font-bold mb-6">Demande de Partenariat</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border border-input rounded-lg p-2">
          <SchoolIcon className="text-gray-500 mr-2" />
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            placeholder="Nom de l'Auto-École"
            required
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border border-input rounded-lg p-2">
          <EmailIcon className="text-gray-500 mr-2" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Adresse Email"
            required
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border border-input rounded-lg p-2">
          <PhoneIcon className="text-gray-500 mr-2" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Numéro de Téléphone"
            required
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-start border border-input rounded-lg p-2">
          <MessageIcon className="text-gray-500 mr-2" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
            rows={4}
            className="w-full outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary-dark transition"
        >
          Envoyer la Demande
        </button>
      </form>
    </div>
    </>
  );
};

export default PartnershipForm;
