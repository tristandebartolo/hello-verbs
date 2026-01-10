export type TenseData = {
  slug: string;
  name: string;
  nameFrench: string;
  description: string;
  descriptionFrench: string;
  usage: {
    title: string;
    titleFrench: string;
    example: string;
    exampleFrench: string;
  }[];
  formation: {
    affirmative: string;
    negative: string;
    interrogative: string;
  };
  keywords: string[];
};

export const tenses: TenseData[] = [
  {
    slug: "present-simple",
    name: "Present Simple",
    nameFrench: "Présent simple",
    description: "Used for habits, routines, general truths, and permanent situations.",
    descriptionFrench: "Utilisé pour les habitudes, routines, vérités générales et situations permanentes.",
    usage: [
      {
        title: "Habits and routines",
        titleFrench: "Habitudes et routines",
        example: "I drink coffee every morning.",
        exampleFrench: "Je bois du café chaque matin.",
      },
      {
        title: "General truths",
        titleFrench: "Vérités générales",
        example: "The sun rises in the east.",
        exampleFrench: "Le soleil se lève à l'est.",
      },
      {
        title: "Permanent situations",
        titleFrench: "Situations permanentes",
        example: "She works at a hospital.",
        exampleFrench: "Elle travaille dans un hôpital.",
      },
    ],
    formation: {
      affirmative: "Subject + base verb (+ s/es for he/she/it)",
      negative: "Subject + do/does + not + base verb",
      interrogative: "Do/Does + subject + base verb?",
    },
    keywords: ["always", "usually", "often", "sometimes", "never", "every day", "every week"],
  },
  {
    slug: "present-continuous",
    name: "Present Continuous",
    nameFrench: "Présent continu",
    description: "Used for actions happening now, temporary situations, and future arrangements.",
    descriptionFrench: "Utilisé pour les actions en cours, situations temporaires et arrangements futurs.",
    usage: [
      {
        title: "Actions happening now",
        titleFrench: "Actions en cours",
        example: "I am reading a book right now.",
        exampleFrench: "Je lis un livre en ce moment.",
      },
      {
        title: "Temporary situations",
        titleFrench: "Situations temporaires",
        example: "She is staying with her parents this week.",
        exampleFrench: "Elle loge chez ses parents cette semaine.",
      },
      {
        title: "Future arrangements",
        titleFrench: "Arrangements futurs",
        example: "We are meeting tomorrow at 3 PM.",
        exampleFrench: "Nous nous retrouvons demain à 15h.",
      },
    ],
    formation: {
      affirmative: "Subject + am/is/are + verb-ing",
      negative: "Subject + am/is/are + not + verb-ing",
      interrogative: "Am/Is/Are + subject + verb-ing?",
    },
    keywords: ["now", "right now", "at the moment", "currently", "today", "this week"],
  },
  {
    slug: "past-simple",
    name: "Past Simple",
    nameFrench: "Passé simple",
    description: "Used for completed actions in the past at a specific time.",
    descriptionFrench: "Utilisé pour les actions terminées dans le passé à un moment précis.",
    usage: [
      {
        title: "Completed past actions",
        titleFrench: "Actions passées terminées",
        example: "I visited Paris last summer.",
        exampleFrench: "J'ai visité Paris l'été dernier.",
      },
      {
        title: "Series of past actions",
        titleFrench: "Suite d'actions passées",
        example: "She woke up, had breakfast, and left for work.",
        exampleFrench: "Elle s'est réveillée, a pris son petit-déjeuner et est partie au travail.",
      },
      {
        title: "Past habits",
        titleFrench: "Habitudes passées",
        example: "When I was young, I played football every day.",
        exampleFrench: "Quand j'étais jeune, je jouais au football tous les jours.",
      },
    ],
    formation: {
      affirmative: "Subject + past form of verb",
      negative: "Subject + did + not + base verb",
      interrogative: "Did + subject + base verb?",
    },
    keywords: ["yesterday", "last week", "last year", "ago", "in 2020", "when I was young"],
  },
  {
    slug: "past-continuous",
    name: "Past Continuous",
    nameFrench: "Passé continu",
    description: "Used for actions in progress at a specific time in the past.",
    descriptionFrench: "Utilisé pour les actions en cours à un moment précis dans le passé.",
    usage: [
      {
        title: "Action in progress in the past",
        titleFrench: "Action en cours dans le passé",
        example: "I was watching TV at 8 PM yesterday.",
        exampleFrench: "Je regardais la télé à 20h hier.",
      },
      {
        title: "Interrupted action",
        titleFrench: "Action interrompue",
        example: "She was cooking when the phone rang.",
        exampleFrench: "Elle cuisinait quand le téléphone a sonné.",
      },
      {
        title: "Parallel actions",
        titleFrench: "Actions parallèles",
        example: "While I was reading, he was sleeping.",
        exampleFrench: "Pendant que je lisais, il dormait.",
      },
    ],
    formation: {
      affirmative: "Subject + was/were + verb-ing",
      negative: "Subject + was/were + not + verb-ing",
      interrogative: "Was/Were + subject + verb-ing?",
    },
    keywords: ["while", "when", "at that time", "all day yesterday", "at 8 PM"],
  },
  {
    slug: "future-simple",
    name: "Future Simple",
    nameFrench: "Futur simple",
    description: "Used for predictions, spontaneous decisions, and promises.",
    descriptionFrench: "Utilisé pour les prédictions, décisions spontanées et promesses.",
    usage: [
      {
        title: "Predictions",
        titleFrench: "Prédictions",
        example: "It will rain tomorrow.",
        exampleFrench: "Il pleuvra demain.",
      },
      {
        title: "Spontaneous decisions",
        titleFrench: "Décisions spontanées",
        example: "I'll help you with that.",
        exampleFrench: "Je vais t'aider avec ça.",
      },
      {
        title: "Promises",
        titleFrench: "Promesses",
        example: "I will always love you.",
        exampleFrench: "Je t'aimerai toujours.",
      },
    ],
    formation: {
      affirmative: "Subject + will + base verb",
      negative: "Subject + will + not + base verb",
      interrogative: "Will + subject + base verb?",
    },
    keywords: ["tomorrow", "next week", "in the future", "soon", "probably"],
  },
  {
    slug: "future-continuous",
    name: "Future Continuous",
    nameFrench: "Futur continu",
    description: "Used for actions that will be in progress at a specific time in the future.",
    descriptionFrench: "Utilisé pour les actions qui seront en cours à un moment précis dans le futur.",
    usage: [
      {
        title: "Action in progress in the future",
        titleFrench: "Action en cours dans le futur",
        example: "This time tomorrow, I will be flying to London.",
        exampleFrench: "Demain à cette heure, je serai en vol pour Londres.",
      },
      {
        title: "Polite inquiries",
        titleFrench: "Questions polies",
        example: "Will you be using the car tonight?",
        exampleFrench: "Est-ce que tu utiliseras la voiture ce soir ?",
      },
      {
        title: "Parallel future actions",
        titleFrench: "Actions futures parallèles",
        example: "While I will be working, she will be studying.",
        exampleFrench: "Pendant que je travaillerai, elle étudiera.",
      },
    ],
    formation: {
      affirmative: "Subject + will + be + verb-ing",
      negative: "Subject + will + not + be + verb-ing",
      interrogative: "Will + subject + be + verb-ing?",
    },
    keywords: ["this time tomorrow", "at 5 PM tomorrow", "while", "when"],
  },
  {
    slug: "present-perfect",
    name: "Present Perfect",
    nameFrench: "Passé composé",
    description: "Used for past actions with present relevance, experiences, and unfinished time periods.",
    descriptionFrench: "Utilisé pour les actions passées ayant un lien avec le présent, les expériences et les périodes non terminées.",
    usage: [
      {
        title: "Life experiences",
        titleFrench: "Expériences de vie",
        example: "I have visited Japan twice.",
        exampleFrench: "J'ai visité le Japon deux fois.",
      },
      {
        title: "Recent actions with present result",
        titleFrench: "Actions récentes avec résultat présent",
        example: "She has just finished her homework.",
        exampleFrench: "Elle vient de finir ses devoirs.",
      },
      {
        title: "Unfinished time period",
        titleFrench: "Période non terminée",
        example: "I have worked here for five years.",
        exampleFrench: "Je travaille ici depuis cinq ans.",
      },
    ],
    formation: {
      affirmative: "Subject + have/has + past participle",
      negative: "Subject + have/has + not + past participle",
      interrogative: "Have/Has + subject + past participle?",
    },
    keywords: ["just", "already", "yet", "ever", "never", "for", "since", "recently"],
  },
  {
    slug: "present-perfect-continuous",
    name: "Present Perfect Continuous",
    nameFrench: "Passé composé continu",
    description: "Used for actions that started in the past and continue to the present, emphasizing duration.",
    descriptionFrench: "Utilisé pour les actions commencées dans le passé et qui continuent, en insistant sur la durée.",
    usage: [
      {
        title: "Duration of ongoing action",
        titleFrench: "Durée d'une action en cours",
        example: "I have been studying English for three years.",
        exampleFrench: "J'étudie l'anglais depuis trois ans.",
      },
      {
        title: "Recent continuous action with visible result",
        titleFrench: "Action continue récente avec résultat visible",
        example: "She is tired because she has been running.",
        exampleFrench: "Elle est fatiguée parce qu'elle a couru.",
      },
      {
        title: "Repeated actions",
        titleFrench: "Actions répétées",
        example: "They have been calling all morning.",
        exampleFrench: "Ils appellent depuis ce matin.",
      },
    ],
    formation: {
      affirmative: "Subject + have/has + been + verb-ing",
      negative: "Subject + have/has + not + been + verb-ing",
      interrogative: "Have/Has + subject + been + verb-ing?",
    },
    keywords: ["for", "since", "all day", "all morning", "lately", "recently"],
  },
  {
    slug: "past-perfect",
    name: "Past Perfect",
    nameFrench: "Plus-que-parfait",
    description: "Used for actions completed before another past action.",
    descriptionFrench: "Utilisé pour les actions terminées avant une autre action passée.",
    usage: [
      {
        title: "Action before another past action",
        titleFrench: "Action avant une autre action passée",
        example: "When I arrived, the train had already left.",
        exampleFrench: "Quand je suis arrivé, le train était déjà parti.",
      },
      {
        title: "Reported speech",
        titleFrench: "Discours rapporté",
        example: "She said she had seen the movie.",
        exampleFrench: "Elle a dit qu'elle avait vu le film.",
      },
      {
        title: "Third conditional",
        titleFrench: "Conditionnel passé",
        example: "If I had known, I would have helped.",
        exampleFrench: "Si j'avais su, j'aurais aidé.",
      },
    ],
    formation: {
      affirmative: "Subject + had + past participle",
      negative: "Subject + had + not + past participle",
      interrogative: "Had + subject + past participle?",
    },
    keywords: ["before", "after", "when", "by the time", "already", "just", "never"],
  },
  {
    slug: "past-perfect-continuous",
    name: "Past Perfect Continuous",
    nameFrench: "Plus-que-parfait continu",
    description: "Used for actions that were ongoing before another past action, emphasizing duration.",
    descriptionFrench: "Utilisé pour les actions en cours avant une autre action passée, en insistant sur la durée.",
    usage: [
      {
        title: "Duration before a past event",
        titleFrench: "Durée avant un événement passé",
        example: "I had been waiting for two hours when she arrived.",
        exampleFrench: "J'attendais depuis deux heures quand elle est arrivée.",
      },
      {
        title: "Cause of a past situation",
        titleFrench: "Cause d'une situation passée",
        example: "He was tired because he had been working all night.",
        exampleFrench: "Il était fatigué parce qu'il avait travaillé toute la nuit.",
      },
      {
        title: "Reported speech with continuous",
        titleFrench: "Discours rapporté avec continu",
        example: "She said she had been living there for years.",
        exampleFrench: "Elle a dit qu'elle habitait là depuis des années.",
      },
    ],
    formation: {
      affirmative: "Subject + had + been + verb-ing",
      negative: "Subject + had + not + been + verb-ing",
      interrogative: "Had + subject + been + verb-ing?",
    },
    keywords: ["for", "since", "before", "when", "all day", "all week"],
  },
];

export function getTenseBySlug(slug: string): TenseData | undefined {
  return tenses.find((t) => t.slug === slug);
}

export function getTenseNameToSlug(tenseName: string): string {
  return tenseName.toLowerCase().replace(/ /g, "-");
}
