# 🚀 Electron Starter Professionnel

Un starter template moderne et professionnel pour Electron avec React 18, TypeScript, et un ensemble complet d'outils de développement.

## ✨ Fonctionnalités

### 🏗️ Architecture
- **Electron** - Framework pour applications desktop multiplateformes
- **React 18** - Interface utilisateur moderne avec hooks
- **TypeScript** - Typage statique pour une meilleure DX
- **Vite** - Build tool ultra-rapide avec HMR
- **Architecture sécurisée** - contextIsolation, sandbox, IPC typé

### 🎨 Interface Utilisateur
- **TailwindCSS** - Framework CSS utility-first
- **ShadCN UI** - Composants React élégants et accessibles
- **Dark Mode** - Support complet du thème sombre/clair
- **Responsive Design** - Interface adaptative

### 🔧 Outils de Développement
- **ESLint + Prettier** - Linting et formatage de code
- **Husky + lint-staged** - Git hooks pour la qualité du code
- **Commitlint** - Validation des messages de commit
- **EditorConfig** - Configuration d'éditeur cohérente

### 🧪 Tests
- **Vitest** - Tests unitaires ultra-rapides
- **@testing-library/react** - Tests de composants React
- **Playwright** - Tests end-to-end
- **Coverage** - Rapports de couverture de code

### ⚡ State Management & Data
- **Zustand** - State management simple et puissant
- **TanStack Query** - Gestion des requêtes et cache
- **Immer** - Mutations immutables
- **Persist** - Persistance automatique du state

### 🌍 Internationalisation
- **i18next** - Système de traduction complet
- **react-i18next** - Intégration React
- **Français/Anglais** - Langues prêtes à l'emploi

### 📦 Build & Déploiement
- **electron-builder** - Packaging multiplateforme
- **Auto-updater** - Mise à jour automatique (configuré)
- **Code Signing** - Signature de code (macOS)
- **Source Maps** - Debug en production

## 🛠️ Prérequis

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 (ou **yarn** >= 1.22.0)
- **Git** pour les hooks de développement

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/your-username/electron-starter.git
cd electron-starter

# Installer les dépendances
npm install

# Configurer les hooks Git
npm run prepare
```

## 📋 Scripts de Développement

```bash
# Développement (lance Vite + Electron avec HMR)
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Tests unitaires
npm run test
npm run test:watch

# Tests E2E
npm run test:e2e
npm run test:e2e:ui

# Linting et formatage
npm run lint
npm run lint:fix
npm run format

# Vérification des types
npm run type-check
```

## 🏗️ Structure du Projet

```
electron-starter/
├── main/                          # Processus principal Electron
│   ├── main.ts                   # Point d'entrée principal
│   ├── preload.ts                # Script de preload sécurisé
│   ├── security.ts               # Utilitaires de sécurité
│   └── ipc/                      # Handlers IPC
│       ├── files.ts              # Opérations sur les fichiers
│       └── system.ts             # Informations système
├── renderer/                      # Processus de rendu (React)
│   ├── index.html               # Template HTML
│   └── src/
│       ├── main.tsx             # Point d'entrée React
│       ├── App.tsx              # Composant racine
│       ├── pages/               # Pages de l'application
│       ├── components/          # Composants React
│       │   └── ui/              # Composants ShadCN UI
│       ├── store/               # Stores Zustand
│       ├── lib/                 # Utilitaires et configuration
│       ├── styles/              # Styles CSS
│       └── types/               # Types TypeScript
├── tests/                         # Tests
│   ├── unit/                    # Tests unitaires
│   └── e2e/                     # Tests end-to-end
├── build/                         # Ressources de build
└── config/                        # Fichiers de configuration
```

## 🔐 Sécurité

Ce starter implémente les meilleures pratiques de sécurité Electron :

### ✅ Configuration Sécurisée
- `contextIsolation: true` - Isolation du contexte
- `sandbox: true` - Mode sandbox activé
- `nodeIntegration: false` - Pas d'accès Node dans le renderer
- `webSecurity: true` - Sécurité web activée

### 🛡️ IPC Sécurisé
- Communication via `contextBridge`
- Validation des payloads avec **Zod**
- Whitelist des canaux IPC
- Restriction des URLs externes

### 🔒 Headers de Sécurité
- Content Security Policy (CSP)
- Désactivation du module remote
- Protection contre l'ouverture de nouvelles fenêtres

## 🎯 Fonctionnalités Démontrées

### 🔢 Compteur avec Zustand
- State management avec persistance
- DevTools intégrés
- Mutations immutables avec Immer

### 📡 Requêtes avec TanStack Query
- Cache intelligent
- Gestion des erreurs
- Retry automatique
- Loading states

### 💬 Communication IPC
- Lecture/écriture de fichiers sécurisée
- Informations système
- Dialogs natifs
- Validation avec Zod

### ⚙️ Page de Paramètres
- Préférences persistantes
- Thème clair/sombre
- Configuration utilisateur
- Export/Import des paramètres

## 📚 Technologies Utilisées

| Catégorie | Technologies |
|-----------|-------------|
| **Core** | Electron, React 18, TypeScript |
| **Build** | Vite, electron-builder |
| **Styling** | TailwindCSS, PostCSS, ShadCN UI |
| **State** | Zustand, Immer, TanStack Query |
| **i18n** | i18next, react-i18next |
| **Testing** | Vitest, Playwright, Testing Library |
| **Quality** | ESLint, Prettier, Husky, Commitlint |
| **Icons** | Lucide React |
| **Notifications** | Sonner |

## 🔧 Configuration

### Environnement
Copiez `.env.example` vers `.env` et ajustez les variables :

```bash
cp .env.example .env
```

### Electron Builder
Modifiez `electron-builder.yml` pour votre application :
- `appId` : Identifiant unique de votre app
- `productName` : Nom affiché de l'application
- `author` : Votre nom/organisation
- Repository GitHub pour l'auto-updater

### Icônes
Remplacez `build/icon.png` par votre icône (512x512px minimum).
electron-builder générera automatiquement les formats requis.

## 📦 Build & Distribution

### Build Local
```bash
# Build pour l'OS courant
npm run build

# Les installeurs seront dans le dossier 'release/'
```

### Build Multiplateforme
```bash
# macOS (depuis macOS uniquement)
npm run build -- --mac

# Windows (depuis Windows ou avec Wine)
npm run build -- --win

# Linux
npm run build -- --linux
```

### Auto-updater
1. Configurez GitHub releases dans `electron-builder.yml`
2. Ajoutez votre `GH_TOKEN` aux variables d'environnement
3. Les mises à jour seront automatiquement détectées

## 🧪 Tests

### Tests Unitaires
```bash
# Lancer tous les tests
npm run test

# Mode watch
npm run test:watch

# Avec coverage
npm run test -- --coverage
```

### Tests E2E
```bash
# Headless
npm run test:e2e

# Avec interface graphique
npm run test:e2e:ui
```

## 📈 Qualité du Code

### Pre-commit Hooks
- **lint-staged** : Lint et format des fichiers modifiés
- **commitlint** : Validation des messages de commit

### Standards
- **Conventional Commits** pour les messages de commit
- **ESLint** avec règles TypeScript et React
- **Prettier** pour le formatage cohérent

## 🚀 Déploiement

### GitHub Actions (exemple)
```yaml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm ci
      - run: npm run build
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Distribution
1. **GitHub Releases** - Recommandé pour l'auto-updater
2. **App Stores** - Mac App Store, Microsoft Store
3. **Direct Download** - Depuis votre site web

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'feat: add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Electron](https://electronjs.org/) - Framework pour applications desktop
- [React](https://reactjs.org/) - Bibliothèque UI
- [Vite](https://vitejs.dev/) - Build tool moderne
- [ShadCN UI](https://ui.shadcn.com/) - Composants UI magnifiques
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utility-first

## 📞 Support

- 📝 [Issues GitHub](https://github.com/your-username/electron-starter/issues)
- 💬 [Discussions](https://github.com/your-username/electron-starter/discussions)
- 📧 Email : your-email@example.com

---

**Fabriqué avec ❤️ et beaucoup de ☕ par [Votre Nom](https://github.com/your-username)**