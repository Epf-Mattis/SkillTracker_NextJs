import { useState, useEffect } from 'react';

export default function Goal() {
  const [goals, setGoals] = useState([]);
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');

  useEffect(() => {
    // Charger les objectifs
    fetch('/api/goals')
      .then((res) => res.json())
      .then((data) => setGoals(data?.goals || []))
      .catch((err) => console.error('Erreur lors du chargement des objectifs :', err));
  }, []);

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

      if (!res.ok) throw new Error('Erreur lors de l’ajout de l’objectif.');

      const data = await res.json();
      setGoals((prev) => [...prev, data.goal]);
      setNewGoalDescription('');
      setNewGoalDeadline('');
    } catch (err) {
      console.error('Erreur lors de l’ajout de l’objectif :', err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Objectifs</h2>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Description de l'objectif"
          value={newGoalDescription}
          onChange={(e) => setNewGoalDescription(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={newGoalDeadline}
          onChange={(e) => setNewGoalDeadline(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddGoal} style={styles.button}>
          Ajouter un objectif
        </button>
      </div>
      <ul style={styles.goalList}>
        {goals.map((goal, index) => (
          <li key={index} style={styles.goalItem}>
            <strong>{goal.description}</strong> - {goal.deadline}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  goalList: {
    listStyleType: 'none',
    padding: 0,
  },
  goalItem: {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
};
