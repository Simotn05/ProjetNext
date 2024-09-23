'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const StatistiquesPage = () => {
  const { id } = useParams();
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const [studentsByEcole, setStudentsByEcole] = useState<{ ecoleName: string; count: number }[]>([]);
  const [regionsCount, setRegionsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api2/dashboard_commercial/statistiques/${id}`);
        const { studentsCount, studentsByEcole, regionsCount } = response.data;

        setStudentsCount(studentsCount);
        setStudentsByEcole(studentsByEcole || []); 
        setRegionsCount(regionsCount || 0); 
      } catch (err) {
        console.log(err);
        setError('Erreur lors de la récupération des statistiques');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">{error}</div>;
  }

  const ecoleNames = studentsByEcole.map((data) => data.ecoleName);
  const ecoleCounts = studentsByEcole.map((data) => data.count);

  const total = ecoleCounts.reduce((sum, count) => sum + count, 0);

  const ecoleData = {
    labels: ecoleNames,
    datasets: [
      {
        label: 'Nombre d\'étudiants par École',
        data: ecoleCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Étudiants par École',
      },
      datalabels: {
        formatter: (value: number) => {
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
        font: {
          weight: 'bold' as const,
        },
        anchor: 'end' as const,
        align: 'end' as const,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        <Card className="w-full bg-white shadow-xl rounded-lg flex flex-col mb-6">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold text-center text-black mb-6">Statistiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm rounded-lg p-6 flex flex-col items-center justify-center">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4 text-center">Nombre d'Étudiants</h3>
                  <p className="text-2xl font-bold text-center">{studentsCount}</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm rounded-lg p-6 flex flex-col items-center justify-center">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-4 text-center">Nombre de Régions</h3>
                  <p className="text-2xl font-bold text-center">{regionsCount}</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-white shadow-xl rounded-lg flex flex-col mb-6">
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-center">Répartition des Étudiants liés au commercial par École</h3>
            <div className="flex justify-center items-center w-full h-[300px] md:h-[400px]">
              <Pie data={ecoleData} options={options} />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StatistiquesPage;
