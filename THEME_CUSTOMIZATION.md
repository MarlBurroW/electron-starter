# 🎨 Personnalisation des thèmes

## Comment changer de thème

### 1. **Méthode recommandée : TweakCN** 

Le bouton "cosmic-night" dans la barre de titre vous amène directement sur [TweakCN](https://tweakcn.com/editor/theme), un éditeur visuel pour les thèmes shadcn/ui.

#### Étapes :
1. Cliquez sur le bouton `cosmic-night` dans la barre de titre
2. Choisissez un thème existant ou créez le vôtre
3. Copiez le CSS généré
4. Remplacez le contenu dans `renderer/src/styles/globals.css` (sections `:root` et `.dark`)

### 2. **Utilisation d'un thème TweakCN prêt à l'emploi**

```bash
# Exemple avec un thème TweakCN
npx shadcn@latest add https://tweakcn.com/r/themes/cosmic-night.json
```

### 3. **Personnalisation manuelle**

Modifiez directement les variables CSS dans `renderer/src/styles/globals.css` :

```css
:root {
  --background: oklch(0.9399 0.0203 345.6985);
  --foreground: oklch(0.4712 0 0);
  --primary: oklch(0.6209 0.1801 348.1385);
  /* ... autres variables ... */
}

.dark {
  --background: oklch(0.2497 0.0305 234.1628);
  --foreground: oklch(0.9306 0.0197 349.0785);
  /* ... autres variables ... */
}
```

## Thèmes populaires

- **cosmic-night** (actuel) - Thème sombre avec des accents violets
- **bold-tech** - Thème moderne et audacieux
- **minimal** - Design épuré et minimaliste
- **forest** - Tons verts naturels
- **sunset** - Couleurs chaudes orangées

## Structure des couleurs

- `--background` / `--foreground` - Couleurs de base
- `--primary` / `--primary-foreground` - Couleur principale
- `--secondary` / `--secondary-foreground` - Couleur secondaire
- `--accent` / `--accent-foreground` - Couleur d'accent
- `--muted` / `--muted-foreground` - Couleurs atténuées
- `--destructive` / `--destructive-foreground` - Couleurs d'erreur
- `--border`, `--input`, `--ring` - Éléments d'interface
- `--sidebar-*` - Couleurs spécifiques à la sidebar

## Tester vos changements

1. L'application se recharge automatiquement en mode développement
2. Visitez la page **Design System** pour voir tous les composants
3. Testez les modes clair/sombre avec le sélecteur de thème

## Ressources

- [TweakCN Editor](https://tweakcn.com/editor/theme) - Éditeur visuel
- [shadcn/ui Themes](https://ui.shadcn.com/themes) - Collection officielle
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors) - Guide des couleurs
