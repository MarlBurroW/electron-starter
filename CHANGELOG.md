# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Non publié]

### Ajouté
- Structure de projet initiale avec Electron + React + TypeScript
- Configuration Vite avec support HMR pour le développement
- Interface utilisateur avec TailwindCSS et ShadCN UI
- State management avec Zustand (persist + devtools + immer)
- Gestion des requêtes avec TanStack Query
- Internationalisation avec i18next (FR/EN)
- Tests unitaires avec Vitest et Testing Library
- Tests E2E avec Playwright
- Configuration ESLint + Prettier + Husky + lint-staged
- Support du dark mode avec toggle UI
- IPC sécurisé avec validation Zod
- Configuration electron-builder pour packaging multiplateforme
- Auto-updater configuré (prêt pour production)
- Logging avec electron-log
- Sécurité renforcée (contextIsolation, sandbox)
- Pages d'exemple : Home, Settings, About
- Composants UI : Counter, Query demo, IPC demo
- Documentation complète avec README détaillé

### Sécurité
- Configuration sécurisée d'Electron (contextIsolation, sandbox)
- IPC typé avec validation des payloads
- Whitelist des URLs externes
- CSP (Content Security Policy) configuré
- Désactivation du module remote

## [1.0.0] - 2024-01-XX

### Ajouté
- Version initiale du starter professionnel Electron
- Architecture complète avec main/preload/renderer
- Stack technologique moderne et outils de développement
- Tests et CI/CD prêts pour la production
- Documentation et exemples d'utilisation