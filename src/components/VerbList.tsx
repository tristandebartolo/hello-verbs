"use client";

import { useState, useMemo } from "react";
import { verbs, type Verb } from "@/data/verbs";
import { VerbCard } from "@/components/VerbCard";
import { SearchInput } from "@/components/SearchInput";
import {
  FilterBar,
  type VerbFilter,
  type SortOption,
  type GroupOption,
} from "@/components/FilterBar";
import { useFavorites } from "@/hooks/useFavorites";
import { usePersistedState } from "@/hooks/usePersistedState";

export function VerbList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = usePersistedState<VerbFilter>("verb-filter", "all");
  const [sort, setSort] = usePersistedState<SortOption>("verb-sort", "default");
  const [group, setGroup] = usePersistedState<GroupOption>("verb-group", "none");
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const resetFilters = () => {
    setSearch("");
    setFilter("all");
    setSort("default");
    setGroup("none");
  };

  const processedVerbs = useMemo(() => {
    let result = [...verbs];

    // Filtre par recherche
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (verb) =>
          verb.infinitive.toLowerCase().includes(searchLower) ||
          verb.french.toLowerCase().includes(searchLower)
      );
    }

    // Filtre par type
    if (filter === "irregular") {
      result = result.filter((v) => v.isIrregular);
    } else if (filter === "regular") {
      result = result.filter((v) => !v.isIrregular);
    } else if (filter === "favorites") {
      result = result.filter((v) => favorites.has(v.infinitive));
    }

    // Tri
    if (sort === "alpha-en") {
      result.sort((a, b) => a.infinitive.localeCompare(b.infinitive));
    } else if (sort === "alpha-fr") {
      result.sort((a, b) => a.french.localeCompare(b.french, "fr"));
    } else if (sort === "alpha-en-desc") {
      result.sort((a, b) => b.infinitive.localeCompare(a.infinitive));
    } else if (sort === "alpha-fr-desc") {
      result.sort((a, b) => b.french.localeCompare(a.french, "fr"));
    }

    return result;
  }, [search, filter, sort, favorites]);

  const groupedVerbs = useMemo(() => {
    if (group === "none") {
      return null;
    }

    const groups: Record<string, Verb[]> = {};
    const sortKey = sort === "alpha-fr" || sort === "alpha-fr-desc" ? "french" : "infinitive";
    const isDescending = sort === "alpha-en-desc" || sort === "alpha-fr-desc";

    for (const verb of processedVerbs) {
      const letter = verb[sortKey][0].toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(verb);
    }

    return Object.entries(groups).sort(([a], [b]) =>
      isDescending ? b.localeCompare(a) : a.localeCompare(b)
    );
  }, [processedVerbs, group, sort]);

  const irregularCount = processedVerbs.filter((v) => v.isIrregular).length;
  const regularCount = processedVerbs.length - irregularCount;

  return (
    <>
      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        group={group}
        onGroupChange={setGroup}
        onReset={resetFilters}
      />

      <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
        {processedVerbs.length} verbe{processedVerbs.length > 1 ? "s" : ""}
        {filter === "all" && !search && (
          <>
            {" "}
            ({irregularCount} irrégulier{irregularCount > 1 ? "s" : ""},{" "}
            {regularCount} régulier{regularCount > 1 ? "s" : ""})
          </>
        )}
        {filter === "favorites" && processedVerbs.length === 0 && (
          <span className="ml-1">
            — Cliquez sur l&apos;étoile pour ajouter des favoris
          </span>
        )}
      </p>

      {processedVerbs.length === 0 ? (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          {filter === "favorites"
            ? "Aucun favori pour le moment"
            : `Aucun verbe trouvé pour "${search}"`}
        </p>
      ) : groupedVerbs ? (
        <>
          <nav id="alpha-nav" className="mb-6 flex flex-wrap gap-1 scroll-mt-4">
            {groupedVerbs.map(([letter]) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`letter-${letter}`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
              >
                {letter}
              </a>
            ))}
          </nav>
          <div className="space-y-8">
            {groupedVerbs.map(([letter, verbsInGroup]) => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-4">
                <div className="mb-4 flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {letter}
                  </h2>
                  <button
                    onClick={() => {
                      document.getElementById("alpha-nav")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                    title="Retour à la navigation"
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
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {verbsInGroup.map((verb) => (
                    <VerbCard
                      key={verb.infinitive}
                      verb={verb}
                      isFavorite={isFavorite(verb.infinitive)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processedVerbs.map((verb) => (
            <VerbCard
              key={verb.infinitive}
              verb={verb}
              isFavorite={isFavorite(verb.infinitive)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
}
