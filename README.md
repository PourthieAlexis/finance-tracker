# Finance Tracker

**Finance Tracker** est une application de gestion financière personnelle développée avec Next.js. Elle permet de suivre vos dépenses, de gérer vos budgets, de consigner vos transactions, de visualiser les soldes totaux et de définir des rappels.

## Fonctionnalités

- **Suivi des Dépenses** : Surveillez et catégorisez vos dépenses quotidiennes.
- **Gestion des Budgets** : Définissez et gérez des budgets pour différentes catégories.
- **Soldes Totaux** : Consultez et analysez vos soldes totaux à travers différents comptes.
- **Rappels** : Définissez des rappels pour les factures à venir, les délais financiers ou les tâches importantes.
- **Graphiques de Soldes** : Visualisez l'évolution de vos soldes au fil du temps grâce à des graphiques.
- **Graphiques des Dépenses par Catégorie** : Analysez vos dépenses par catégorie avec des graphiques pour une meilleure compréhension de vos habitudes financières.

## Technologies

Ce projet utilise les technologies et dépendances suivantes :

- **prisma**
- **chart.js**
- **next**
- **next-auth**
- **react-chartjs-2**
- **swr**
- **zod**
- **typescript**

## Installation

Pour configurer l'application Finance Tracker sur votre machine locale, suivez ces étapes :

### Prérequis

Assurez-vous d'avoir les éléments suivants installés :

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Étapes

1. **Clonez le dépôt :**

   ```bash
   git clone https://github.com/PourthieAlexis/finance-tracker.git
   ```

2. **Accédez au répertoire du projet :**

   ```bash
   cd finance_tracker
   ```

3. **Installez les dépendances :**

   Avec npm :

   ```bash
   npm install
   ```

   Ou avec yarn :

   ```bash
   yarn install
   ```

4. **Configurez les variables d'environnement :**

   Créez un fichier `.env.local` à la racine du répertoire et ajoutez vos variables d'environnement. Exemple :

   ```
   DATABASE_URL=your-database-url
   AUTH_GITHUB_ID="your-auth-github-id"
   AUTH_GITHUB_SECRET= "your-auth-github-secret"
   NEXTAUTH_SECRET=your-next-auth-secret
   ```

5. **Exécutez l'application :**

   Avec npm :

   ```bash
   npm run dev
   ```

   Ou avec yarn :

   ```bash
   yarn dev
   ```

6. **Accédez à l'application :**

   Ouvrez votre navigateur et allez sur `http://localhost:3000` pour commencer à utiliser l'application.
