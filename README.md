# SkillTracker

## Prérequis

Avant de commencer, assurez-vous d'avoir les logiciels suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [MySQL](https://www.mysql.com/) (version 5.7 ou supérieure)
- [Git](https://git-scm.com/)

## Installation et Lancement de l'Application

1. **Cloner le dépôt :**

   ```bash
   https://github.com/Epf-Mattis/SkillTracker.git
   cd SkillTracker


2. **Lancer L'application :**

   ```bash
   cd client
   npm i
   npm run dev
   ```

   ```bash
   cd Serveur
   npm i
   node server.js
   ```

   3. ##Connection a la DB :##
  
   path:
   ```
   C:\Users\matti\SkillTracker\server\skilltracker.db
   ```

## **Objectif du projet**

"SkillTracker" est une application web conçue pour permettre aux étudiants en développement web de suivre, gérer et documenter l’acquisition de compétences techniques, que ce soit en back-end (Node.js, Express) ou en front-end (React). Cette plateforme vise à offrir aux étudiants un espace où ils peuvent visualiser leur progression, planifier des objectifs d’apprentissage, et s’auto-évaluer via des quiz. En plus de renforcer leurs connaissances, SkillTracker aide à structurer l’apprentissage en leur fournissant des outils interactifs et visuels pour suivre leurs progrès de manière efficace.

### ***Objectifs clés du projet*** :

- Suivi des compétences : Documenter et mettre à jour les niveaux d'avancement dans différentes compétences en développement web.
- Planification des objectifs : Définir des objectifs d’apprentissage pour chaque compétence et recevoir des rappels.
- Visualisation des progrès : Afficher les progrès via des tableaux de bord avec des graphiques et des barres de progression.
- Auto-évaluation : Tester les connaissances avec des quiz dynamiques qui influencent l’évaluation des compétences.

## **Technologies utilisées** : 

 ### ***Back-End*** :

- Node.js : Pour le serveur côté back-end, permettant de gérer les requêtes et la logique métier.
- Express : Un framework minimaliste pour Node.js, utilisé pour créer une API RESTful qui gère les compétences, les objectifs, et les résultats des quiz.
- SQLite : Une base de données légère pour stocker les compétences, leur progression et les objectifs d’apprentissage de manière persistante.

 ### ***Front-End*** :

- React : Pour la création de l’interface utilisateur réactive et interactive, permettant aux étudiants de visualiser leurs progrès, ajouter des compétences et interagir avec l’application.
- Shadcn/ui : Pour la visualisation des données sous forme de graphiques et barres de progression.

 ### ***Outils supplémentaires*** :

npm : Pour la gestion des dépendances.
Prettier : Pour le formatage et la qualité du code.

## **Structure du projet**
   - #### **Back-End (Node.js + Express + SQLite)** : 
     - Détailler l'architecture du back-end, les routes API principales, et comment gérer la base de données SQLite... (A faire)
     - **Routes API** :
       (A faire)
     <img width="481" alt="image" src="https://github.com/user-attachments/assets/5a978e57-822c-4cc7-8445-d32d36c74868">

   - #### **Front-End (React)** : 
     - Structure du tableau de bord pour suivre les compétences, visualiser les progrès, et gérer les objectifs.
     - **Composants principaux** :
       (A faire)

## **Fonctionnalités**
   - **Suivi des compétences** : Comment ajouter, modifier et supprimer des compétences, avec une explication de l'interface utilisateur.
   - **Planification des objectifs** : Comment définir et suivre des objectifs, et la gestion des notifications de rappel.
   - **Visualisation des progrès** : Explication de la visualisation graphique (barres de progression) des compétences.
   - **Quiz** : Détails sur la fonctionnalité des quiz pour évaluer les compétences, avec un exemple de quiz dynamique.

## **Liens utiles**
   - Documentation React.js : https://legacy.reactjs.org/docs/getting-started.html
   - Documentation Express.js : https://expressjs.com/fr/guide/routing.html
   - Documentation Node.js : https://nodejs.org/docs/latest/api/
   - Documentation SQLite : https://www.sqlite.org/docs.html
   - Documentation Shadcn/ui : https://ui.shadcn.com/docs




