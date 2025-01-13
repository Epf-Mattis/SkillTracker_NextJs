import { useState } from 'react';

export default function QuizForm({ setQuizQuestions }) {
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

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
    <div style={styles.formContainer}>
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
  );
}

const styles = {
  formContainer: {
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
};
