import { VerbList } from "@/components/VerbList";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 pl-16 sm:px-6 md:pl-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Verbes anglais
        </h1>
      </header>

      <VerbList />
    </div>
  );
}
