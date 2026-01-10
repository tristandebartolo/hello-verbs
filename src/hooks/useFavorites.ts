"use client";

import { useSyncExternalStore, useCallback, useMemo } from "react";

const STORAGE_KEY = "verb-favorites";

let cachedFavorites: string[] = [];

function getSnapshot(): string[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  const parsed = stored ? JSON.parse(stored) : [];
  if (JSON.stringify(parsed) !== JSON.stringify(cachedFavorites)) {
    cachedFavorites = parsed;
  }
  return cachedFavorites;
}

const emptyArray: string[] = [];
function getServerSnapshot(): string[] {
  return emptyArray;
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

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  const toggleFavorite = useCallback((verbInfinitive: string) => {
    const current = new Set(getSnapshot());
    if (current.has(verbInfinitive)) {
      current.delete(verbInfinitive);
    } else {
      current.add(verbInfinitive);
    }
    const newFavorites = Array.from(current);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    cachedFavorites = newFavorites;
    emitChange();
  }, []);

  const isFavorite = useCallback(
    (verbInfinitive: string) => favoritesSet.has(verbInfinitive),
    [favoritesSet]
  );

  return { favorites: favoritesSet, toggleFavorite, isFavorite };
}
