"use client";

import Link from "next/link";
import type { Verb } from "@/data/verbs";

type VerbCardProps = {
  verb: Verb;
  isFavorite: boolean;
  onToggleFavorite: (infinitive: string) => void;
};

export function VerbCard({ verb, isFavorite, onToggleFavorite }: VerbCardProps) {
  return (
    <div className="relative">
      <Link
        href={`/verb/${verb.infinitive}`}
        className="block rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {verb.infinitive}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {verb.french}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
              verb.isIrregular
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            }`}
          >
            {verb.isIrregular ? "irrégulier" : "régulier"}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {verb.pastSimple} / {verb.pastParticiple}
          </span>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(verb.infinitive);
        }}
        className="absolute bottom-3 right-3 p-1 text-zinc-400 transition-colors hover:text-amber-500 dark:text-zinc-500 dark:hover:text-amber-400"
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        {isFavorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-amber-500 dark:text-amber-400"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
