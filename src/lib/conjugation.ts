import type { Verb } from "@/data/verbs";

export type Conjugation = {
  tense: string;
  tenseFrench: string;
  forms: {
    pronoun: string;
    conjugation: string;
  }[];
};

function getGerund(infinitive: string): string {
  if (infinitive === "be") return "being";
  if (infinitive === "lie") return "lying";
  if (infinitive === "die") return "dying";
  if (infinitive === "tie") return "tying";

  if (infinitive.endsWith("ie")) {
    return infinitive.slice(0, -2) + "ying";
  }
  if (infinitive.endsWith("e") && !infinitive.endsWith("ee")) {
    return infinitive.slice(0, -1) + "ing";
  }
  if (
    infinitive.length >= 3 &&
    !["a", "e", "i", "o", "u"].includes(infinitive[infinitive.length - 2]) &&
    ["a", "e", "i", "o", "u"].includes(infinitive[infinitive.length - 3]) &&
    !["w", "x", "y"].includes(infinitive[infinitive.length - 1])
  ) {
    return infinitive + infinitive[infinitive.length - 1] + "ing";
  }
  return infinitive + "ing";
}

function getThirdPersonSingular(infinitive: string): string {
  if (infinitive === "be") return "is";
  if (infinitive === "have") return "has";
  if (infinitive === "do") return "does";
  if (infinitive === "go") return "goes";

  if (
    infinitive.endsWith("s") ||
    infinitive.endsWith("sh") ||
    infinitive.endsWith("ch") ||
    infinitive.endsWith("x") ||
    infinitive.endsWith("z") ||
    infinitive.endsWith("o")
  ) {
    return infinitive + "es";
  }
  if (
    infinitive.endsWith("y") &&
    !["a", "e", "i", "o", "u"].includes(infinitive[infinitive.length - 2])
  ) {
    return infinitive.slice(0, -1) + "ies";
  }
  return infinitive + "s";
}

export function conjugateVerb(verb: Verb): Conjugation[] {
  const { infinitive, pastSimple, pastParticiple } = verb;
  const gerund = getGerund(infinitive);
  const thirdPerson = getThirdPersonSingular(infinitive);

  const isBe = infinitive === "be";

  return [
    {
      tense: "Present Simple",
      tenseFrench: "Présent simple",
      forms: [
        { pronoun: "I", conjugation: isBe ? "am" : infinitive },
        { pronoun: "You", conjugation: isBe ? "are" : infinitive },
        { pronoun: "He/She/It", conjugation: isBe ? "is" : thirdPerson },
        { pronoun: "We", conjugation: isBe ? "are" : infinitive },
        { pronoun: "They", conjugation: isBe ? "are" : infinitive },
      ],
    },
    {
      tense: "Present Continuous",
      tenseFrench: "Présent continu",
      forms: [
        { pronoun: "I", conjugation: `am ${gerund}` },
        { pronoun: "You", conjugation: `are ${gerund}` },
        { pronoun: "He/She/It", conjugation: `is ${gerund}` },
        { pronoun: "We", conjugation: `are ${gerund}` },
        { pronoun: "They", conjugation: `are ${gerund}` },
      ],
    },
    {
      tense: "Past Simple",
      tenseFrench: "Passé simple",
      forms: [
        {
          pronoun: "I",
          conjugation: isBe ? "was" : pastSimple,
        },
        {
          pronoun: "You",
          conjugation: isBe ? "were" : pastSimple,
        },
        {
          pronoun: "He/She/It",
          conjugation: isBe ? "was" : pastSimple,
        },
        {
          pronoun: "We",
          conjugation: isBe ? "were" : pastSimple,
        },
        {
          pronoun: "They",
          conjugation: isBe ? "were" : pastSimple,
        },
      ],
    },
    {
      tense: "Past Continuous",
      tenseFrench: "Passé continu",
      forms: [
        { pronoun: "I", conjugation: `was ${gerund}` },
        { pronoun: "You", conjugation: `were ${gerund}` },
        { pronoun: "He/She/It", conjugation: `was ${gerund}` },
        { pronoun: "We", conjugation: `were ${gerund}` },
        { pronoun: "They", conjugation: `were ${gerund}` },
      ],
    },
    {
      tense: "Future Simple",
      tenseFrench: "Futur simple",
      forms: [
        { pronoun: "I", conjugation: `will ${infinitive}` },
        { pronoun: "You", conjugation: `will ${infinitive}` },
        { pronoun: "He/She/It", conjugation: `will ${infinitive}` },
        { pronoun: "We", conjugation: `will ${infinitive}` },
        { pronoun: "They", conjugation: `will ${infinitive}` },
      ],
    },
    {
      tense: "Future Continuous",
      tenseFrench: "Futur continu",
      forms: [
        { pronoun: "I", conjugation: `will be ${gerund}` },
        { pronoun: "You", conjugation: `will be ${gerund}` },
        { pronoun: "He/She/It", conjugation: `will be ${gerund}` },
        { pronoun: "We", conjugation: `will be ${gerund}` },
        { pronoun: "They", conjugation: `will be ${gerund}` },
      ],
    },
    {
      tense: "Present Perfect",
      tenseFrench: "Passé composé",
      forms: [
        { pronoun: "I", conjugation: `have ${pastParticiple}` },
        { pronoun: "You", conjugation: `have ${pastParticiple}` },
        { pronoun: "He/She/It", conjugation: `has ${pastParticiple}` },
        { pronoun: "We", conjugation: `have ${pastParticiple}` },
        { pronoun: "They", conjugation: `have ${pastParticiple}` },
      ],
    },
    {
      tense: "Present Perfect Continuous",
      tenseFrench: "Passé composé continu",
      forms: [
        { pronoun: "I", conjugation: `have been ${gerund}` },
        { pronoun: "You", conjugation: `have been ${gerund}` },
        { pronoun: "He/She/It", conjugation: `has been ${gerund}` },
        { pronoun: "We", conjugation: `have been ${gerund}` },
        { pronoun: "They", conjugation: `have been ${gerund}` },
      ],
    },
    {
      tense: "Past Perfect",
      tenseFrench: "Plus-que-parfait",
      forms: [
        { pronoun: "I", conjugation: `had ${pastParticiple}` },
        { pronoun: "You", conjugation: `had ${pastParticiple}` },
        { pronoun: "He/She/It", conjugation: `had ${pastParticiple}` },
        { pronoun: "We", conjugation: `had ${pastParticiple}` },
        { pronoun: "They", conjugation: `had ${pastParticiple}` },
      ],
    },
    {
      tense: "Past Perfect Continuous",
      tenseFrench: "Plus-que-parfait continu",
      forms: [
        { pronoun: "I", conjugation: `had been ${gerund}` },
        { pronoun: "You", conjugation: `had been ${gerund}` },
        { pronoun: "He/She/It", conjugation: `had been ${gerund}` },
        { pronoun: "We", conjugation: `had been ${gerund}` },
        { pronoun: "They", conjugation: `had been ${gerund}` },
      ],
    },
  ];
}
