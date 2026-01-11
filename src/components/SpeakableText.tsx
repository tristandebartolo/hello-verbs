"use client";

import { useMemo } from "react";
import { useSpeechContext } from "@/contexts/SpeechContext";

type SpeakableTextProps = {
  text: string;
  /** Le texte complet qui sera prononcé quand on clique sur le bouton associé */
  speakingText?: string;
  /** L'offset en nombre de mots dans speakingText où commence ce texte */
  wordOffset?: number;
  className?: string;
  highlightClassName?: string;
};

export function SpeakableText({
  text,
  speakingText,
  wordOffset = 0,
  className = "",
  highlightClassName = "bg-amber-300 dark:bg-amber-500/50 rounded px-0.5 -mx-0.5",
}: SpeakableTextProps) {
  const { isSpeaking, currentWordIndex, currentText } = useSpeechContext();

  // Le texte de référence pour la comparaison
  const referenceText = speakingText || text;

  // Vérifie si ce composant doit être surligné
  // Le currentText doit correspondre exactement au speakingText passé
  const shouldHighlight = useMemo(() => {
    if (!isSpeaking || !currentText) return false;

    // Correspondance exacte uniquement
    return currentText === referenceText;
  }, [isSpeaking, currentText, referenceText]);

  // Split text into words and spaces for multi-word highlighting
  const parts = useMemo(() => {
    const result: { type: "word" | "space"; value: string; wordIndex: number }[] = [];
    const regex = /(\s+)/g;
    let lastIndex = 0;
    let wordIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result.push({
          type: "word",
          value: text.slice(lastIndex, match.index),
          wordIndex: wordIndex++,
        });
      }
      result.push({
        type: "space",
        value: match[0],
        wordIndex: -1,
      });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push({
        type: "word",
        value: text.slice(lastIndex),
        wordIndex: wordIndex,
      });
    }

    return result;
  }, [text]);

  // Nombre de mots dans notre texte
  const wordCount = useMemo(() => {
    return text.split(/\s+/).filter((w) => w.length > 0).length;
  }, [text]);

  // Si pas en cours de lecture, afficher le texte sans surlignement
  if (!shouldHighlight) {
    return <span className={className}>{text}</span>;
  }

  // Calculer quel mot local doit être surligné
  const localWordIndex = currentWordIndex - wordOffset;
  const isInRange = localWordIndex >= 0 && localWordIndex < wordCount;

  if (!isInRange) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (part.type === "space") {
          return <span key={idx}>{part.value}</span>;
        }

        const isHighlighted = part.wordIndex === localWordIndex;

        return (
          <span
            key={idx}
            className={isHighlighted ? highlightClassName : ""}
          >
            {part.value}
          </span>
        );
      })}
    </span>
  );
}
