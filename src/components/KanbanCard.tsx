"use client";

import { useRef } from "react";
import Link from "next/link";
import { type Verb } from "@/data/verbs";
import { useFavorites } from "@/hooks/useFavorites";
import { useDragContext } from "@/components/KanbanBoard";

type KanbanCardProps = {
  verb: Verb;
};

export function KanbanCard({ verb }: KanbanCardProps) {
  const { toggleFavorite } = useFavorites();
  const { draggedVerb, setDraggedVerb } = useDragContext();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDragging = draggedVerb === verb.infinitive;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", verb.infinitive);
    e.dataTransfer.effectAllowed = "move";
    setDraggedVerb(verb.infinitive);
  };

  const handleDragEnd = () => {
    setDraggedVerb(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    // Start drag if moved more than 10px
    if (deltaX > 10 || deltaY > 10) {
      if (!isDragging) {
        setDraggedVerb(verb.infinitive);
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    // Don't reset draggedVerb here - let the column handle the drop
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-verb={verb.infinitive}
      className={`group touch-none select-none rounded-lg border border-zinc-200 bg-white p-3 shadow-sm transition-all dark:border-zinc-700 dark:bg-zinc-800 ${
        isDragging
          ? "scale-105 opacity-50 shadow-lg ring-2 ring-blue-500"
          : "cursor-grab hover:shadow-md active:cursor-grabbing"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/verb/${verb.infinitive}`}
          className="flex-1"
          onClick={(e) => {
            if (isDragging) e.preventDefault();
          }}
        >
          <div className="font-medium text-zinc-900 dark:text-zinc-100">
            {verb.infinitive}
          </div>
          <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {verb.french}
          </div>
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isDragging) {
              toggleFavorite(verb.infinitive);
            }
          }}
          className="flex h-7 w-7 items-center justify-center rounded-md text-amber-500 opacity-100 transition-opacity hover:bg-zinc-100 sm:opacity-0 sm:group-hover:opacity-100 dark:hover:bg-zinc-700"
          aria-label="Retirer des favoris"
          title="Retirer des favoris"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span
          className={`inline-flex rounded px-1.5 py-0.5 text-xs font-medium ${
            verb.isIrregular
              ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
              : "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
          }`}
        >
          {verb.isIrregular ? "Irrégulier" : "Régulier"}
        </span>
      </div>
    </div>
  );
}
