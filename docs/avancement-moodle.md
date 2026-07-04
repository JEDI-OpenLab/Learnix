# Avancement : Extraction Moodle vers Learnix

Dernière mise à jour : 16 juin 2026
Statut global : conception terminée ; alimentation du cours test en cours, réalisation technique (web services, script) encore à venir. Chantier transverse de la feuille de route (corpus Moodle), mené en parallèle des phases. Feuille de route affinée après recherche technique.

Cette page est le journal de suivi du chantier qui vise à enrichir Learnix avec des contenus pédagogiques issus de Moodle. Elle complète trois documents :

- la méthode détaillée : [Extraction Moodle expérimentale](moodle-extraction.md) ;
- le playbook technique pas à pas : [Extraction technique Moodle](extraction-technique-moodle.md) ;
- la vision par phases : [Trajectoire institutionnelle](trajectoire.md).

Cette page est tenue à jour au fil de l'avancement. Elle décrit ce qui est fait, ce qui reste à faire, et la prochaine action.

## Cadrage retenu

On n'importe pas la base de données Moodle dans AnythingLLM. On extrait un corpus pédagogique filtré, structuré et validé, puis on importe ce corpus.

Ce choix est conforme aux principes de Learnix :

- la base Moodle contient des données personnelles, des notes, des inscriptions et des traces, qui ne doivent jamais entrer dans Learnix ;
- un accès direct à la base ou un export SQL exposerait trop vite à ces données ;
- la voie retenue est l'extraction sélective via les web services Moodle, avec validation humaine avant indexation.

Moodle devient donc une source documentaire possible, filtrée et documentée, pas la base de Learnix.

## Architecture du flux

L'extraction et la cible vivent aujourd'hui sur deux machines distinctes : le Moodle source sur un poste expérimental, le moteur Learnix sur le serveur principal. Une étape de transfert relie les deux. Cette séparation disparaîtra lorsque les deux services seront réunis sur une seule machine.

```text
Moodle expérimental
→ web services REST (compte technique dédié, token révocable)
→ script d'extraction local
→ documents Markdown + manifeste + rapport d'exclusion
→ validation humaine
→ transfert vers le serveur Learnix
→ import dans AnythingLLM (API ou interface)
→ indexation vectorielle dans le workspace Learnix
→ Learnix répond à partir des contenus Moodle validés
```

## Découverte de recherche importante : couverture des contenus

La recherche technique a confirmé une limite à connaître avant de concevoir le cours test. Les web services Moodle n'exposent pas tous les types d'activité de la même façon.

Pleinement extractibles par web services :

- la structure du cours : catégories, sous-catégories, sections, modules ;
- les pages (activité Page) : le contenu HTML est récupérable ;
- les étiquettes (Label) : le texte est récupérable ;
- les ressources Fichier (PDF, DOCX, etc.) : téléchargeables via le point d'accès fichier authentifié par token ;
- les descriptions et introductions d'activités.

Mal ou pas exposés par les web services standard :

- les livres Moodle : les chapitres ne sont pas renvoyés ;
- les dossiers : la liste des fichiers internes n'est pas renvoyée ;
- les glossaires et wikis : le contenu réel n'est pas renvoyé ;
- H5P et SCORM : surtout des métadonnées.

Conséquence pratique, à appliquer dès maintenant pendant l'alimentation du Moodle : pour le premier test, privilégier des cours construits avec des Pages, des Étiquettes et des ressources Fichier. Éviter de placer le contenu essentiel dans des Livres, Dossiers, Glossaires ou Wikis, dont le contenu ne sortira pas par l'API. Ces types pourront être traités plus tard, soit par un petit plugin local en lecture seule, soit par un export manuel, soit via une sauvegarde de cours.

## État d'avancement

### En place

- Learnix fonctionne : AnythingLLM, workspace, bot Telegram, modèle distant via API, base vectorielle indexée.
- Réglages RAG stables : mode Requête, température 0, Accuracy Optimized, 8 contextes, seuil de similarité ≥ .50, invite stricte et phrase de refus.
- Moodle expérimental opérationnel (Moodle 5.x sous Docker), avec sauvegardes.
- Outillage d'agents installé sur le poste expérimental pour le développement local.
- Méthode d'extraction rédigée dans `moodle-extraction.md` et playbook technique détaillé dans `extraction-technique-moodle.md`.

### En cours

- Alimentation du Moodle expérimental avec des contenus pédagogiques.

### Reste à faire

- Activer les web services Moodle et créer le compte technique dédié.
- Écrire et tester le script d'extraction.
- Produire le corpus, le `manifest.yml` et le rapport d'exclusion.
- Valider humainement les documents.
- Transférer le corpus vers le serveur Learnix et l'importer dans AnythingLLM.
- Exécuter la grille de test spécifique au corpus Moodle.

## Feuille de route

Chaque étape produit un livrable vérifiable avant de passer à la suivante. Le détail technique de chaque étape figure dans `extraction-technique-moodle.md`.

### Étape A : Cadrage et alimentation du cours test, en cours

- Confirmer la version exacte de Moodle installée.
- Construire au moins un cours réel et représentatif, en privilégiant Pages, Étiquettes et ressources Fichier.
- Choisir la catégorie ou le cours du premier test.
- Décider du traitement des forums (exclus par défaut au départ).
- Définir où stocker temporairement les exports.

Livrable : un cours test prêt et une fiche de configuration du premier test.

### Étape B : Activation des web services Moodle, à faire

- Créer un compte technique dédié à l'export.
- Activer les web services et le protocole REST.
- Créer un service externe limité aux seules fonctions nécessaires, avec téléchargement de fichiers autorisé.
- Générer un token dédié et révocable.
- Limiter le périmètre aux fonctions de contenu : `core_course_get_categories`, `core_course_get_courses`, `core_course_get_courses_by_field`, `core_course_get_contents`, `mod_page_get_pages_by_courses`, `mod_resource_get_resources_by_courses`, `mod_label_get_labels_by_courses`, et `core_files_get_files` si besoin.
- Exclure toute fonction touchant aux utilisateurs, notes, inscriptions ou traces.

Livrable : un token fonctionnel, testé par un premier appel de lecture, stocké hors dépôt.

### Étape C : Script d'extraction, à faire

- Lire une configuration listant les catégories ou cours à extraire.
- Parcourir l'arborescence catégories, cours, sections, modules.
- Récupérer le contenu des pages et étiquettes, télécharger les fichiers ressources via le point d'accès authentifié.
- Convertir les contenus retenus en Markdown lisible hors Moodle.
- Générer le `manifest.yml` avec, pour chaque document, ses métadonnées et le `category_path`.
- Produire le rapport d'exclusion.
- Exclure par défaut comptes, notes, journaux, rendus étudiants, données nominatives et forums non relus.

Livrable : le dossier `corpus/moodle-export/` avec documents, manifeste et rapports.

### Étape D : Validation humaine, à faire

- Relire les documents : utiles, compréhensibles hors Moodle, métadonnées suffisantes.
- Vérifier l'absence de données personnelles.
- Contrôler catégories et sous-catégories.
- Décider, document par document : importer, corriger, exclure ou anonymiser.

Livrable : un corpus validé, marqué bon pour import.

### Étape E : Transfert et import dans AnythingLLM, à faire

- Transférer le corpus validé vers le serveur Learnix.
- Importer les documents dans AnythingLLM, soit par l'interface, soit par l'API développeur, en les rattachant au workspace Learnix.
- Lancer l'indexation et vérifier l'augmentation du nombre de vecteurs.
- Contrôler la qualité des extraits récupérés.

Livrable : des documents Moodle indexés dans le workspace Learnix.

### Étape F : Recette et tests, à faire

- Exécuter une grille de test spécifique aux contenus Moodle.
- Vérifier que Learnix répond à partir des documents extraits.
- Vérifier qu'il refuse, avec la phrase exacte, lorsque les extraits ne contiennent pas la réponse.
- Consigner les écarts et ajuster si nécessaire.

Livrable : un compte rendu de recette confirmant les critères de réussite de `moodle-extraction.md`.

## Prochaine action

Pendant l'alimentation du Moodle, construire le cours test avec des types d'activité pleinement extractibles (Pages, Étiquettes, Fichiers). Dès qu'un cours test est prêt, passer à l'étape B : activer les web services et générer le token, premier vrai geste technique du chantier.

## Mise à jour de cette page

Cette page est la source de vérité du suivi. Le travail de mise en œuvre et la rédaction de cette documentation se font dans l'environnement de travail du projet ; la publication sur le site se fait ensuite via le dépôt. Aucune donnée sensible (adresses internes, identifiants, jetons, clés API) ne doit figurer ici, car le dépôt est public.
