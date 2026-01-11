import Link from "next/link";

export default function ConditionsPage() {
  return (
    <div className="mx-auto max-w-4xl p-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Conditions d&apos;utilisation
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Dernière mise à jour : Janvier 2025
        </p>
      </header>

      <div className="prose prose-zinc max-w-none dark:prose-invert">
        <div className="space-y-8 text-zinc-600 dark:text-zinc-400">
          {/* Article 1 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Article 1 - Objet
            </h2>
            <p className="mt-3">
              Les présentes conditions générales d&apos;utilisation (CGU) ont
              pour objet de définir les modalités et conditions d&apos;accès et
              d&apos;utilisation de l&apos;application web &quot;English
              Verbs&quot;, accessible à l&apos;adresse de ce site.
            </p>
            <p className="mt-2">
              L&apos;utilisation de l&apos;application implique
              l&apos;acceptation pleine et entière des présentes CGU. Si vous
              n&apos;acceptez pas ces conditions, vous êtes invité à ne pas
              utiliser l&apos;application.
            </p>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Article 2 - Description du service
            </h2>
            <p className="mt-3">
              English Verbs est une application web gratuite d&apos;aide à
              l&apos;apprentissage des verbes anglais. Elle propose :
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>
                Une liste de 230 verbes anglais avec leurs formes conjuguées
              </li>
              <li>Les traductions en français</li>
              <li>Les conjugaisons à différents temps</li>
              <li>Des exemples de phrases</li>
              <li>Une fonctionnalité de synthèse vocale</li>
              <li>Un système de favoris personnalisable</li>
            </ul>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Article 3 - Accès au service
            </h2>
            <p className="mt-3">
              L&apos;application est accessible gratuitement depuis tout
              appareil disposant d&apos;une connexion internet et d&apos;un
              navigateur web compatible.
            </p>
            <p className="mt-2">
              L&apos;éditeur se réserve le droit de suspendre, interrompre ou
              limiter l&apos;accès à tout ou partie de l&apos;application, sans
              préavis, notamment pour des raisons de maintenance ou de mise à
              jour.
            </p>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Article 4 - Propriété intellectuelle
            </h2>
            <p className="mt-3">
              L&apos;ensemble des éléments composant l&apos;application
              (structure, design, code source, textes, images, logos) est
              protégé par les lois relatives à la propriété intellectuelle.
            </p>
            <p className="mt-2">
              Toute reproduction, représentation, modification ou exploitation
              non autorisée de tout ou partie de l&apos;application est
              strictement interdite et peut donner lieu à des poursuites.
            </p>
            <p className="mt-2">
              Les contenus pédagogiques (verbes, traductions, exemples) sont
              fournis à titre informatif et éducatif. Ils peuvent être utilisés
              dans un cadre personnel d&apos;apprentissage.
            </p>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Article 5 - Données personnelles et cookies
            </h2>
            <p className="mt-3">
              L&apos;application ne collecte aucune donnée personnelle
              identifiable. Aucun compte utilisateur n&apos;est requis.
            </p>
            <p className="mt-2">
              Les données de préférences (favoris, thème, voix) sont stockées
              uniquement dans le navigateur de l&apos;utilisateur (localStorage)
              et ne sont jamais transmises à des serveurs externes.
            </p>
            <p className="mt-2">
              Des cookies peuvent être utilisés pour améliorer
              l&apos;expérience utilisateur et à des fins statistiques. Vous
              pouvez gérer vos préférences de cookies via le lien{" "}
              <Link
                href="#cookies"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Gérer les cookies
              </Link>
              .
            </p>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Article 6 - Limitation de responsabilité
            </h2>
            <p className="mt-3">
              L&apos;application est fournie &quot;en l&apos;état&quot;, sans
              garantie d&apos;aucune sorte. L&apos;éditeur ne garantit pas :
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>
                L&apos;exactitude, la complétude ou l&apos;actualité des
                informations fournies
              </li>
              <li>
                Le fonctionnement ininterrompu et sans erreur de
                l&apos;application
              </li>
              <li>L&apos;absence de virus ou d&apos;éléments nuisibles</li>
              <li>La compatibilité avec tous les appareils et navigateurs</li>
            </ul>
            <p className="mt-2">
              L&apos;éditeur ne saurait être tenu responsable des dommages
              directs ou indirects résultant de l&apos;utilisation ou de
              l&apos;impossibilité d&apos;utiliser l&apos;application.
            </p>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Article 7 - Utilisation acceptable
            </h2>
            <p className="mt-3">L&apos;utilisateur s&apos;engage à :</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>
                Utiliser l&apos;application conformément à sa destination
                (apprentissage des verbes anglais)
              </li>
              <li>
                Ne pas tenter de contourner les mesures de sécurité ou
                d&apos;accéder à des parties non autorisées de
                l&apos;application
              </li>
              <li>
                Ne pas utiliser l&apos;application à des fins commerciales sans
                autorisation
              </li>
              <li>
                Ne pas surcharger intentionnellement les serveurs ou perturber
                le fonctionnement du service
              </li>
            </ul>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Article 8 - Synthèse vocale
            </h2>
            <p className="mt-3">
              La fonctionnalité de synthèse vocale utilise les capacités natives
              du navigateur web (Web Speech API). La qualité et la disponibilité
              de cette fonctionnalité dépendent du navigateur et du système
              d&apos;exploitation utilisés.
            </p>
            <p className="mt-2">
              L&apos;éditeur ne garantit pas la disponibilité de voix en anglais
              sur tous les appareils.
            </p>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Article 9 - Modifications des CGU
            </h2>
            <p className="mt-3">
              L&apos;éditeur se réserve le droit de modifier les présentes CGU à
              tout moment. Les modifications entrent en vigueur dès leur
              publication sur l&apos;application.
            </p>
            <p className="mt-2">
              L&apos;utilisation continue de l&apos;application après la
              publication des modifications vaut acceptation des nouvelles CGU.
            </p>
          </section>

          {/* Article 10 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Article 10 - Droit applicable
            </h2>
            <p className="mt-3">
              Les présentes CGU sont régies par le droit français. Tout litige
              relatif à l&apos;interprétation ou à l&apos;exécution des
              présentes sera soumis aux tribunaux compétents.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Contact
            </h2>
            <p className="mt-3">
              Pour toute question concernant ces conditions d&apos;utilisation
              ou l&apos;application en général, vous pouvez nous contacter via
              les canaux officiels indiqués sur le site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
