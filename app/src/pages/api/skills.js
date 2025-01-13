import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const skills = await prisma.skill.findMany({
        include: {
          user: true, // Inclut les détails de l'utilisateur associé
        },
      });
      res.status(200).json({ skills });
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  } else if (req.method === 'POST') {
    const { name, userId, description, level } = req.body;

    // Vérifie que tous les champs requis sont présents
    if (!name || !userId) {
      return res.status(400).json({ message: 'Le nom de la compétence et l\'ID utilisateur sont requis.' });
    }

    try {
      const skill = await prisma.skill.create({
        data: {
          name,
          description: description || null,
          level: level || 'BEGINNER', // Définit le niveau par défaut si non spécifié
          user: {
            connect: { id: userId }, // Connecte la compétence à l'utilisateur
          },
        },
      });

      res.status(201).json({ skill });
    } catch (error) {
      console.error('Erreur lors de l’ajout de la compétence :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Méthode ${req.method} non autorisée` });
  }
}
