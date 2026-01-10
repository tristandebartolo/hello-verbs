import { VerbList } from "@/components/VerbList";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl p-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Verbes anglais
        </h1>
      </header>

      <VerbList />
    </div>
  );
}
