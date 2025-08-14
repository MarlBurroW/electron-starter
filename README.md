# 🚀 Electron Starter

A modern, production-ready Electron starter template with React, TypeScript, TailwindCSS, and beautiful TweakCN themes. Built with security, performance, and developer experience in mind.

<img width="2624" height="1824" alt="CleanShot 2025-08-14 at 18 20 38@2x" src="https://github.com/user-attachments/assets/e71a0f31-3f01-4cff-ac02-fd957cbc2379" />

<img width="2628" height="2048" alt="CleanShot 2025-08-14 at 16 46 36@2x" src="https://github.com/user-attachments/assets/263bb3fa-a7e5-45bf-bf04-42f009dda520" />



![Electron Starter](https://img.shields.io/badge/Electron-27+-blue.svg)
![React](https://img.shields.io/badge/React-18+-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4+-38bdf8.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 🎨 **Modern UI & Theming**
- **TailwindCSS v4** with CSS-first configuration for maximum performance
- **TweakCN themes** integration with visual theme editor support
- **Shadcn/UI components** with beautiful, accessible design system
- **Interactive theme customization** - click the theme button in title bar
- **Dark/Light/System modes** with seamless switching
- **Custom gradients** based on theme colors (like TweakCN homepage)

### 🌍 **Internationalization (i18n)**
- **Complete i18n support** with react-i18next
- **English & French** translations for all UI elements
- **Language switching** with persistent preferences
- **Extensible translation system** for easy localization

### 🔒 **Secure API Architecture**
- **Main process API calls** - bypass CORS and CSP restrictions
- **Domain whitelist security** - only trusted APIs allowed
- **Comprehensive error handling** with custom error types
- **Real-time API logging** visible in renderer console
- **TanStack Query integration** for optimal data management
- **Automatic retry** with exponential backoff

### 🏗️ **Professional Architecture**
- **TypeScript strict mode** with comprehensive type safety
- **Modular IPC handlers** for scalable communication
- **Security-first preload script** with input validation
- **Error boundaries** with graceful fallbacks
- **Production-ready build** with electron-builder

### 🛠️ **Developer Experience**
- **Hot Module Replacement** with Vite for instant updates
- **API Demo page** showcasing best practices
- **Design System showcase** with all UI components
- **Advanced Form Demo** with React Hook Form + Zod validation
- **Enhanced Date Picker** with year/month quick selection
- **Comprehensive logging** for debugging API calls
- **ESLint + Prettier** for consistent code quality
- **Husky git hooks** for automated quality checks

### 🎯 **Production Features**
- **Auto-updater** ready for seamless updates
- **Native window controls** with modern title bar
- **Drag & drop regions** for native feel
- **Global text selection control** like native apps
- **Cross-platform builds** (macOS, Windows, Linux)

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/MarlBurroW/electron-starter.git
cd electron-starter

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open automatically with hot reload enabled.

## 📁 Project Structure

```
electron-starter/
├── main/                     # Main process (Node.js)
│   ├── ipc/                 # IPC handlers
│   │   ├── api.ts          # Secure API service
│   │   ├── files.ts        # File operations
│   │   └── system.ts       # System info & utilities
│   ├── main.ts             # Main process entry
│   └── preload.ts          # Preload script (security bridge)
├── renderer/                # Renderer process (React)
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/        # Shadcn/UI components
│   │   │   └── ...        # Custom components
│   │   ├── pages/         # Application pages
│   │   │   ├── Home.tsx   # Dashboard with fake data
│   │   │   ├── ApiDemo.tsx # API best practices demo
│   │   │   ├── FormDemo.tsx # Advanced form with validation
│   │   │   ├── DesignSystem.tsx # UI showcase
│   │   │   ├── Settings.tsx # App settings
│   │   │   └── About.tsx  # System information
│   │   ├── lib/           # Utilities & services
│   │   │   ├── i18n.ts    # Internationalization
│   │   │   ├── api-logger.ts # API logging system
│   │   │   └── theme-provider.tsx # Theme management
│   │   └── types/         # TypeScript definitions
│   └── index.html         # Entry HTML
├── build/                  # Build resources
└── release/               # Built applications
```

## 🎨 Theme Customization

### Quick Theme Change
1. Click the **"cosmic-night"** button in the title bar
2. Opens [TweakCN Theme Editor](https://tweakcn.com/editor/theme)
3. Customize colors, fonts, and styling
4. Copy the generated CSS
5. Replace in `renderer/src/styles/globals.css`

### CLI Theme Installation
```bash
# Install a TweakCN theme directly
npx shadcn@latest add https://tweakcn.com/r/themes/bold-tech.json
```

### Available Themes
- **cosmic-night** (current) - Dark theme with purple accents
- **bold-tech** - Modern and bold design
- **minimal** - Clean and minimalist
- **forest** - Natural green tones
- **sunset** - Warm orange colors

## 🌐 API Architecture

### Secure Main Process API
All API calls go through the main process for maximum security:

```typescript
// Renderer process - simple and secure
const users = await window.api.api.get<User[]>('https://jsonplaceholder.typicode.com/users')

// Main process handles:
// ✅ Domain validation
// ✅ Request/response logging  
// ✅ Error handling
// ✅ CORS/CSP bypass
```

### API Logging
Real-time API monitoring in renderer console:
- 🚀 **Requests**: Method, URL, headers, body
- ✅ **Responses**: Status, data size, timing
- ❌ **Errors**: Detailed error information

### Supported Methods
```typescript
window.api.api.get<T>(url, headers?)
window.api.api.post<T>(url, body?, headers?)
window.api.api.put<T>(url, body?, headers?)
window.api.api.patch<T>(url, body?, headers?)
window.api.api.delete<T>(url, headers?)
```

## 📝 Advanced Form Features

### Professional Form Validation
The FormDemo page showcases production-ready form handling:

```typescript
// React Hook Form + Zod schema validation
const formSchema = z.object({
  firstName: z.string().min(2).regex(/^[a-zA-ZÀ-ÿ\s'-]+$/),
  email: z.string().email(),
  birthDate: z.date().refine(date => {
    const age = new Date().getFullYear() - date.getFullYear()
    return age >= 13 && age <= 120
  }, 'Age must be between 13 and 120'),
  // ... more validations
})
```

### Enhanced Date Picker
Smart birth date selection with improved UX:
- **Quick Year Selection**: Dropdown with years 1900-present
- **Month Navigation**: Direct month selection in French
- **Fixed Height**: No more jumping calendar layouts
- **3-Click Selection**: Year → Month → Day (vs 444+ clicks before!)

### Form Best Practices
- ✅ **Real-time validation** with immediate feedback
- ✅ **Error-only styling** - no green success states (cleaner UX)
- ✅ **Accessibility compliant** with proper labels and ARIA
- ✅ **TypeScript integration** with full type safety
- ✅ **International validation** (French phone numbers, postal codes)
- ✅ **Multi-section layout** with progress indication

## 📜 Available Scripts

### Development
```bash
npm run dev              # Start development (Vite + Electron)
npm run dev:vite         # Start Vite dev server only
npm run dev:electron     # Start Electron only (needs Vite running)
```

### Building
```bash
npm run build            # Build for production
npm run build:main       # Build main process only
npm run build:renderer   # Build renderer only
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript type checking
```

### Testing
```bash
npm run test             # Run unit tests
npm run test:watch       # Watch mode testing
npm run test:e2e         # End-to-end tests
npm run test:e2e:ui      # E2E tests with UI
```

## 🌍 Internationalization

### Adding New Languages
1. Add translations in `renderer/src/lib/i18n.ts`:
```typescript
const resources = {
  en: { translation: { /* English */ } },
  fr: { translation: { /* French */ } },
  es: { translation: { /* Spanish */ } }, // New language
}
```

2. Use in components:
```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  return <h1>{t('pages.home.title')}</h1>
}
```

### Language Switching
Use the language selector in the sidebar or programmatically:
```typescript
import { useTranslation } from 'react-i18next'

const { i18n } = useTranslation()
i18n.changeLanguage('fr') // Switch to French
```

## 🔧 Configuration

### Electron Settings
Configure in `main/main.ts`:
- Window properties
- Security policies
- Auto-updater settings
- Menu customization

### Build Configuration
Customize builds in `package.json` → `build` section:
- App metadata
- Platform-specific settings
- Code signing
- Distribution formats

### Environment Variables
Create `.env` files for different environments:
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000

# .env.production  
VITE_API_BASE_URL=https://api.production.com
```

## 🚢 Deployment

### Desktop Distribution
```bash
# Build for current platform
npm run build

# Platform-specific builds
npm run build:mac
npm run build:win
npm run build:linux
```

### Auto-Updates
The app is configured for automatic updates:
1. Set up a release server
2. Configure `electron-updater` in `main/main.ts`
3. Publish updates to your server

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Electron](https://electronjs.org/)** - Cross-platform desktop apps
- **[React](https://reactjs.org/)** - UI library
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful components
- **[TweakCN](https://tweakcn.com/)** - Visual theme editor
- **[Vite](https://vitejs.dev/)** - Fast build tool
- **[TanStack Query](https://tanstack.com/query)** - Data fetching

## 🆘 Support

- 📖 **Documentation**: Check this README and code comments
- 🐛 **Issues**: [GitHub Issues](https://github.com/MarlBurroW/electron-starter/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/MarlBurroW/electron-starter/discussions)

---

**Happy coding! 🚀**

Built with ❤️ by developers, for developers.
