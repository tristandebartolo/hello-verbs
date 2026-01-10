"use client";

import { useState, useRef, useEffect } from "react";
import { type Verb } from "@/data/verbs";
import { type LearningCategory, categoryConfig } from "@/hooks/useFavoriteCategories";
import { KanbanCard } from "@/components/KanbanCard";
import { useDragContext } from "@/components/KanbanBoard";

type KanbanColumnProps = {
  category: LearningCategory;
  verbs: Verb[];
};

export function KanbanColumn({ category, verbs }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const columnRef = useRef<HTMLDivElement>(null);
  const { draggedVerb, onDrop } = useDragContext();
  const config = categoryConfig[category];

  // Handle touch drop detection
  useEffect(() => {
    if (!draggedVerb) {
      setIsDragOver(false);
      return;
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!columnRef.current || !draggedVerb) return;

      const touch = e.touches[0];
      const rect = columnRef.current.getBoundingClientRect();

      const isOver =
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom;

      setIsDragOver(isOver);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!columnRef.current || !draggedVerb) return;

      const touch = e.changedTouches[0];
      const rect = columnRef.current.getBoundingClientRect();

      const isOver =
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom;

      if (isOver) {
        onDrop(draggedVerb, category);
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [draggedVerb, category, onDrop]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const verbInfinitive = e.dataTransfer.getData("text/plain");
    if (verbInfinitive) {
      onDrop(verbInfinitive, category);
    }
  };

  return (
    <div
      ref={columnRef}
      className={`flex min-w-70 flex-1 flex-col rounded-xl border-2 transition-colors ${
        isDragOver
          ? `${config.borderColor} ${config.bgColor}`
          : "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className={`rounded-t-lg border-b-2 ${config.borderColor} ${config.bgColor} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <h2 className={`font-semibold ${config.color}`}>{config.label}</h2>
          <span
            className={`flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-medium ${config.bgColor} ${config.color}`}
          >
            {verbs.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
        {verbs.length === 0 ? (
          <div
            className={`flex flex-1 items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
              isDragOver ? config.borderColor : "border-zinc-300 dark:border-zinc-600"
            }`}
          >
            <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
              {isDragOver ? "Relâchez ici" : "Glissez des verbes ici"}
            </p>
          </div>
        ) : (
          verbs.map((verb) => <KanbanCard key={verb.infinitive} verb={verb} />)
        )}
      </div>
    </div>
  );
}
