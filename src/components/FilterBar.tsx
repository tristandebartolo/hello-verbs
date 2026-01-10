"use client";

export type VerbFilter = "all" | "irregular" | "regular" | "favorites";
export type SortOption = "default" | "alpha-en" | "alpha-fr" | "alpha-en-desc" | "alpha-fr-desc";
export type GroupOption = "none" | "letter";

type FilterBarProps = {
  filter: VerbFilter;
  onFilterChange: (filter: VerbFilter) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  group: GroupOption;
  onGroupChange: (group: GroupOption) => void;
  onReset: () => void;
};

export function FilterBar({
  filter,
  onFilterChange,
  sort,
  onSortChange,
  group,
  onGroupChange,
  onReset,
}: FilterBarProps) {
  const hasActiveFilters =
    filter !== "all" || sort !== "default" || group !== "none";

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm text-zinc-600 dark:text-zinc-400">
          Filtrer :
        </label>
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as VerbFilter)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500"
        >
          <option value="all">Tous</option>
          <option value="irregular">Irréguliers</option>
          <option value="regular">Réguliers</option>
          <option value="favorites">Favoris</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-zinc-600 dark:text-zinc-400">
          Trier :
        </label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500"
        >
          <option value="default">Par défaut</option>
          <option value="alpha-en">A-Z (anglais)</option>
          <option value="alpha-fr">A-Z (français)</option>
          <option value="alpha-en-desc">Z-A (anglais)</option>
          <option value="alpha-fr-desc">Z-A (français)</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-zinc-600 dark:text-zinc-400">
          Grouper :
        </label>
        <select
          value={group}
          onChange={(e) => onGroupChange(e.target.value as GroupOption)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500"
        >
          <option value="none">Sans groupement</option>
          <option value="letter">Par lettre</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          title="Réinitialiser"
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
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
