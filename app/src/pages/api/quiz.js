import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Simule des questions de quiz (à stocker éventuellement dans la DB)
      const questions = [
        {
          id: 1,
          question: 'Qu’est-ce que React ?',
          options: ['Framework', 'Bibliothèque', 'Langage', 'Navigateur'],
          answer: 'Bibliothèque',
        },
        {
          id: 2,
          question: 'Qu’est-ce que Prisma ?',
          options: ['ORM', 'Langage', 'Base de données', 'Serveur'],
          answer: 'ORM',
        },
      ];
      res.status(200).json({ questions });
    } catch (error) {
      console.error('Erreur lors de la récupération des questions de quiz :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  } else if (req.method === 'POST') {
    const { userId, score, total } = req.body;

    if (!userId || score == null || total == null) {
      return res.status(400).json({ message: 'UserId, score et total sont requis.' });
    }

    try {
      const quizResult = await prisma.quizResult.create({
        data: {
          score,
          total,
          user: {
            connect: { id: userId },
          },
        },
      });
      res.status(201).json({ quizResult });
    } catch (error) {
      console.error('Erreur lors de l’ajout des résultats de quiz :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Méthode ${req.method} non autorisée` });
  }
}
