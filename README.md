# English Verb Revision

Application pour réviser les verbes réguliers et irréguliers anglais avec traductions françaises.

## Fonctionnalités

- **Liste des verbes**: 230 verbes avec infinitif, prétérit, participe passé, traduction française
- **Recherche**: Par anglais ou français
- **Filtres**: Tous / Irréguliers / Réguliers / Favoris
- **Tri**: Par défaut / A-Z anglais / A-Z français
- **Groupement**: Sans / Par lettre
- **Favoris**: Étoile sur chaque carte, persisté en localStorage
- **Dark/Light mode**: Toggle avec persistance localStorage
- **Conjugaisons**: 10 temps (Simple, Continuous, Perfect, Perfect Continuous)
- **Prononciation**: Web Speech API avec boutons sur chaque conjugaison
- **Choix de voix**: Féminine ou masculine, persisté en localStorage


## Commands

```bash
yarn dev      # Start development server at localhost:3000
yarn build    # Build for production
yarn start    # Start production server
yarn lint     # Run ESLint (eslint-config-next with TypeScript and Core Web Vitals)
```

## Architecture

This is a Next.js 16 project using the App Router with TypeScript.

- **Source**: All application code is in `src/`
- **Routing**: Uses Next.js App Router (`src/app/`)
- **Styling**: Tailwind CSS 4 with PostCSS (`@tailwindcss/postcss`)
- **Fonts**: Geist font family via `next/font/google`
- **Path alias**: `@/*` maps to `./src/*`

### Structure des fichiers

```
src/
├── app/
│   ├── page.tsx              # Page d'accueil avec liste des verbes
│   ├── layout.tsx            # Layout avec ThemeToggle et script dark mode
│   ├── globals.css           # Styles globaux + dark mode Tailwind 4
│   └── verb/[slug]/page.tsx  # Page de détail d'un verbe (SSG)
├── components/
│   ├── VerbList.tsx          # Liste principale avec filtres/recherche
│   ├── VerbCard.tsx          # Carte d'un verbe avec favoris
│   ├── VerbDetail.tsx        # Détail d'un verbe avec conjugaisons
│   ├── FilterBar.tsx         # Filtres, tri, groupement
│   ├── SearchInput.tsx       # Champ de recherche
│   ├── ThemeToggle.tsx       # Toggle dark/light mode
│   ├── SpeakButton.tsx       # Bouton de prononciation
│   └── VoiceSelector.tsx     # Sélecteur voix féminine/masculine
├── hooks/
│   ├── useFavorites.ts       # Gestion des favoris (localStorage)
│   ├── usePersistedState.ts  # État persisté générique (localStorage)
│   └── useSpeech.ts          # Web Speech API avec choix de voix
├── data/
│   └── verbs.ts              # 230 verbes (119 irréguliers, 111 réguliers)
└── lib/
    └── conjugation.ts        # Logique de conjugaison (10 temps)
```