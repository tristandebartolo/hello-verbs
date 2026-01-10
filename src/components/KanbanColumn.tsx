"use client";

import { useState } from "react";
import { type Verb } from "@/data/verbs";
import { type LearningCategory, categoryConfig } from "@/hooks/useFavoriteCategories";
import { KanbanCard } from "@/components/KanbanCard";

type KanbanColumnProps = {
  category: LearningCategory;
  verbs: Verb[];
  onDrop: (verbInfinitive: string, category: LearningCategory) => void;
};

export function KanbanColumn({ category, verbs, onDrop }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const config = categoryConfig[category];

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
      className={`flex min-w-[280px] flex-1 flex-col rounded-xl border-2 transition-colors ${
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
            className={`flex flex-1 items-center justify-center rounded-lg border-2 border-dashed p-4 ${
              isDragOver ? config.borderColor : "border-zinc-300 dark:border-zinc-600"
            }`}
          >
            <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
              Glissez des verbes ici
            </p>
          </div>
        ) : (
          verbs.map((verb) => <KanbanCard key={verb.infinitive} verb={verb} />)
        )}
      </div>
    </div>
  );
}
