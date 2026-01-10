"use client";

import { useState } from "react";
import Link from "next/link";
import type { Verb } from "@/data/verbs";
import type { Conjugation } from "@/lib/conjugation";
import { SpeakButton } from "@/components/SpeakButton";
import { VoiceSelector } from "@/components/VoiceSelector";
import { useSpeech } from "@/hooks/useSpeech";
import { useFavorites } from "@/hooks/useFavorites";
import { getTenseNameToSlug } from "@/data/tenses";

type VerbDetailProps = {
  verb: Verb;
  conjugations: Conjugation[];
};

export function VerbDetail({ verb, conjugations }: VerbDetailProps) {
  const { speak, togglePause, stop, isSpeaking, isPaused } = useSpeech();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const fullVerbText = `${verb.infinitive}, ${verb.pastSimple}, ${verb.pastParticiple}`;
  const verbSlug = verb.infinitive;

  const handleSpeak = (text: string, id: string) => {
    setCurrentPlayingId(id);
    speak(text, "en-US");
  };

  const handleStop = () => {
    setCurrentPlayingId(null);
    stop();
  };

  // Reset currentPlayingId when speech ends
  const isCurrentPlaying = (id: string) => isSpeaking && currentPlayingId === id;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 pl-16 sm:px-6 md:pl-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour à la liste
          </Link>
          <VoiceSelector />
        </div>

        <header className="mb-10 relative">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              {verb.infinitive}
            </h1>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                verb.isIrregular
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                  : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
              }`}
            >
              {verb.isIrregular ? "irrégulier" : "régulier"}
            </span>
          </div>
          <p className="mt-2 text-xl text-zinc-600 dark:text-zinc-400">
            {verb.french}
          </p>
              
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(verb.infinitive);
            }}
            className="absolute bottom-3 right-3 p-1 text-zinc-400 transition-colors hover:text-amber-500 dark:text-zinc-500 dark:hover:text-amber-400"
            aria-label={
              isFavorite(verb.infinitive) ? "Retirer des favoris" : "Ajouter aux favoris"
            }
          >
            {isFavorite(verb.infinitive) ? (
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
        </header>

        <section className="mb-10 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Formes principales
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(fullVerbText, "main-forms")}
                className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                title="Écouter les 3 formes"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              </button>
              {isCurrentPlaying("main-forms") && (
                <>
                  <button
                    onClick={togglePause}
                    className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                    title={isPaused ? "Reprendre" : "Pause"}
                  >
                    {isPaused ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                      >
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={handleStop}
                    className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                    title="Arrêter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Infinitif
                </p>
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  {verb.infinitive}
                </p>
              </div>
              <SpeakButton text={verb.infinitive} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Prétérit
                </p>
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  {verb.pastSimple}
                </p>
              </div>
              <SpeakButton text={verb.pastSimple} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Participe passé
                </p>
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  {verb.pastParticiple}
                </p>
              </div>
              <SpeakButton text={verb.pastParticiple} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Conjugaisons
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {conjugations.map((conjugation) => (
              <div
                key={conjugation.tense}
                className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                  <div>
                    <Link
                      href={`/verb/${verbSlug}/exemples/${getTenseNameToSlug(conjugation.tense)}`}
                      className="font-semibold text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
                    >
                      {conjugation.tense}
                    </Link>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {conjugation.tenseFrench}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        const fullText = conjugation.forms
                          .map((f) => `${f.pronoun} ${f.conjugation}`)
                          .join(". ");
                        handleSpeak(fullText, conjugation.tense);
                      }}
                      className="flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                      title={`Écouter toutes les conjugaisons du ${conjugation.tenseFrench}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    </button>
                    {isCurrentPlaying(conjugation.tense) && (
                      <>
                        <button
                          onClick={togglePause}
                          className="flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                          title={isPaused ? "Reprendre" : "Pause"}
                        >
                          {isPaused ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              stroke="none"
                            >
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              stroke="none"
                            >
                              <rect x="6" y="4" width="4" height="16" />
                              <rect x="14" y="4" width="4" height="16" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={handleStop}
                          className="flex items-center justify-center rounded-lg border border-red-200 bg-red-50 p-1.5 text-red-600 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                          title="Arrêter"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="none"
                          >
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <table className="w-full text-sm">
                    <tbody>
                      {conjugation.forms.map((form) => (
                        <tr key={form.pronoun}>
                          <td className="w-25 py-1 pr-4 text-zinc-500 dark:text-zinc-400">
                            {form.pronoun}
                          </td>
                          <td className="py-1 font-medium text-zinc-900 dark:text-zinc-100">
                            {form.conjugation}
                          </td>
                          <td className="py-1 text-right">
                            <SpeakButton
                              text={`${form.pronoun} ${form.conjugation}`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
  );
}
