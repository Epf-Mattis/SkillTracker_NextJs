import { useState, useEffect } from 'react';

export default function Skill() {
  const [skills, setSkills] = useState([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');

  useEffect(() => {
    // Charger les compétences
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => setSkills(data?.skills || []))
      .catch((err) => console.error('Erreur lors du chargement des compétences :', err));
  }, []);

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

      if (!res.ok) throw new Error('Erreur lors de l’ajout de la compétence.');

      const data = await res.json();
      setSkills((prev) => [...prev, data.skill]);
      setNewSkillName('');
      setNewSkillLevel('');
    } catch (err) {
      console.error('Erreur lors de l’ajout de la compétence :', err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Compétences</h2>
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
      <ul style={styles.skillList}>
        {skills.map((skill, index) => (
          <li key={index} style={styles.skillItem}>
            <strong>{skill.name}</strong> - {skill.level}
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
  skillList: {
    listStyleType: 'none',
    padding: 0,
  },
  skillItem: {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
};
