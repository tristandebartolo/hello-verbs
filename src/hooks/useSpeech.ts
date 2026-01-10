"use client";

import { useCallback, useState, useEffect } from "react";
import { usePersistedState } from "@/hooks/usePersistedState";

export type VoiceGender = "female" | "male";

function getVoiceByGender(
  gender: VoiceGender,
  lang: string
): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const langVoices = voices.filter((v) => v.lang.startsWith(lang.split("-")[0]));

  if (langVoices.length === 0) return null;

  // Common female voice name patterns
  const femalePatterns = [
    "female",
    "samantha",
    "victoria",
    "karen",
    "moira",
    "tessa",
    "fiona",
    "kate",
    "serena",
    "susan",
    "zira",
    "hazel",
    "heather",
    "ava",
  ];

  // Common male voice name patterns
  const malePatterns = [
    "male",
    "daniel",
    "david",
    "james",
    "tom",
    "oliver",
    "george",
    "fred",
    "alex",
    "lee",
    "rishi",
    "aaron",
  ];

  const patterns = gender === "female" ? femalePatterns : malePatterns;
  const nameLower = (name: string) => name.toLowerCase();

  // Try to find a voice matching the gender
  for (const voice of langVoices) {
    const voiceName = nameLower(voice.name);
    if (patterns.some((p) => voiceName.includes(p))) {
      return voice;
    }
  }

  // Fallback: return first or second voice based on gender
  // Many systems list female voices first
  if (gender === "female") {
    return langVoices[0];
  } else {
    return langVoices.length > 1 ? langVoices[1] : langVoices[0];
  }
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voiceGender, setVoiceGender] = usePersistedState<VoiceGender>(
    "speech-voice-gender",
    "female"
  );
  const [voicesLoaded, setVoicesLoaded] = useState(false);

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

  const speak = useCallback(
    (text: string, lang: string = "en-US", genderOverride?: VoiceGender) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        return;
      }

      window.speechSynthesis.cancel();
      setIsPaused(false);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;

      if (voicesLoaded) {
        const voice = getVoiceByGender(genderOverride ?? voiceGender, lang);
        if (voice) {
          utterance.voice = voice;
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [voiceGender, voicesLoaded]
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
    }
  }, []);

  return { speak, stop, pause, resume, togglePause, isSpeaking, isPaused, voiceGender, setVoiceGender };
}
