"use client";

import { useSpeech, type VoiceGender } from "@/hooks/useSpeech";

export function VoiceSelector() {
  const { voiceGender, setVoiceGender, speak } = useSpeech();

  const handleChange = (gender: VoiceGender) => {
    setVoiceGender(gender);
    // Play a sample to preview the voice with the new gender
    speak("Hello World", "en-US", gender);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-zinc-600 dark:text-zinc-400">Voix :</span>
      <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-700">
        <button
          onClick={() => handleChange("female")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
            voiceGender === "female"
              ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
          aria-pressed={voiceGender === "female"}
          title="Féminin"
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
            <circle cx="12" cy="8" r="5" />
            <path d="M12 13v8" />
            <path d="M9 18h6" />
          </svg>
        </button>
        <button
          onClick={() => handleChange("male")}
          className={`flex items-center gap-1.5 border-l border-zinc-200 px-3 py-1.5 text-sm transition-colors dark:border-zinc-700 ${
            voiceGender === "male"
              ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
          aria-pressed={voiceGender === "male"}
          title="Masculin"
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
            <circle cx="10" cy="14" r="5" />
            <path d="M19 5l-5.4 5.4" />
            <path d="M15 5h4v4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
