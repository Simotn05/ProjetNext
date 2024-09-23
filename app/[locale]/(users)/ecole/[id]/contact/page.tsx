'use client'; 

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Commercial {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

const ContactPage = () => {
  const { id } = useParams(); 
  const [commercials, setCommercials] = useState<Commercial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; 

    const fetchCommercials = async () => {
      try {
        const response = await axios.get(`/api2/dashboard_ecole/commercials/region?schoolId=${id}`); 
        setCommercials(response.data.commercials);
      } catch (err) {
        console.log(err);
        setError('Erreur lors de la récupération des commerciaux');
      } finally {
        setLoading(false);
      }
    };

    fetchCommercials();
  }, [id]); 

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-black-600 mb-6">Contactez les commerciaux :</h1>
      {commercials.length === 0 ? (
        <p className="text-gray-600 text-lg">Aucun commercial trouvé dans votre région.</p>
      ) : (
        <ul className="space-y-6">
          {commercials.map((commercial) => (
            <li key={commercial.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800">{commercial.name}</h2>
              {/* <p className="text-gray-600">Email :{commercial.email}</p> */}
              <p className="text-gray-600">Téléphone :<a className="text-red-600"> {commercial.phoneNumber}</a></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default ContactPage;
