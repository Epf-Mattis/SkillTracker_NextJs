'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [skills, setSkills] = useState([]);
  const [goals, setGoals] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => setSkills(data.skills))
      .catch((err) => console.error('Erreur lors du chargement des compétences :', err));

    fetch('/api/goals')
      .then((res) => res.json())
      .then((data) => setGoals(data.goals))
      .catch((err) => console.error('Erreur lors du chargement des objectifs :', err));

    fetch('/api/quiz')
      .then((res) => res.json())
      .then((data) => setQuizQuestions(data.questions))
      .catch((err) => console.error('Erreur lors du chargement des quiz :', err));
  }, []);

  const handleAddSkill = async () => {
    if (!newSkill) return;

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSkill, userId: 1 }),
      });

      if (!res.ok) throw new Error('Erreur lors de l’ajout de la compétence.');

      const data = await res.json();
      setSkills((prev) => [...prev, data.skill]);
      setNewSkill('');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal || !newDeadline) return;

    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: newGoal,
          deadline: newDeadline,
          userId: 1,
        }),
      });

      if (!res.ok) throw new Error('Erreur lors de l’ajout de l’objectif.');

      const data = await res.json();
      setGoals((prev) => [...prev, data.goal]);
      setNewGoal('');
      setNewDeadline('');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleQuizSubmit = () => {
    const currentQuestion = quizQuestions[quizIndex];
    if (!currentQuestion) return;

    if (quizAnswer === currentQuestion.answer) {
      alert('Bonne réponse !');
    } else {
      alert('Mauvaise réponse !');
    }

    setQuizAnswer('');
    setQuizIndex((prev) => prev + 1);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tableau de bord</h1>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Compétences</h2>
        <ul style={styles.list}>
          {skills.map((skill) => (
            <li key={skill.id} style={styles.listItem}>
              <strong>{skill.name}</strong> - Niveau : {skill.level}
            </li>
          ))}
        </ul>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            placeholder="Nouvelle compétence"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button style={styles.button} onClick={handleAddSkill}>
            Ajouter
          </button>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Objectifs</h2>
        <ul style={styles.list}>
          {goals.map((goal) => (
            <li key={goal.id} style={styles.listItem}>
              <strong>{goal.description}</strong> - Échéance :{' '}
              {new Date(goal.deadline).toLocaleDateString()}
            </li>
          ))}
        </ul>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            placeholder="Nouvel objectif"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <input
            style={styles.input}
            type="date"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
          />
          <button style={styles.button} onClick={handleAddGoal}>
            Ajouter
          </button>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Quiz</h2>
        {quizQuestions[quizIndex] && (
          <div>
            <p>{quizQuestions[quizIndex].question}</p>
            <div style={styles.quizOptions}>
              {quizQuestions[quizIndex].options.map((option, index) => (
                <button
                  key={index}
                  style={styles.button}
                  onClick={() => setQuizAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button style={styles.button} onClick={handleQuizSubmit}>
              Soumettre
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    color: '#444',
  },
  section: {
    marginBottom: '40px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '20px',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  input: {
    flex: 1,
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
  quizOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
  },
};
