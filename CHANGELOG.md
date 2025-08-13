# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- 🎨 **Modern UI** with TweakCN themes and adaptive gradients
- 🌙 **Dark/Light mode** with system detection
- 🌍 **Internationalization** (French/English) with i18next
- 📱 **Responsive design** with Tailwind CSS
- 🚀 **Modern title bar** integrated (macOS/Spotify style)
- 📦 **Complete build system** for all platforms (DMG, exe, AppImage)
- 🧪 **Testing setup** with Vitest and Playwright
- 📋 **Code quality** with ESLint, Prettier, and Husky
- 🔧 **TypeScript** for robust development
- 🎯 **Professional dashboard** with mock data and modern cards
- 🎨 **Theme selector** in sidebar and settings
- 🌐 **Language toggle** functionality
- 📱 **Native window controls** integration
- 🖱️ **Proper drag & drop** behavior for title bar
- 🚫 **Text selection disabled** for native app feel

### Technical
- **Electron 27** with security best practices
- **React 18** with modern hooks
- **Vite** for ultra-fast development
- **Zustand** for state management
- **TanStack Query** for data fetching
- **React Router** with hash routing for production
- **shadcn/ui** components with TweakCN theming
- **Lucide React** icons
- **Auto-updater** ready configuration

### Fixed
- ✅ Production routing with HashRouter
- ✅ Missing dependencies in build (electron-toolkit/utils, electron-log, etc.)
- ✅ Native macOS window behavior
- ✅ Title bar dragging functionality
- ✅ Text selection in UI elements

### Security
- 🔒 Context isolation enabled
- 🔒 Node integration disabled in renderer
- 🔒 Sandbox mode enabled
- 🔒 Secure preload script configuration