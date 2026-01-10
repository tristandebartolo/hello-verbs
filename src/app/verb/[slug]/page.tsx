import { notFound } from "next/navigation";
import { verbs, getVerbBySlug } from "@/data/verbs";
import { conjugateVerb } from "@/lib/conjugation";
import { VerbDetail } from "@/components/VerbDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return verbs.map((verb) => ({
    slug: verb.infinitive,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const verb = getVerbBySlug(slug);
  if (!verb) return { title: "Verbe non trouvé" };
  return {
    title: `${verb.infinitive} - ${verb.french} | Verbes anglais`,
  };
}

export default async function VerbPage({ params }: Props) {
  const { slug } = await params;
  const verb = getVerbBySlug(slug);

  if (!verb) {
    notFound();
  }

  const conjugations = conjugateVerb(verb);

  return <VerbDetail verb={verb} conjugations={conjugations} />;
}
