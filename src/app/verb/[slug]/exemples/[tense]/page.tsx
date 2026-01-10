import { notFound } from "next/navigation";
import { verbs, getVerbBySlug } from "@/data/verbs";
import { tenses, getTenseBySlug } from "@/data/tenses";
import { conjugateVerb } from "@/lib/conjugation";
import { TenseExamples } from "@/components/TenseExamples";

type Props = {
  params: Promise<{ slug: string; tense: string }>;
};

export function generateStaticParams() {
  const params: { slug: string; tense: string }[] = [];

  for (const verb of verbs) {
    for (const tense of tenses) {
      params.push({
        slug: verb.infinitive,
        tense: tense.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props) {
  const { slug, tense: tenseSlug } = await params;
  const verb = getVerbBySlug(slug);
  const tense = getTenseBySlug(tenseSlug);

  if (!verb || !tense) return { title: "Page non trouvée" };

  return {
    title: `${verb.infinitive} - ${tense.name} | Exemples`,
  };
}

export default async function TenseExamplesPage({ params }: Props) {
  const { slug, tense: tenseSlug } = await params;
  const verb = getVerbBySlug(slug);
  const tense = getTenseBySlug(tenseSlug);

  if (!verb || !tense) {
    notFound();
  }

  const conjugations = conjugateVerb(verb);
  const conjugation = conjugations.find((c) => c.tense === tense.name);

  if (!conjugation) {
    notFound();
  }

  return <TenseExamples verb={verb} tense={tense} conjugation={conjugation} />;
}
