# Extraction Moodle expérimentale

Cette note documente une piste de travail pour poursuivre les expérimentations Learnix en local et en privé, à partir d'un Moodle installé sur un serveur expérimental.

L'objectif n'est pas de connecter Learnix directement à toute la base Moodle. L'objectif est d'extraire un corpus pédagogique maîtrisé, structuré, validé, puis importé dans AnythingLLM.

Documents liés : le suivi du chantier est tenu à jour dans [Avancement — Extraction Moodle vers Learnix](avancement-moodle.md) et la mise en œuvre pas à pas est décrite dans le [playbook technique d'extraction Moodle](extraction-technique-moodle.md).

## Intention

Moodle peut devenir une source documentaire pour Learnix si l'extraction respecte les principes du projet :

- corpus limité ;
- contenus pédagogiques identifiés ;
- métadonnées explicites ;
- absence de données personnelles inutiles ;
- validation humaine avant indexation ;
- traçabilité des documents importés ;
- possibilité de supprimer, corriger ou actualiser une source.

Cette piste relève encore de l'expérimentation locale. Elle ne constitue pas un passage à l'échelle.

## Ce que l'on cherche à extraire

Les contenus utiles pour Learnix sont les contenus pédagogiques consultables et interprétables :

- pages de cours ;
- sections et descriptions de sections ;
- ressources de type fichier ;
- livres Moodle ;
- glossaires ;
- consignes d'activités ;
- URL documentées ;
- ressources HTML ou texte ;
- PDF, DOCX ou supports convertibles ;
- éventuellement forums ou FAQ, seulement après tri, anonymisation et validation.

Les éléments suivants doivent être exclus par défaut :

- comptes utilisateurs ;
- inscriptions ;
- notes ;
- journaux d'activité ;
- traces de connexion ;
- devoirs rendus par les étudiants ;
- messages privés ;
- commentaires personnels ;
- données nominatives ;
- forums non relus ou contenant des données personnelles.

## Architecture de principe

```text
Moodle expérimental
→ extraction contrôlée des contenus pédagogiques autorisés
→ structuration avec métadonnées Moodle
→ nettoyage et conversion des contenus
→ validation humaine du corpus
→ import dans AnythingLLM
→ indexation dans le workspace Learnix
```

Moodle ne devient donc pas la base de Learnix. Moodle devient une source documentaire possible, filtrée et documentée.

## Méthode technique privilégiée

La méthode recommandée consiste à utiliser les web services Moodle plutôt qu'une lecture directe de la base SQL.

Une lecture SQL directe est possible techniquement, mais elle expose trop vite à des données internes, personnelles ou mal contextualisées. Elle oblige aussi à reconstituer la logique Moodle à partir de tables nombreuses, alors que Moodle propose déjà des fonctions de service pour récupérer les cours, catégories, sections, modules et fichiers.

La voie privilégiée :

1. Créer un compte technique Moodle dédié, par exemple `learnix-export`.
2. Activer les web services uniquement sur le Moodle expérimental.
3. Activer le protocole REST.
4. Créer un service externe limité aux fonctions nécessaires.
5. Associer le compte technique à ce service.
6. Générer un token dédié, révocable et limité.
7. Exécuter un script local d'extraction depuis une machine contrôlée.

Fonctions Moodle à étudier en priorité :

- `core_course_get_categories` pour récupérer l'arborescence des catégories ;
- `core_course_get_courses` pour récupérer les cours ;
- `core_course_get_courses_by_field` pour filtrer par catégorie ou par identifiant ;
- `core_course_get_contents` pour récupérer les sections, modules et URL de fichiers ;
- `core_files_get_files` si un parcours plus fin des fichiers est nécessaire.

Le service externe doit exposer uniquement ce qui est nécessaire à l'extraction documentaire. Les fonctions liées aux utilisateurs, notes, inscriptions ou traces doivent rester hors périmètre.

## Métadonnées minimales

Chaque document extrait doit être accompagné d'un bloc de métadonnées. Ces métadonnées permettent de savoir d'où vient le document, dans quel contexte pédagogique il a été produit, et s'il peut être intégré dans Learnix.

Exemple :

```yaml
source: moodle
moodle:
  site: "Moodle expérimental"
  course_id: 42
  course_fullname: "Ingénierie pédagogique"
  course_shortname: "IP-2026"
  category_id: 7
  category_path:
    - "Centrale Lille"
    - "Formation"
    - "Ingénierie pédagogique"
  section_id: 12
  section_name: "Séquence 2 - Objectifs pédagogiques"
  module_id: 248
  module_type: "page"
  module_name: "Formuler un objectif observable"
document:
  title: "Formuler un objectif observable"
  format: "markdown"
  extracted_at: "2026-06-15"
  modified_at: "2026-06-12"
rights:
  status: "à vérifier"
  license: "à vérifier"
  contains_personal_data: false
learnix:
  include: true
  validation_status: "à relire"
  comment: "Contenu pédagogique utile pour les tests locaux."
```

Le champ `category_path` est central. Il doit reconstruire la catégorie et les sous-catégories Moodle, afin de préserver le contexte institutionnel et pédagogique du document.

## Format de sortie recommandé

L'extracteur devrait produire deux types de fichiers :

- des documents exploitables par AnythingLLM ;
- un manifeste décrivant chaque document extrait.

Structure possible :

```text
corpus/moodle-export/
├── manifest.yml
├── categories/
│   └── ingenierie-pedagogique/
│       └── cours-learnix/
│           ├── 001-objectifs-pedagogiques.md
│           ├── 002-alignement-pedagogique.md
│           └── fichiers/
├── rapports/
│   ├── extraction-log.md
│   ├── exclusions.md
│   └── points-a-verifier.md
└── README.md
```

Les fichiers Markdown sont à privilégier quand c'est possible, car ils sont lisibles, versionnables et faciles à relire avant import. Les fichiers PDF ou DOCX peuvent être conservés si leur conversion dégrade trop le contenu, mais ils doivent être accompagnés d'une note de qualité d'extraction.

## Rapport d'exclusion

Le script d'extraction ne doit pas seulement produire ce qui est intégré. Il doit aussi documenter ce qui est exclu.

Le rapport d'exclusion doit indiquer :

- le cours concerné ;
- le module concerné ;
- le type de contenu ;
- la raison de l'exclusion ;
- le niveau de risque éventuel ;
- l'action possible.

Exemples de raisons :

- données personnelles ;
- activité étudiante ;
- forum non relu ;
- fichier non convertible ;
- ressource externe non récupérée ;
- droits non vérifiés ;
- contenu hors périmètre Learnix.

## Validation humaine

Avant tout import dans AnythingLLM, une étape de validation est nécessaire.

À vérifier :

- le contenu est-il utile pour Learnix ?
- le contenu est-il compréhensible hors de Moodle ?
- les métadonnées sont-elles suffisantes ?
- la catégorie et la sous-catégorie sont-elles correctes ?
- le document contient-il des données personnelles ?
- le statut juridique ou pédagogique est-il clair ?
- le document doit-il être importé, corrigé, exclu ou anonymisé ?

Cette étape est essentielle : Learnix ne doit pas devenir un aspirateur à Moodle. Il doit rester un assistant documentaire fondé sur un corpus choisi.

## Livrables attendus pour l'expérimentation

Une première expérimentation locale pourrait produire :

- un script d'extraction Moodle ;
- un fichier de configuration indiquant les catégories ou cours à extraire ;
- un dossier de sortie avec documents Markdown ;
- un manifeste `manifest.yml` ;
- un rapport d'exclusion ;
- une procédure de validation humaine ;
- une procédure d'import dans AnythingLLM ;
- une grille de test spécifique aux contenus Moodle.

## Questions à traiter avant développement

- Quelle version de Moodle est installée sur le serveur expérimental ?
- Quels cours ou catégories sont concernés par le premier test ?
- Le compte technique a-t-il uniquement les droits nécessaires ?
- Les contenus extraits sont-ils publics, internes, ou soumis à autorisation ?
- Faut-il exclure tous les forums dans un premier temps ?
- Quels formats de fichiers sont présents dans les cours ?
- Où stocker temporairement les exports ?
- Qui valide les documents avant import dans AnythingLLM ?
- Comment supprimer un document de Learnix si le contenu source change ?

## Critères de réussite

L'expérimentation peut être considérée comme réussie si :

- une catégorie Moodle complète est extraite avec son chemin hiérarchique ;
- les cours, sections et modules sont correctement identifiés ;
- les documents produits sont lisibles hors Moodle ;
- les données personnelles sont exclues ;
- le manifeste permet de retrouver l'origine de chaque document ;
- l'import dans AnythingLLM fonctionne ;
- Learnix répond à partir des documents extraits ;
- Learnix refuse lorsque les extraits Moodle ne contiennent pas la réponse.

## Références techniques

- Moodle, Using web services : <https://docs.moodle.org/502/en/How_to_create_and_enable_a_web_service>
- Moodle, Web service API functions : <https://docs.moodle.org/dev/Web_service_API_functions>
