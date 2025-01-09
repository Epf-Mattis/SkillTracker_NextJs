import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma'; // Assure-toi que le client Prisma est configuré

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }

    try {
      // Vérifie si l'utilisateur existe
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }

      // Compare le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mot de passe incorrect.' });
      }

      res.status(200).json({ message: 'Connexion réussie.', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}