import { KanbanBoard } from "@/components/KanbanBoard";

export default function FavorisPage() {
  return (
    <div className="p-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Mon apprentissage
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Organisez vos verbes favoris par catégorie d&apos;apprentissage en les
          glissant-déposant dans les colonnes.
        </p>
      </header>

      <KanbanBoard />
    </div>
  );
}
