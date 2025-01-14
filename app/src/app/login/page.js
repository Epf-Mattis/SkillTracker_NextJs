'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css'; // Assurez-vous que le CSS fourni est dans ce fichier.

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue.');
      }

      // Stocke le token dans le localStorage
      localStorage.setItem('token', data.token);

      // Redirige vers le Dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-title">
          <span>Sign in to your</span>
        </div>
        <div className="title-2">
          <span>SPACE</span>
        </div>

        <div className="input-container">
          <input
            className="input-mail"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <input
            className="input-pwd"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <button type="submit" className="submit">
          <span className="sign-text">Sign in</span>
        </button>

        <p className="signup-link">
          No account?{' '}
          <a href="/signup" className="up">Sign up!</a>
        </p>

        <section className="bg-stars">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </section>
      </form>
    </div>
  );
}