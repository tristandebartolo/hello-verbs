import Link from "next/link";

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-4xl p-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Guide d&apos;utilisation
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Découvrez toutes les fonctionnalités pour apprendre efficacement les
          verbes anglais.
        </p>
      </header>

      <div className="space-y-12">
        {/* Section 1: Liste des verbes */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
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
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Liste des verbes
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
            <p>
              L&apos;application contient <strong>230 verbes anglais</strong>{" "}
              essentiels, dont 119 verbes irréguliers et 111 verbes réguliers.
              Chaque verbe est présenté avec :
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>L&apos;infinitif (base verbale)</li>
              <li>Le prétérit (past simple)</li>
              <li>Le participe passé (past participle)</li>
              <li>La traduction française</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Recherche et filtres */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Recherche et filtres
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
            <p>
              Trouvez rapidement le verbe que vous cherchez grâce aux outils de
              recherche et de filtrage :
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <strong>Recherche</strong> : Tapez un mot en anglais ou en
                français pour filtrer instantanément la liste
              </li>
              <li>
                <strong>Filtres</strong> : Affichez tous les verbes, uniquement
                les irréguliers, les réguliers ou vos favoris
              </li>
              <li>
                <strong>Tri</strong> : Classez les verbes par ordre par défaut,
                alphabétique anglais ou alphabétique français
              </li>
              <li>
                <strong>Groupement</strong> : Regroupez les verbes par lettre
                initiale pour une navigation plus facile
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Favoris et Kanban */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
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
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Favoris et organisation
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
            <p>
              Créez votre propre liste de verbes à réviser en les ajoutant à vos
              favoris. Cliquez sur l&apos;étoile pour ajouter ou retirer un
              verbe.
            </p>
            <p>
              La page{" "}
              <Link
                href="/favoris"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Favoris
              </Link>{" "}
              vous permet d&apos;organiser votre apprentissage avec un tableau
              Kanban. Glissez-déposez vos verbes dans les colonnes :
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Tous les favoris
                </span>{" "}
                : Verbes non classés
              </li>
              <li>
                <span className="font-medium text-amber-600 dark:text-amber-400">
                  En cours
                </span>{" "}
                : Verbes que vous êtes en train d&apos;apprendre
              </li>
              <li>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Prochain
                </span>{" "}
                : Verbes à apprendre prochainement
              </li>
              <li>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  Validés
                </span>{" "}
                : Verbes maîtrisés
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Conjugaisons */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Conjugaisons complètes
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
            <p>
              Cliquez sur un verbe pour accéder à sa fiche détaillée. Vous y
              trouverez les conjugaisons pour 10 temps différents :
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <ul className="ml-6 list-disc space-y-1">
                <li>Present Simple</li>
                <li>Present Continuous</li>
                <li>Past Simple</li>
                <li>Past Continuous</li>
                <li>Present Perfect</li>
              </ul>
              <ul className="ml-6 list-disc space-y-1">
                <li>Present Perfect Continuous</li>
                <li>Past Perfect</li>
                <li>Past Perfect Continuous</li>
                <li>Future Simple</li>
                <li>Future Continuous</li>
              </ul>
            </div>
            <p>
              Chaque temps est accompagné d&apos;exemples de phrases pour mieux
              comprendre son utilisation en contexte.
            </p>
          </div>
        </section>

        {/* Section 5: Prononciation */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
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
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Prononciation audio
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
            <p>
              Écoutez la prononciation des verbes et des phrases d&apos;exemple
              grâce à la synthèse vocale intégrée. Cliquez sur le bouton son à
              côté de chaque élément.
            </p>
            <p>
              Vous pouvez choisir entre une{" "}
              <strong>voix féminine ou masculine</strong> dans les paramètres de
              la barre latérale. Votre préférence est automatiquement
              sauvegardée.
            </p>
          </div>
        </section>

        {/* Section 6: Mode sombre */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
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
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Mode sombre
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
            <p>
              Basculez entre le mode clair et le mode sombre selon vos
              préférences. Le bouton se trouve dans la barre latérale ou dans la
              barre de navigation sur mobile.
            </p>
            <p>
              L&apos;application détecte automatiquement les préférences de
              votre système au premier chargement.
            </p>
          </div>
        </section>

        {/* Section 7: PWA */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
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
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Application installable
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
            <p>
              English Verbs est une Progressive Web App (PWA). Vous pouvez
              l&apos;installer sur votre appareil pour y accéder rapidement
              depuis votre écran d&apos;accueil :
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>
                <strong>Sur mobile</strong> : Utilisez l&apos;option
                &quot;Ajouter à l&apos;écran d&apos;accueil&quot; dans le menu
                de votre navigateur
              </li>
              <li>
                <strong>Sur ordinateur</strong> : Cliquez sur l&apos;icône
                d&apos;installation dans la barre d&apos;adresse (Chrome)
              </li>
            </ul>
          </div>
        </section>

        {/* Section 8: Sauvegarde */}
        <section>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
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
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Sauvegarde automatique
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
            <p>
              Toutes vos préférences sont automatiquement sauvegardées dans
              votre navigateur :
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Vos favoris et leur organisation</li>
              <li>Vos filtres et options de tri</li>
              <li>Votre choix de thème (clair/sombre)</li>
              <li>Votre préférence de voix</li>
            </ul>
            <p className="text-sm italic">
              Note : Ces données sont stockées localement et ne sont pas
              synchronisées entre différents appareils.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
