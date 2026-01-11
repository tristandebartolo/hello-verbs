"use client";

import { useSpeechContext } from "@/contexts/SpeechContext";

type SpeakButtonProps = {
  text: string;
  lang?: string;
  size?: "sm" | "md";
};

export function SpeakButton({ text, lang = "en-US", size = "sm" }: SpeakButtonProps) {
  const { speak } = useSpeechContext();

  const iconSize = size === "sm" ? 14 : 18;
  const padding = size === "sm" ? "p-1" : "p-1.5";

  return (
    <button
      onClick={() => speak(text, lang)}
      className={`${padding} rounded text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300`}
      aria-label={`Écouter "${text}"`}
      title={`Écouter "${text}"`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
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
  );
}
