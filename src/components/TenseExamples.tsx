"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Verb } from "@/data/verbs";
import type { TenseData } from "@/data/tenses";
import type { Conjugation } from "@/lib/conjugation";
import { SpeakButton } from "@/components/SpeakButton";
import { SpeakableText } from "@/components/SpeakableText";
import { VoiceSelector } from "@/components/VoiceSelector";
import { useSpeechContext } from "@/contexts/SpeechContext";

type TenseExamplesProps = {
  verb: Verb;
  tense: TenseData;
  conjugation: Conjugation;
};

type ConjugationTableProps = {
  conjugation: Conjugation;
  fullConjugationText: string;
};

function ConjugationTable({ conjugation, fullConjugationText }: ConjugationTableProps) {
  const { currentText } = useSpeechContext();

  return (
    <table className="w-full text-sm">
      <tbody>
        {conjugation.forms.map((form, formIndex) => {
          const formText = `${form.pronoun} ${form.conjugation}`;
          // Calcul de l'offset pour ce form dans fullConjugationText
          const wordOffsetInFull = conjugation.forms
            .slice(0, formIndex)
            .reduce((acc, f) => {
              const words = `${f.pronoun} ${f.conjugation}`.split(/\s+/).filter(w => w.length > 0);
              return acc + words.length;
            }, 0);
          const pronounWordCount = form.pronoun.split(/\s+/).filter(w => w.length > 0).length;

          // Détermine si on lit le texte complet ou une ligne individuelle
          const isReadingFull = currentText === fullConjugationText;
          const speakingText = isReadingFull ? fullConjugationText : formText;
          const pronounOffset = isReadingFull ? wordOffsetInFull : 0;
          const conjugationOffset = isReadingFull ? wordOffsetInFull + pronounWordCount : pronounWordCount;

          return (
            <tr
              key={form.pronoun}
              className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
            >
              <td className="w-28 py-2 pr-4">
                <SpeakableText
                  text={form.pronoun}
                  speakingText={speakingText}
                  wordOffset={pronounOffset}
                  className="text-zinc-400 dark:text-zinc-500"
                />
              </td>
              <td className="py-2 font-medium text-zinc-900 dark:text-zinc-100">
                <SpeakableText
                  text={form.conjugation}
                  speakingText={speakingText}
                  wordOffset={conjugationOffset}
                />
              </td>
              <td className="py-2 text-right">
                <SpeakButton text={formText} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function TenseExamples({
  verb,
  tense,
  conjugation,
}: TenseExamplesProps) {
  const { speak, togglePause, stop, isSpeaking, isPaused, currentText } = useSpeechContext();
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  // Texte complet des conjugaisons
  const fullConjugationText = conjugation.forms
    .map((f) => `${f.pronoun} ${f.conjugation}`)
    .join(". ");

  // Reset currentPlayingId when speech ends
  useEffect(() => {
    if (!isSpeaking) {
      setCurrentPlayingId(null);
    }
  }, [isSpeaking]);

  const handleSpeak = (text: string, id: string) => {
    setCurrentPlayingId(id);
    speak(text, "en-US");
  };

  const handleStop = () => {
    setCurrentPlayingId(null);
    stop();
  };

  // Check if a specific section is playing
  const isCurrentPlaying = (id: string, expectedText: string) => {
    return isSpeaking && currentPlayingId === id && currentText === expectedText;
  };

  return (
    <div className="mx-auto max-w-4xl p-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href={`/verb/${verb.infinitive}`}
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
          Retour à {verb.infinitive}
        </Link>
        {/* <VoiceSelector /> */}
      </div>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            {tense.name}
          </h1>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {verb.infinitive}
          </span>
        </div>
        <p className="mt-2 text-xl text-zinc-600 dark:text-zinc-400">
          {tense.nameFrench}
        </p>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">
          {tense.description}
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {tense.descriptionFrench}
        </p>
      </header>

      <section className="mb-10 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Conjugaison de &quot;{verb.infinitive}&quot;
          </h2>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleSpeak(fullConjugationText, "conjugation")}
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
            {isCurrentPlaying("conjugation", fullConjugationText) && (
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

        <ConjugationTable
          conjugation={conjugation}
          fullConjugationText={fullConjugationText}
        />
      </section>

      <section className="mb-10 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Formation
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-28 shrink-0 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Affirmatif
            </span>
            <span className="text-zinc-700 dark:text-zinc-300">
              {tense.formation.affirmative}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-28 shrink-0 text-sm font-medium text-red-600 dark:text-red-400">
              Négatif
            </span>
            <span className="text-zinc-700 dark:text-zinc-300">
              {tense.formation.negative}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-28 shrink-0 text-sm font-medium text-blue-600 dark:text-blue-400">
              Interrogatif
            </span>
            <span className="text-zinc-700 dark:text-zinc-300">
              {tense.formation.interrogative}
            </span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Exemples d&apos;utilisation
        </h2>
        <div className="space-y-4">
          {tense.usage.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-3">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item.titleFrench}
                </p>
              </div>
              <div className="rounded-md bg-zinc-50 p-4 dark:bg-zinc-800">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    <SpeakableText text={item.example} />
                  </p>
                  <SpeakButton text={item.example} size="md" />
                </div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {item.exampleFrench}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Mots-clés indicateurs
        </h2>
        <div className="flex flex-wrap gap-2">
          {tense.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
