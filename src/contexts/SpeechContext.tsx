"use client";

import { createContext, useContext, useCallback, useState, useEffect, useRef, type ReactNode } from "react";
import { usePersistedState } from "@/hooks/usePersistedState";

export type VoiceGender = "female" | "male";

type SpeechContextType = {
  speak: (text: string, lang?: string, genderOverride?: VoiceGender) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  togglePause: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  voiceGender: VoiceGender;
  setVoiceGender: (gender: VoiceGender) => void;
  currentWordIndex: number;
  currentText: string;
};

const SpeechContext = createContext<SpeechContextType | null>(null);

function getVoiceByGender(
  gender: VoiceGender,
  lang: string
): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const langVoices = voices.filter((v) => v.lang.startsWith(lang.split("-")[0]));

  if (langVoices.length === 0) return null;

  const femalePatterns = [
    "female", "samantha", "victoria", "karen", "moira", "tessa",
    "fiona", "kate", "serena", "susan", "zira", "hazel", "heather", "ava",
  ];

  const malePatterns = [
    "male", "daniel", "david", "james", "tom", "oliver",
    "george", "fred", "alex", "lee", "rishi", "aaron",
  ];

  const patterns = gender === "female" ? femalePatterns : malePatterns;

  for (const voice of langVoices) {
    const voiceName = voice.name.toLowerCase();
    if (patterns.some((p) => voiceName.includes(p))) {
      return voice;
    }
  }

  if (gender === "female") {
    return langVoices[0];
  } else {
    return langVoices.length > 1 ? langVoices[1] : langVoices[0];
  }
}

export function SpeechProvider({ children }: { children: ReactNode }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [currentText, setCurrentText] = useState<string>("");
  const [voiceGender, setVoiceGender] = usePersistedState<VoiceGender>(
    "speech-voice-gender",
    "female"
  );
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const wordTimersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  useEffect(() => {
    return () => {
      wordTimersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const clearWordTimers = useCallback(() => {
    wordTimersRef.current.forEach((timer) => clearTimeout(timer));
    wordTimersRef.current = [];
  }, []);

  const speak = useCallback(
    (text: string, lang: string = "en-US", genderOverride?: VoiceGender) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        return;
      }

      window.speechSynthesis.cancel();
      clearWordTimers();
      setIsPaused(false);
      setCurrentText(text);
      setCurrentWordIndex(-1);

      const words = text.split(/\s+/).filter((w) => w.length > 0);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;

      if (voicesLoaded) {
        const voice = getVoiceByGender(genderOverride ?? voiceGender, lang);
        if (voice) {
          utterance.voice = voice;
        }
      }

      let boundarySupported = false;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentWordIndex(0);

        // Fallback timer-based highlighting
        const msPerWord = 400;

        words.forEach((_, index) => {
          const timer = setTimeout(() => {
            if (!boundarySupported) {
              setCurrentWordIndex(index);
            }
          }, index * msPerWord);
          wordTimersRef.current.push(timer);
        });
      };

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          boundarySupported = true;
          clearWordTimers();

          const charIndex = event.charIndex;
          let currentIdx = 0;
          let wordIdx = 0;

          for (let i = 0; i < words.length; i++) {
            const wordPos = text.indexOf(words[i], currentIdx);
            if (wordPos !== -1 && charIndex >= wordPos && charIndex < wordPos + words[i].length + 1) {
              wordIdx = i;
              break;
            }
            if (wordPos !== -1) {
              currentIdx = wordPos + words[i].length;
            }
            if (charIndex <= currentIdx) {
              wordIdx = i;
              break;
            }
            wordIdx = i;
          }

          setCurrentWordIndex(wordIdx);
        }
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentWordIndex(-1);
        setCurrentText("");
        clearWordTimers();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentWordIndex(-1);
        setCurrentText("");
        clearWordTimers();
      };

      window.speechSynthesis.speak(utterance);
    },
    [voiceGender, voicesLoaded, clearWordTimers]
  );

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const togglePause = useCallback(() => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isPaused, pause, resume]);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentWordIndex(-1);
      setCurrentText("");
      clearWordTimers();
    }
  }, [clearWordTimers]);

  return (
    <SpeechContext.Provider
      value={{
        speak,
        stop,
        pause,
        resume,
        togglePause,
        isSpeaking,
        isPaused,
        voiceGender,
        setVoiceGender,
        currentWordIndex,
        currentText,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
}

export function useSpeechContext() {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error("useSpeechContext must be used within a SpeechProvider");
  }
  return context;
}
