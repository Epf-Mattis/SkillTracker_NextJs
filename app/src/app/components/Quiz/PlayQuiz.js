import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function PlayQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    // Charger les quiz disponibles
    fetch('/api/quiz')
      .then((res) => res.json())
      .then((data) => setQuizzes(data?.quizzes || []))
      .catch((err) => console.error('Erreur lors du chargement des quiz :', err));
  }, []);

  const handleAnswerSubmit = () => {
    const currentQuiz = quizzes[currentQuizIndex];
    if (selectedAnswer === currentQuiz.answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuizIndex + 1 < quizzes.length) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer('');
    } else {
      setIsQuizComplete(true);
      if (score + 1 === quizzes.length) {
        triggerConfetti();
      }
    }
  };

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setScore(0);
    setIsQuizComplete(false);
    setSelectedAnswer('');
  };

  if (quizzes.length === 0) {
    return <p style={styles.message}>Aucun quiz disponible pour le moment.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Jouer au Quiz</h2>
      {isQuizComplete ? (
        <div style={styles.result}>
          <h3>Quiz Terminé</h3>
          <p>Score : {score} / {quizzes.length}</p>
          <button onClick={handleRestartQuiz} style={styles.button}>
            Rejouer
          </button>
        </div>
      ) : (
        <div style={styles.quiz}>
          <p style={styles.question}>
            Question {currentQuizIndex + 1}/{quizzes.length}: {quizzes[currentQuizIndex].question}
          </p>
          <ul style={styles.options}>
            {quizzes[currentQuizIndex].options.map((option, index) => (
              <li key={index} style={styles.option}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleAnswerSubmit} style={styles.button} disabled={!selectedAnswer}>
            Soumettre
          </button>
        </div>
      )}
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
  quiz: {
    marginBottom: '20px',
  },
  question: {
    fontSize: '1.2rem',
    marginBottom: '15px',
  },
  options: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
  },
  option: {
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  result: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: '1.2rem',
  },
};

///test