# 🚀 Electron Starter

Un starter moderne et professionnel pour applications Electron avec React, TypeScript, TailwindCSS et thèmes TweakCN.

![Electron Starter Screenshot](https://via.placeholder.com/800x500/3B82F6/FFFFFF?text=Electron+Starter)

## ✨ Fonctionnalités

- 🎨 **Interface moderne** avec TweakCN themes et gradients adaptatifs
- 🌙 **Mode sombre/clair** avec détection système automatique
- 🌍 **Multilingue** (Français/Anglais) avec i18next
- 📱 **Interface responsive** avec Tailwind CSS
- 🔧 **TypeScript** pour un développement robuste
- 🚀 **Hot reload** en développement
- 📦 **Build optimisé** pour production (DMG, exe, AppImage)
- 🧪 **Tests** avec Vitest et Playwright
- 📋 **Linting** avec ESLint et Prettier
- 🎯 **Barre de titre moderne** intégrée (style macOS/Spotify)

## 🛠️ Stack Technique

### Core
- **[Electron](https://electronjs.org/)** - Framework d'applications desktop
- **[React 18](https://reactjs.org/)** - Library UI
- **[TypeScript](https://typescriptlang.org/)** - Typage statique
- **[Vite](https://vitejs.dev/)** - Build tool ultra-rapide

### UI & Styling
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[TweakCN](https://tweakcn.com/)** - Générateur de thèmes pour shadcn/ui
- **[shadcn/ui](https://ui.shadcn.com/)** - Composants UI modernes
- **[Lucide React](https://lucide.dev/)** - Icônes

### State & Data
- **[Zustand](https://zustand.surge.sh/)** - State management
- **[TanStack Query](https://tanstack.com/query)** - Gestion des données
- **[React Router](https://reactrouter.com/)** - Routage

### Development
- **[Vitest](https://vitest.dev/)** - Tests unitaires
- **[Playwright](https://playwright.dev/)** - Tests E2E
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Linting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/electron-starter.git
cd electron-starter

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

### Scripts Disponibles

```bash
# Développement
npm run dev              # Lance l'app en mode développement
npm run dev:vite         # Lance uniquement le serveur Vite
npm run dev:electron     # Lance uniquement Electron

# Build & Distribution
npm run build            # Build complet (main + renderer + packaging)
npm run build:main       # Compile le processus principal
npm run build:renderer   # Build du renderer React

# Tests
npm test                 # Tests unitaires
npm run test:watch       # Tests en mode watch
npm run test:e2e         # Tests end-to-end
npm run test:e2e:ui      # Tests E2E avec interface

# Qualité de code
npm run lint             # Linting
npm run lint:fix         # Fix automatique des erreurs de lint
npm run format           # Formatage avec Prettier
npm run type-check       # Vérification TypeScript
```

## 🎨 Thèmes

Ce starter utilise **TweakCN** pour les thèmes, permettant une personnalisation facile des couleurs et du style.

### Changer de thème

Pour installer un nouveau thème TweakCN :

```bash
npx shadcn@latest add https://tweakcn.com/r/themes/THEME_NAME.json
```

### Thèmes populaires
- `bold-tech.json` (actuellement installé)
- `minimal-dark.json`
- `vibrant-blue.json`

## 📁 Structure du Projet

```
electron-starter/
├── main/                 # Processus principal Electron
│   ├── main.ts          # Point d'entrée principal
│   ├── preload.ts       # Script de préchargement
│   └── ipc/             # Handlers IPC
├── renderer/            # Interface utilisateur (React)
│   ├── src/
│   │   ├── components/  # Composants React
│   │   ├── pages/       # Pages de l'application
│   │   ├── lib/         # Utilitaires et configuration
│   │   ├── store/       # État global (Zustand)
│   │   └── styles/      # Styles CSS
│   └── index.html       # Template HTML
├── build/               # Ressources de build (icônes, etc.)
├── release/             # Applications compilées
└── tests/               # Tests unitaires et E2E
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine :

```env
# Développement
ELECTRON_RENDERER_URL=http://localhost:5173

# Production (optionnel)
# APP_VERSION=1.0.0
```

### Personnalisation

1. **Icônes** : Remplacez `build/icon.png` (512x512px minimum)
2. **Métadonnées** : Modifiez `package.json` et `electron-builder.yml`
3. **Thèmes** : Utilisez TweakCN ou modifiez `renderer/src/styles/globals.css`

## 📦 Build et Distribution

### Build pour toutes les plateformes

```bash
npm run build
```

Génère automatiquement :
- **macOS** : `.dmg` (Intel + Apple Silicon)
- **Windows** : `.exe` avec installateur NSIS
- **Linux** : `.AppImage`

### Configuration du build

La configuration se trouve dans `package.json` sous la clé `build`. Principales options :

- `appId` : Identifiant unique de l'application
- `productName` : Nom affiché de l'application
- `directories.output` : Dossier de sortie (`release/`)

## 🧪 Tests

### Tests unitaires (Vitest)

```bash
npm test                 # Exécution unique
npm run test:watch       # Mode watch
```

### Tests E2E (Playwright)

```bash
npm run test:e2e         # Headless
npm run test:e2e:ui      # Avec interface
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Electron](https://electronjs.org/) pour le framework
- [TweakCN](https://tweakcn.com/) pour les thèmes magnifiques
- [shadcn/ui](https://ui.shadcn.com/) pour les composants
- La communauté open source pour tous les outils utilisés

## 📞 Support

- 🐛 [Signaler un bug](https://github.com/votre-username/electron-starter/issues)
- 💡 [Demander une fonctionnalité](https://github.com/votre-username/electron-starter/issues)
- 📧 Contact : votre-email@example.com

---

⭐ **N'oubliez pas de donner une étoile si ce projet vous aide !**