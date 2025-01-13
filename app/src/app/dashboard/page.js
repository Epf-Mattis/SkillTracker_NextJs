'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('skills');
  const [skills, setSkills] = useState([]);
  const [goals, setGoals] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  // States pour les formulaires
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');

  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  // Charger les données au chargement de la page
  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => setSkills(data?.skills || []))
      .catch((err) => console.error('Erreur lors du chargement des compétences :', err));

    fetch('/api/goals')
      .then((res) =>        res.json())
      .then((data) => setGoals(data?.goals || []))
      .catch((err) => console.error('Erreur lors du chargement des objectifs :', err));

    fetch('/api/quiz')
      .then((res) => res.json())
      .then((data) => setQuizQuestions(data?.quizzes || []))
      .catch((err) => console.error('Erreur lors du chargement des quiz :', err));
  }, []);

  // Ajouter une compétence
  const handleAddSkill = async () => {
    if (!newSkillName || !newSkillLevel) {
      alert('Veuillez remplir tous les champs pour ajouter une compétence.');
      return;
    }

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newSkillName,
          level: newSkillLevel,
          userId: 1, // Exemple d'ID utilisateur
        }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l’ajout de la compétence.');
      }

      const data = await res.json();
      setSkills((prev) => [...prev, data.skill]);
      setNewSkillName('');
      setNewSkillLevel('');
    } catch (err) {
      console.error('Erreur lors de l’ajout de la compétence :', err.message);
    }
  };

  // Ajouter un objectif
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

  // Ajouter un quiz
  const handleAddQuiz = async () => {
    if (!newQuestion || !correctAnswer || newOptions.some((opt) => !opt)) {
      alert('Veuillez remplir tous les champs du formulaire de quiz.');
      return;
    }

    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: newQuestion,
          options: newOptions,
          answer: correctAnswer,
          userId: 1, // Exemple d'ID utilisateur
        }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l’ajout du quiz.');
      }

      const data = await res.json();
      setQuizQuestions((prev) => [...prev, data.quiz]);
      setNewQuestion('');
      setNewOptions(['', '', '', '']);
      setCorrectAnswer('');
    } catch (err) {
      console.error('Erreur lors de l’ajout du quiz :', err.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.profile}>
          <div style={styles.avatar}></div>
          <p>Name</p>
          <p>Mail</p>
        </div>
        <nav style={styles.nav}>
          <button style={styles.navButton} onClick={() => setActiveSection('skills')}>
            Skills
          </button>
          <button style={styles.navButton} onClick={() => setActiveSection('goals')}>
            Goals
          </button>
          <button style={styles.navButton} onClick={() => setActiveSection('quiz')}>
            Quiz
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main style={styles.mainContent}>
        {activeSection === 'skills' && (
          <section>
            <h2>Skills</h2>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Nom de la compétence"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Niveau (Débutant, Intermédiaire, Avancé)"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleAddSkill} style={styles.button}>
                Ajouter une compétence
              </button>
            </div>
            <ul style={styles.list}>
              {skills.map((skill, index) => (
                <li key={index} style={styles.listItem}>
                  <strong>{skill.name}</strong> - {skill.level}
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeSection === 'goals' && (
          <section>
            <h2>Goals</h2>
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
            <ul style={styles.list}>
              {goals.map((goal, index) => (
                <li key={index} style={styles.listItem}>
                  <strong>{goal.description}</strong> - {goal.deadline}
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeSection === 'quiz' && (
          <section>
            <h2>Créer un quiz</h2>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                style={styles.input}
              />
              {newOptions.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...newOptions];
                    updatedOptions[index] = e.target.value;
                    setNewOptions(updatedOptions);
                  }}
                  style={styles.input}
                />
              ))}
              <input
                type="text"
                placeholder="Réponse correcte"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleAddQuiz} style={styles.button}>
                Ajouter le quiz
              </button>
            </div>
            <ul style={styles.list}>
              {quizQuestions.length > 0 ? (
                quizQuestions.map((quiz, index) => (
                  <li key={index} style={styles.listItem}>
                    <strong>{quiz.question}</strong>
                    <ul>
                      {quiz.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                    <p>Réponse : {quiz.answer}</p>
                  </li>
                ))
              ) : (
                <p>Aucun quiz disponible</p>
              )}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' },
  sidebar: { width: '250px', backgroundColor: '#1c1c1c', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' },
  profile: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' },
  avatar: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ccc', marginBottom: '10px' },
  nav: { display: 'flex', flexDirection: 'column', width: '100%' },
  navButton: { backgroundColor: '#333', color: '#fff', border: 'none', padding: '10px', marginBottom: '10px', cursor: 'pointer', textAlign: 'left', width: '100%', borderRadius: '5px' },
  mainContent: { flex: 1, padding: '20px', boxSizing: 'border-box', backgroundColor: '#fff', overflowY: 'auto' },
  form: { marginBottom: '20px' },
  input: { flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' },
  button: { padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  list: { listStyleType: 'none', padding: 0 },
  listItem: { padding: '10px', borderBottom: '1px solid #ddd' },
};

