# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev      # Start development server at localhost:3000
yarn build    # Build for production
yarn start    # Start production server
yarn lint     # Run ESLint (eslint-config-next with TypeScript and Core Web Vitals)
```

⚠️ **IMPORTANT:** Toujours utiliser yarn.

## Architecture

This is a Next.js 16 project using the App Router with TypeScript.

- **Source**: All application code is in `src/`
- **Routing**: Uses Next.js App Router (`src/app/`)
- **Styling**: Tailwind CSS 4 with PostCSS (`@tailwindcss/postcss`)
- **Fonts**: Geist font family via `next/font/google`
- **Path alias**: `@/*` maps to `./src/*`

## Application: English Verb Revision

Application pour réviser les verbes réguliers et irréguliers anglais avec traductions françaises.

### Structure des fichiers

```
src/
├── app/
│   ├── page.tsx                        # Page d'accueil avec liste des verbes
│   ├── layout.tsx                      # Layout avec SpeechProvider et ThemeToggle
│   ├── globals.css                     # Styles globaux + dark mode Tailwind 4
│   ├── verb/[slug]/page.tsx            # Page de détail d'un verbe (SSG)
│   └── verb/[slug]/exemples/[tense]/page.tsx  # Page exemples d'un temps (SSG)
├── components/
│   ├── VerbList.tsx          # Liste principale avec filtres/recherche
│   ├── VerbCard.tsx          # Carte d'un verbe avec favoris
│   ├── VerbDetail.tsx        # Détail d'un verbe avec conjugaisons
│   ├── TenseExamples.tsx     # Page exemples d'un temps avec conjugaisons
│   ├── FilterBar.tsx         # Filtres, tri, groupement
│   ├── SearchInput.tsx       # Champ de recherche
│   ├── ThemeToggle.tsx       # Toggle dark/light mode
│   ├── SpeakButton.tsx       # Bouton de prononciation (utilise SpeechContext)
│   ├── SpeakableText.tsx     # Texte avec surlignage mot par mot pendant la lecture
│   └── VoiceSelector.tsx     # Sélecteur voix féminine/masculine
├── contexts/
│   └── SpeechContext.tsx     # Context React pour partager l'état de la synthèse vocale
├── hooks/
│   ├── useFavorites.ts       # Gestion des favoris (localStorage)
│   ├── usePersistedState.ts  # État persisté générique (localStorage)
│   └── useSpeech.ts          # Web Speech API avec choix de voix (legacy)
├── data/
│   ├── verbs.ts              # 230 verbes (119 irréguliers, 111 réguliers)
│   └── tenses.ts             # Données des 10 temps avec exemples et formation
└── lib/
    └── conjugation.ts        # Logique de conjugaison (10 temps)
```

### Fonctionnalités

- **Liste des verbes**: 230 verbes avec infinitif, prétérit, participe passé, traduction française
- **Recherche**: Par anglais ou français
- **Filtres**: Tous / Irréguliers / Réguliers / Favoris
- **Tri**: Par défaut / A-Z anglais / A-Z français
- **Groupement**: Sans / Par lettre
- **Favoris**: Étoile sur chaque carte, persisté en localStorage
- **Dark/Light mode**: Toggle avec persistance localStorage
- **Conjugaisons**: 10 temps (Simple, Continuous, Perfect, Perfect Continuous)
- **Prononciation**: Web Speech API avec boutons sur chaque conjugaison
- **Surlignage mot par mot**: Les mots sont surlignés au fur et à mesure de la lecture
- **Choix de voix**: Féminine ou masculine, persisté en localStorage
- **Pages exemples**: Chaque temps a une page dédiée avec formation et exemples d'utilisation

### Patterns techniques

- **SpeechContext**: Context React partagé pour la synthèse vocale, permet le surlignage mot par mot synchronisé entre composants
- **SpeakableText**: Composant qui affiche du texte avec surlignage dynamique pendant la lecture (utilise `wordOffset` pour tracker la position)
- **ConjugationTable**: Composant interne qui gère le calcul des offsets pour le surlignage lors de la lecture complète ou ligne par ligne
- **useSyncExternalStore**: Pour éviter les erreurs ESLint avec setState dans useEffect
- **Tailwind CSS 4 dark mode**: Utilise `@custom-variant dark (&:where(.dark, .dark *));` dans globals.css
- **Static Site Generation**: Pages de verbes générées statiquement avec `generateStaticParams`
- **localStorage sync**: Les hooks `usePersistedState` et `useFavorites` utilisent un store externe avec listeners pour synchroniser entre composants
- **Web Speech API onboundary**: Utilisation de l'événement `onboundary` pour tracker le mot actuel, avec fallback timer pour les navigateurs non supportés

### Clés localStorage

- `verb-filter`: Filtre sélectionné
- `verb-sort`: Option de tri
- `verb-group`: Option de groupement
- `verb-favorites`: Liste des verbes favoris
- `theme`: "dark" ou "light"
- `speech-voice-gender`: "female" ou "male"
