import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      // App
      app: {
        title: 'Electron Starter',
        description: 'Professional Electron + React starter',
      },
      
      // Navigation
      nav: {
        home: 'Home',
        settings: 'Settings',
        about: 'About',
        theme: 'Theme',
        language: 'Language',
      },
      
      // Pages
      pages: {
        home: {
          title: 'Welcome to Electron Starter',
          description: 'This is a professional starter template with React, TypeScript, and modern tooling.',
          counter: {
            title: 'Counter Demo',
            description: 'Zustand store with persistence and devtools',
          },
          query: {
            title: 'TanStack Query Demo',
            description: 'Data fetching with caching and error handling',
          },
          ipc: {
            title: 'IPC Communication Demo',
            description: 'Secure communication between renderer and main process',
          },
        },
        settings: {
          title: 'Settings',
          description: 'Configure your application preferences',
          saved: 'Settings saved successfully!',
          reset: 'Settings reset to default values!',
          tabs: {
            general: 'General',
            appearance: 'Appearance',
            advanced: 'Advanced',
          },
          general: {
            profile: 'Profile',
            profileDescription: 'Manage your profile information',
            username: 'Username',
            email: 'Email',
            preferences: 'Preferences',
            preferencesDescription: 'Configure application behavior',
            notifications: 'Enable Notifications',
            notificationsDescription: 'Receive notifications for important events',
            autoSave: 'Auto Save',
            autoSaveDescription: 'Automatically save changes',
          },
          appearance: {
            theme: 'Theme',
            themeDescription: 'Choose your preferred color scheme',
          },
          advanced: {
            title: 'Advanced Settings',
            description: 'Advanced configuration options',
            export: 'Export Settings',
            reset: 'Reset All Settings',
          },
          save: 'Save Changes',
        },
        about: {
          title: 'About',
          description: 'Information about this application and your system',
          app: {
            title: 'Application Info',
            description: 'Version and technology stack information',
          },
          system: {
            title: 'System Information',
            description: 'Details about your operating system and hardware',
          },
          links: {
            title: 'Useful Links',
            description: 'Learn more about the technologies used in this app',
          },
        },
      },
      
      // Theme
      theme: {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
      },
      
      // Common
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        close: 'Close',
      },
    },
  },
  fr: {
    translation: {
      // App
      app: {
        title: 'Electron Starter',
        description: 'Starter professionnel Electron + React',
      },
      
      // Navigation
      nav: {
        home: 'Accueil',
        settings: 'Paramètres',
        about: 'À propos',
        theme: 'Thème',
        language: 'Langue',
      },
      
      // Pages
      pages: {
        home: {
          title: 'Bienvenue dans Electron Starter',
          description: 'Ceci est un modèle de démarrage professionnel avec React, TypeScript et des outils modernes.',
          counter: {
            title: 'Démo Compteur',
            description: 'Store Zustand avec persistance et outils de développement',
          },
          query: {
            title: 'Démo TanStack Query',
            description: 'Récupération de données avec mise en cache et gestion d\'erreurs',
          },
          ipc: {
            title: 'Démo Communication IPC',
            description: 'Communication sécurisée entre le processus de rendu et le processus principal',
          },
        },
        settings: {
          title: 'Paramètres',
          description: 'Configurez vos préférences d\'application',
          saved: 'Paramètres sauvegardés avec succès !',
          reset: 'Paramètres réinitialisés aux valeurs par défaut !',
          tabs: {
            general: 'Général',
            appearance: 'Apparence',
            advanced: 'Avancé',
          },
          general: {
            profile: 'Profil',
            profileDescription: 'Gérez vos informations de profil',
            username: 'Nom d\'utilisateur',
            email: 'Email',
            preferences: 'Préférences',
            preferencesDescription: 'Configurez le comportement de l\'application',
            notifications: 'Activer les notifications',
            notificationsDescription: 'Recevoir des notifications pour les événements importants',
            autoSave: 'Sauvegarde automatique',
            autoSaveDescription: 'Sauvegarder automatiquement les modifications',
          },
          appearance: {
            theme: 'Thème',
            themeDescription: 'Choisissez votre schéma de couleurs préféré',
          },
          advanced: {
            title: 'Paramètres avancés',
            description: 'Options de configuration avancées',
            export: 'Exporter les paramètres',
            reset: 'Réinitialiser tous les paramètres',
          },
          save: 'Enregistrer les modifications',
        },
        about: {
          title: 'À propos',
          description: 'Informations sur cette application et votre système',
          app: {
            title: 'Informations sur l\'application',
            description: 'Version et informations sur la pile technologique',
          },
          system: {
            title: 'Informations système',
            description: 'Détails sur votre système d\'exploitation et votre matériel',
          },
          links: {
            title: 'Liens utiles',
            description: 'En savoir plus sur les technologies utilisées dans cette application',
          },
        },
      },
      
      // Theme
      theme: {
        light: 'Clair',
        dark: 'Sombre',
        system: 'Système',
      },
      
      // Common
      common: {
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès',
        cancel: 'Annuler',
        save: 'Enregistrer',
        delete: 'Supprimer',
        edit: 'Modifier',
        close: 'Fermer',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n