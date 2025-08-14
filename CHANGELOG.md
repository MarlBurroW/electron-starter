# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-01-14

### Added
- **🔒 Secure API Architecture**: All API calls now go through main process to bypass CORS/CSP restrictions
- **🔍 Real-time API Logging**: Comprehensive request/response logging visible in renderer console
- **🌍 Complete Internationalization**: Full i18n support with English and French translations
- **🎨 TweakCN Theme Integration**: Interactive theme customization with visual editor support
- **⚡ TailwindCSS v4**: Upgraded to latest version with CSS-first configuration for better performance
- **📊 Design System Page**: Comprehensive showcase of all UI components with examples
- **🛡️ Enhanced Security**: Domain whitelist, input validation, and secure IPC communication
- **🎯 Modern Title Bar**: Native-like window controls with drag regions and proper spacing
- **📱 API Demo Page**: Professional demonstration of API best practices and error handling
- **🔧 Developer Tools**: Enhanced logging, debugging tools, and development experience

### Changed
- **Breaking**: API calls moved from renderer to main process for security
- **Breaking**: Updated TailwindCSS configuration to v4 format
- **UI**: Complete redesign of Home page with modern dashboard layout
- **Navigation**: Updated sidebar with new pages and translated labels
- **Architecture**: Refactored IPC handlers for better modularity and security
- **Theming**: Switched from manual theme system to TweakCN integration

### Added Features
- **API Logging System**: Real-time monitoring of all API requests and responses
- **Theme Customization Button**: Click "cosmic-night" button to open TweakCN editor
- **Secure Domain Validation**: Whitelist-based API endpoint security
- **Professional Error Handling**: Custom error types with detailed information
- **Automatic Retry Logic**: Exponential backoff for failed requests
- **TypeScript Strict Mode**: Enhanced type safety throughout the application
- **Responsive Design**: Mobile-friendly layouts and components
- **Global Text Selection Control**: Native app-like text selection behavior

### Technical Improvements
- **Main Process API Service**: Centralized API handling with comprehensive logging
- **IPC Bridge**: Type-safe communication between main and renderer processes
- **Error Boundaries**: Graceful error handling with fallback UIs
- **Performance**: Optimized bundle size and loading times
- **Build System**: Improved build configuration and deployment process

### Fixed
- **CORS Issues**: Eliminated by moving API calls to main process
- **CSP Restrictions**: Bypassed through secure main process architecture
- **Module Loading**: Fixed preload script dependency issues
- **TypeScript Errors**: Resolved compilation issues in API service
- **Window Controls**: Proper positioning of native macOS buttons

### Security
- **Enhanced IPC Security**: Strict input validation in preload script
- **API Domain Whitelist**: Only trusted domains allowed for API calls
- **Secure Context Bridge**: Minimal API surface exposed to renderer
- **Error Information**: Sanitized error messages to prevent information leakage

## [1.0.0] - 2024-01-13

### Added
- Initial project setup with Electron + React + TypeScript
- Modern UI with TailwindCSS and shadcn/ui components
- Theme system with light/dark mode support
- Basic internationalization (i18n) setup
- Professional development tools (ESLint, Prettier, Husky)
- Testing setup with Vitest and Playwright
- Build configuration with electron-builder
- GitHub repository setup with comprehensive documentation