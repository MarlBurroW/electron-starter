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
        dashboard: 'Dashboard',
        designSystem: 'Design System',
        analytics: 'Analytics',
        team: 'Team',
        calendar: 'Calendar',
        documents: 'Documents',
        apiDemo: 'API Demo',
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
        designSystem: {
          title: 'Design System',
          description: 'Showcase of all available UI components with different variants and states.',
          themeCustomizationTip: 'Tip: Click the "cosmic-night" button in the title bar to customize this theme with',
          sections: {
            buttons: 'Buttons',
            buttonVariants: 'Button Variants',
            buttonSizes: 'Button Sizes',
            buttonStates: 'Button States',
            formElements: 'Form Elements',
            inputFields: 'Input Fields',
            textareaSelect: 'Textarea & Select',
            cards: 'Cards',
            simpleCard: 'Simple Card',
            gradientCard: 'Gradient Card',
            cardWithFooter: 'Card with Footer',
            badges: 'Badges',
            badgeVariants: 'Badge Variants',
            interactiveElements: 'Interactive Elements',
            switch: 'Switch',
            iconExamples: 'Icon Examples',
            colorPalette: 'Color Palette',
            themeColors: 'Theme Colors',
            gradients: 'Gradients',
            typography: 'Typography',
            textStyles: 'Text Styles',
          },
          components: {
            basicCard: 'A basic card with header and content.',
            gradientCardDesc: 'A card with gradient background.',
            cardWithFooterDesc: 'This card includes footer actions.',
            cardContent: 'This is the card content area.',
            gradientCardContent: 'This card has a subtle gradient background based on the theme colors.',
            footerCardContent: 'Card content goes here.',
            airplaneMode: 'Airplane Mode',
            disabledSwitch: 'Disabled Switch',
            primaryGradient: 'Primary Gradient',
            subtleGradient: 'Subtle Gradient',
            multiColor: 'Multi-color',
            regularParagraph: 'Regular paragraph text with normal weight.',
            smallMuted: 'Small muted text for descriptions.',
            largeMedium: 'Large medium text for emphasis.',
          },
          buttons: {
            default: 'Default',
            destructive: 'Destructive',
            outline: 'Outline',
            secondary: 'Secondary',
            ghost: 'Ghost',
            link: 'Link',
            small: 'Small',
            large: 'Large',
            normal: 'Normal',
            disabled: 'Disabled',
            withIcon: 'With Icon',
          },
          form: {
            email: 'Email',
            password: 'Password',
            disabledInput: 'Disabled Input',
            enterEmail: 'Enter your email',
            enterPassword: 'Enter your password',
            disabledInputPlaceholder: 'Disabled input',
            message: 'Message',
            typeMessage: 'Type your message here...',
            selectOption: 'Select an option',
            option1: 'Option 1',
            option2: 'Option 2',
            option3: 'Option 3',
          },
          dashboard: {
            totalRevenue: 'Total Revenue',
            subscriptions: 'Subscriptions',
            sales: 'Sales',
            activeNow: 'Active Now',
            fromLastMonth: 'from last month',
            sinceLastHour: 'since last hour',
            recentSales: 'Recent Sales',
            teamMembers: 'Team Members',
            projectStatus: 'Project Status',
            overview: 'Overview',
          },
        },
        apiDemo: {
          title: 'API Demo',
          description: 'Demonstration of API calls with proper error handling, loading states, and best practices.',
          sections: {
            users: 'Users',
            posts: 'Posts',
            todos: 'Todos',
          },
          loading: 'Loading data...',
          error: 'Failed to load data',
          retry: 'Retry',
          noData: 'No data available',
          refreshData: 'Refresh Data',
        },
      },
      
      // Theme
      theme: {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
        selector: 'Theme',
        selectTitle: 'Choose a theme',
        selectDescription: 'Select the color theme for your application. You can preview both light and dark modes.',
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
        dashboard: 'Tableau de bord',
        designSystem: 'Design System',
        analytics: 'Analytiques',
        team: 'Équipe',
        calendar: 'Calendrier',
        documents: 'Documents',
        apiDemo: 'Démo API',
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
        designSystem: {
          title: 'Design System',
          description: 'Présentation de tous les composants UI disponibles avec leurs différentes variantes et états.',
          themeCustomizationTip: 'Astuce : Cliquez sur le bouton "cosmic-night" dans la barre de titre pour personnaliser ce thème avec',
          sections: {
            buttons: 'Boutons',
            buttonVariants: 'Variantes de boutons',
            buttonSizes: 'Tailles de boutons',
            buttonStates: 'États des boutons',
            formElements: 'Éléments de formulaire',
            inputFields: 'Champs de saisie',
            textareaSelect: 'Textarea et Select',
            cards: 'Cartes',
            simpleCard: 'Carte simple',
            gradientCard: 'Carte avec dégradé',
            cardWithFooter: 'Carte avec footer',
            badges: 'Badges',
            badgeVariants: 'Variantes de badges',
            interactiveElements: 'Éléments interactifs',
            switch: 'Commutateur',
            iconExamples: 'Exemples d\'icônes',
            colorPalette: 'Palette de couleurs',
            themeColors: 'Couleurs du thème',
            gradients: 'Dégradés',
            typography: 'Typographie',
            textStyles: 'Styles de texte',
          },
          components: {
            basicCard: 'Une carte basique avec en-tête et contenu.',
            gradientCardDesc: 'Une carte avec arrière-plan dégradé.',
            cardWithFooterDesc: 'Cette carte inclut des actions de footer.',
            cardContent: 'Ceci est la zone de contenu de la carte.',
            gradientCardContent: 'Cette carte a un arrière-plan dégradé subtil basé sur les couleurs du thème.',
            footerCardContent: 'Le contenu de la carte va ici.',
            airplaneMode: 'Mode avion',
            disabledSwitch: 'Commutateur désactivé',
            primaryGradient: 'Dégradé primaire',
            subtleGradient: 'Dégradé subtil',
            multiColor: 'Multi-couleurs',
            regularParagraph: 'Texte de paragraphe régulier avec poids normal.',
            smallMuted: 'Petit texte atténué pour les descriptions.',
            largeMedium: 'Grand texte medium pour l\'emphase.',
          },
          buttons: {
            default: 'Défaut',
            destructive: 'Destructeur',
            outline: 'Contour',
            secondary: 'Secondaire',
            ghost: 'Fantôme',
            link: 'Lien',
            small: 'Petit',
            large: 'Grand',
            normal: 'Normal',
            disabled: 'Désactivé',
            withIcon: 'Avec icône',
          },
          form: {
            email: 'Email',
            password: 'Mot de passe',
            disabledInput: 'Champ désactivé',
            enterEmail: 'Entrez votre email',
            enterPassword: 'Entrez votre mot de passe',
            disabledInputPlaceholder: 'Champ désactivé',
            message: 'Message',
            typeMessage: 'Tapez votre message ici...',
            selectOption: 'Sélectionnez une option',
            option1: 'Option 1',
            option2: 'Option 2',
            option3: 'Option 3',
          },
          dashboard: {
            totalRevenue: 'Chiffre d\'affaires total',
            subscriptions: 'Abonnements',
            sales: 'Ventes',
            activeNow: 'Actifs maintenant',
            fromLastMonth: 'depuis le mois dernier',
            sinceLastHour: 'depuis la dernière heure',
            recentSales: 'Ventes récentes',
            teamMembers: 'Membres de l\'équipe',
            projectStatus: 'Statut du projet',
            overview: 'Aperçu',
          },
        },
        apiDemo: {
          title: 'Démo API',
          description: 'Démonstration d\'appels API avec gestion d\'erreurs appropriée, états de chargement et meilleures pratiques.',
          sections: {
            users: 'Utilisateurs',
            posts: 'Articles',
            todos: 'Tâches',
          },
          loading: 'Chargement des données...',
          error: 'Échec du chargement des données',
          retry: 'Réessayer',
          noData: 'Aucune donnée disponible',
          refreshData: 'Actualiser les données',
        },
      },
      
      // Theme
      theme: {
        light: 'Clair',
        dark: 'Sombre',
        system: 'Système',
        selector: 'Thème',
        selectTitle: 'Choisir un thème',
        selectDescription: 'Sélectionnez le thème de couleur pour votre application. Vous pouvez prévisualiser les modes clair et sombre.',
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