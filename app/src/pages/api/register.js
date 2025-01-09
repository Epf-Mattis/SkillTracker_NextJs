import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Ajout du log pour voir les données reçues par l'API
    console.log('API appelée');
console.log('Données reçues :', req.body);


    // Vérifie que tous les champs sont remplis
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
      // Vérifie si l'utilisateur existe déjà
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
      }

      // Hash le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crée un nouvel utilisateur
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
  }
}
