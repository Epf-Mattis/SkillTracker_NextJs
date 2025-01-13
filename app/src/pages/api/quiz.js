import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question, options, answer, userId } = req.body;

    // Validation des champs
    if (!question || !Array.isArray(options) || options.length !== 4 || !answer || !userId) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
      // Création d'un nouveau quiz
      const quiz = await prisma.quiz.create({
        data: {
          question,
          options, // Prisma gère automatiquement les données JSON
          answer,
          userId,
        },
      });

      res.status(201).json({ quiz });
    } catch (error) {
      console.error('Erreur lors de la création du quiz :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  } else if (req.method === 'GET') {
    try {
      // Récupération de tous les quiz
      const quizzes = await prisma.quiz.findMany();
      res.status(200).json({ quizzes });
    } catch (error) {
      console.error('Erreur lors de la récupération des quiz :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Méthode ${req.method} non autorisée.`);
  }
}
