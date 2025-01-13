'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Vérifie si le token est présent dans le localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirige vers la page login si aucun token n'est trouvé
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Bienvenue sur le Dashboard</h1>
      <p>Ceci est une page protégée accessible uniquement aux utilisateurs connectés.</p>
      <button
        onClick={() => {
          localStorage.removeItem('token'); // Supprime le token
          router.push('/login'); // Redirige vers la page de connexion
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
}
