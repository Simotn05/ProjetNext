'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TextField } from '@mui/material';


const EditEtudiantPage = () => {
  const { id: ecoleId, etudiantId } = useParams(); 
  const router = useRouter();
  
  const [student, setStudent] = useState({
    username: '',
    seancesPratique: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seancesPratique, setSeancesPratique] = useState<number>(0);

  useEffect(() => {
    if (!etudiantId) return;

    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/fr/api2/dashboard_ecole/etudiants/${etudiantId}`);
        const data = response.data;
        setStudent(data);
        setSeancesPratique(data.seancesPratique || 0); 
      } catch (err) {
        console.log(err);
        setError('Erreur lors de la récupération des informations de l\'étudiant');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [etudiantId]);

  const handleSeancesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeancesPratique(Number(e.target.value));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/fr/api2/ecoles/${ecoleId}/etudiant/${etudiantId}/update`, {
        seancesPratique,
      });
      router.push(`/fr/ecole/${ecoleId}/liste-etudiants`); 
    } catch (err) {
      console.log(err);
      setError('Erreur lors de la mise à jour des séances de pratique');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['ArrowUp', 'ArrowDown', 'Backspace', 'Tab', 'Control', 'Meta'].includes(e.key)) {
      e.preventDefault();
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (

        <Card className="w-full max-w-3xl mx-auto my-16 shadow-lg rounded-lg mt-9">
          <CardContent className="p-6 flex-1">
            <h2 className="text-3xl font-bold text-center text-black mb-6">Modifier les séances de pratique</h2>

            <div className="mb-4">
              <TextField
                className='font-bold'
                label="Nom de l'étudiant"
                value={student.username}
                fullWidth
                disabled
              />
            </div>

            <div className="mb-6">
            <TextField
              label="Nombre de séances de pratique"
              type="number"
              value={seancesPratique}
              onChange={handleSeancesChange}
              fullWidth
              inputProps={{
                min: student.seancesPratique, 
                step: 1, 
                onKeyDown: handleKeyDown,
                onInput: (e) => e.preventDefault() 
              }}
            />
            </div>

            <Button color="primary" size="default" onClick={handleSave}>
              Enregistrer
            </Button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </CardContent>
        </Card>
    
  );
};

export default EditEtudiantPage;
