import { useState, useEffect } from 'react';
import QuizForm from './QuizForm';

export default function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Charger les quiz
  useEffect(() => {
    fetch('/api/quiz')
      .then((res) => res.json())
      .then((data) => setQuizQuestions(data?.quizzes || []))
      .catch((err) => console.error('Erreur lors du chargement des quiz :', err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Créer un quiz</h2>
      <QuizForm setQuizQuestions={setQuizQuestions} />
      <h3 style={styles.subHeading}>Liste des quiz</h3>
      <ul style={styles.quizList}>
        {quizQuestions.length > 0 ? (
          quizQuestions.map((quiz, index) => (
            <li key={index} style={styles.quizItem}>
              <strong>{quiz.question}</strong>
              <ul style={styles.optionList}>
                {quiz.options.map((opt, i) => (
                  <li key={i} style={styles.optionItem}>
                    {opt}
                  </li>
                ))}
              </ul>
              <p style={styles.answer}>Réponse : {quiz.answer}</p>
            </li>
          ))
        ) : (
          <p style={styles.noQuiz}>Aucun quiz disponible</p>
        )}
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
  subHeading: {
    fontSize: '1.2rem',
    marginTop: '30px',
    color: '#555',
  },
  quizList: {
    listStyleType: 'none',
    padding: 0,
  },
  quizItem: {
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
  optionList: {
    listStyleType: 'none',
    padding: 0,
    margin: '10px 0',
  },
  optionItem: {
    padding: '5px 0',
    color: '#666',
  },
  answer: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  noQuiz: {
    color: '#888',
    textAlign: 'center',
    marginTop: '20px',
  },
};
