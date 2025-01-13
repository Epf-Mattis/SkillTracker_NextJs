import { useState } from 'react';

export default function GoalsForm({ setGoals }) {
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');

  const handleAddGoal = async () => {
    if (!newGoalDescription || !newGoalDeadline) {
      alert('Veuillez remplir tous les champs pour ajouter un objectif.');
      return;
    }

    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: newGoalDescription,
          deadline: newGoalDeadline,
          userId: 1, // Exemple d'ID utilisateur
        }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l’ajout de l’objectif.');
      }

      const data = await res.json();
      setGoals((prev) => [...prev, data.goal]);
      setNewGoalDescription('');
      setNewGoalDeadline('');
    } catch (err) {
      console.error('Erreur lors de l’ajout de l’objectif :', err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Description de l'objectif"
        value={newGoalDescription}
        onChange={(e) => setNewGoalDescription(e.target.value)}
      />
      <input
        type="date"
        value={newGoalDeadline}
        onChange={(e) => setNewGoalDeadline(e.target.value)}
      />
      <button onClick={handleAddGoal}>Ajouter un objectif</button>
    </div>
  );
}
