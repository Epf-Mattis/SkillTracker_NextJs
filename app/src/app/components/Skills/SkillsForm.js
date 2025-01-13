import { useState } from 'react';

export default function SkillsForm({ setSkills }) {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');

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

  return (
    <div>
      <input
        type="text"
        placeholder="Nom de la compétence"
        value={newSkillName}
        onChange={(e) => setNewSkillName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Niveau (Débutant, Intermédiaire, Avancé)"
        value={newSkillLevel}
        onChange={(e) => setNewSkillLevel(e.target.value)}
      />
      <button onClick={handleAddSkill}>Ajouter une compétence</button>
    </div>
  );
}
