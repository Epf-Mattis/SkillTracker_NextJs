import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const goals = await prisma.goal.findMany({
        include: {
          user: true, // Inclut les détails de l'utilisateur associé
        },
      });
      res.status(200).json({ goals });
    } catch (error) {
      console.error('Erreur lors de la récupération des objectifs :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  } else if (req.method === 'POST') {
    const { description, deadline, userId } = req.body;

    // Validation des données d'entrée
    if (!description || !deadline || !userId) {
      return res.status(400).json({ message: 'Description, deadline et userId sont requis.' });
    }

    try {
      // Ajout d'un nouvel objectif
      const goal = await prisma.goal.create({
        data: {
          description,
          deadline: new Date(deadline), // Convertit la deadline en objet Date
          user: {
            connect: { id: userId }, // Connecte l'objectif à un utilisateur
          },
        },
      });

      res.status(201).json({ goal });
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’objectif :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Méthode ${req.method} non autorisée` });
  }
}
