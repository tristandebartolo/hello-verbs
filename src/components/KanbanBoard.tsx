"use client";

import { useMemo, useState, useCallback, createContext, useContext } from "react";
import { verbs, type Verb } from "@/data/verbs";
import { useFavorites } from "@/hooks/useFavorites";
import {
  useFavoriteCategories,
  type LearningCategory,
} from "@/hooks/useFavoriteCategories";
import { KanbanColumn } from "@/components/KanbanColumn";

const categories: LearningCategory[] = ["all", "learning", "next", "done"];

type DragContextType = {
  draggedVerb: string | null;
  setDraggedVerb: (verb: string | null) => void;
  onDrop: (verbInfinitive: string, category: LearningCategory) => void;
};

const DragContext = createContext<DragContextType | null>(null);

export function useDragContext() {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDragContext must be used within KanbanBoard");
  }
  return context;
}

export function KanbanBoard() {
  const { favorites } = useFavorites();
  const { getVerbsByCategory, moveVerb } = useFavoriteCategories();
  const [draggedVerb, setDraggedVerb] = useState<string | null>(null);

  const verbsByCategory = useMemo(() => {
    return getVerbsByCategory(favorites);
  }, [favorites, getVerbsByCategory]);

  const verbsMap = useMemo(() => {
    const map = new Map<string, Verb>();
    verbs.forEach((v) => map.set(v.infinitive, v));
    return map;
  }, []);

  const getVerbsForCategory = (category: LearningCategory): Verb[] => {
    return verbsByCategory[category]
      .map((infinitive) => verbsMap.get(infinitive))
      .filter((v): v is Verb => v !== undefined)
      .sort((a, b) => a.infinitive.localeCompare(b.infinitive));
  };

  const handleDrop = useCallback(
    (verbInfinitive: string, category: LearningCategory) => {
      moveVerb(verbInfinitive, category);
      setDraggedVerb(null);
    },
    [moveVerb]
  );

  const contextValue = useMemo(
    () => ({
      draggedVerb,
      setDraggedVerb,
      onDrop: handleDrop,
    }),
    [draggedVerb, handleDrop]
  );

  if (favorites.size === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 dark:border-zinc-700 dark:bg-zinc-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-400 dark:text-zinc-600"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Aucun favori
        </h3>
        <p className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Ajoutez des verbes en favoris depuis la liste des verbes pour les
          retrouver ici et organiser votre apprentissage.
        </p>
      </div>
    );
  }

  return (
    <DragContext.Provider value={contextValue}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <KanbanColumn
            key={category}
            category={category}
            verbs={getVerbsForCategory(category)}
          />
        ))}
      </div>
    </DragContext.Provider>
  );
}
