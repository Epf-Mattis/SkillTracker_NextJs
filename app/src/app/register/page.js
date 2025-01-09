'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit déclenché'); // Vérifie si la fonction est bien appelée
    setError('');
    setSuccess('');

    try {
      console.log('Données envoyées :', { name, email, password }); // Log des données à envoyer
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      console.log('Réponse reçue :', res); // Log de la réponse
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Une erreur est survenue.');
      }

      const data = await res.json();
      console.log('Données du serveur :', data); // Log des données de l'API
      setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Erreur :', err.message); // Log des erreurs
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
