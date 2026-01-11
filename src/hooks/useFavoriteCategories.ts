"use client";

import { useSyncExternalStore, useCallback, useMemo } from "react";

export type LearningCategory = "all" | "learning" | "next" | "done";

export type FavoriteCategories = {
  [verbInfinitive: string]: LearningCategory;
};

const STORAGE_KEY = "verb-favorite-categories";

let cachedCategories: FavoriteCategories = {};

function getSnapshot(): FavoriteCategories {
  const stored = localStorage.getItem(STORAGE_KEY);
  const parsed = stored ? JSON.parse(stored) : {};
  if (JSON.stringify(parsed) !== JSON.stringify(cachedCategories)) {
    cachedCategories = parsed;
  }
  return cachedCategories;
}

const emptyObject: FavoriteCategories = {};
function getServerSnapshot(): FavoriteCategories {
  return emptyObject;
}

let listeners: Array<() => void> = [];

function subscribe(callback: () => void): () => void {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function emitChange() {
  listeners.forEach((l) => l());
}

export const categoryConfig: Record<
  LearningCategory,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  all: {
    label: "Tous les favoris",
    color: "text-zinc-600 dark:text-zinc-400",
    bgColor: "bg-zinc-100 dark:bg-zinc-800",
    borderColor: "border-zinc-300 dark:border-zinc-600",
  },
  learning: {
    label: "En cours",
    color: "text-fuchsia-600 dark:text-fuchsia-400",
    bgColor: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
    borderColor: "border-fuchsia-300 dark:border-fuchsia-600",
  },
  next: {
    label: "Prochain",
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-50 dark:bg-rose-900/20",
    borderColor: "border-rose-300 dark:border-rose-600",
  },
  done: {
    label: "Validés",
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-50 dark:bg-sky-900/20",
    borderColor: "border-sky-300 dark:border-sky-600",
  },
};

export function useFavoriteCategories() {
  const categories = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setCategory = useCallback(
    (verbInfinitive: string, category: LearningCategory) => {
      const current = { ...getSnapshot() };
      if (category === "all") {
        delete current[verbInfinitive];
      } else {
        current[verbInfinitive] = category;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      cachedCategories = current;
      emitChange();
    },
    []
  );

  const getCategory = useCallback(
    (verbInfinitive: string): LearningCategory => {
      return categories[verbInfinitive] || "all";
    },
    [categories]
  );

  const moveVerb = useCallback(
    (verbInfinitive: string, toCategory: LearningCategory) => {
      setCategory(verbInfinitive, toCategory);
    },
    [setCategory]
  );

  const getVerbsByCategory = useCallback(
    (favorites: Set<string>) => {
      const result: Record<LearningCategory, string[]> = {
        all: [],
        learning: [],
        next: [],
        done: [],
      };

      favorites.forEach((verb) => {
        const category = categories[verb] || "all";
        result[category].push(verb);
      });

      return result;
    },
    [categories]
  );

  return {
    categories,
    setCategory,
    getCategory,
    moveVerb,
    getVerbsByCategory,
  };
}
