'use client';

import { useEffect, useState } from 'react';

type Region = {
  name: string;
};

type Ville = {
  name: string;
};

type Commercial = {
  name: string;
};

type Ecole = {
  name: string;
};

type Etudiant = {
  id: number;
  username: string;
  email: string;
  number: string;
  birthdate: string;
  drivingLicenseType: string;
  region: Region;
  ville: Ville;
  commercial?: Commercial;
  ecole?: Ecole;
  createdAt: string;
};

const EtudiantsPage = () => {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const response = await fetch('/api3/students');
        const data: Etudiant[] = await response.json();
        if (response.ok) {
          setEtudiants(data);
        } else {
          setError('Erreur lors du chargement des étudiants');
        }
      } catch (err) {
        setError('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    };

    fetchEtudiants();
  }, []);

  if (loading) return <p>Chargement des étudiants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Gestion des Étudiants</h1>
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Numéro</th>
            <th>Date de naissance</th>
            <th>Type de permis</th>
            <th>Région</th>
            <th>Ville</th>
            <th>Commercial</th>
            <th>Ecole</th>
            <th>Date de création</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map((etudiant) => (
            <tr key={etudiant.id}>
              <td>{etudiant.id}</td>
              <td>{etudiant.username}</td>
              <td>{etudiant.email}</td>
              <td>{etudiant.number}</td>
              <td>{new Date(etudiant.birthdate).toLocaleDateString()}</td>
              <td>{etudiant.drivingLicenseType}</td>
              <td>{etudiant.region?.name || 'Aucune'}</td>
              <td>{etudiant.ville?.name || 'Aucune'}</td>
              <td>{etudiant.commercial?.name || 'Aucun'}</td>
              <td>{etudiant.ecole?.name || 'Aucune'}</td>
              <td>{new Date(etudiant.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EtudiantsPage;
