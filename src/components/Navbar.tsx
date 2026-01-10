"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { VoiceSelector } from "@/components/VoiceSelector";
import Link from "next/link";

type NavbarProps = {
  onMenuClick: () => void;
};

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side: Menu button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 md:hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            aria-label="Ouvrir le menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Link
            href="/"
            // onClick={onClose}
            className="text-xl font-bold text-zinc-900 dark:text-zinc-100 md:hidden"
          >
            English Verbs
          </Link>
        </div>

        {/* Right side: Voice selector + Theme toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <VoiceSelector />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
