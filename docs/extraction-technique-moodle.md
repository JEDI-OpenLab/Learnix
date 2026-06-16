# Extraction technique Moodle vers Learnix

Playbook technique pas à pas pour extraire un corpus pédagogique depuis Moodle et l'importer dans AnythingLLM. Il complète la note de méthode `moodle-extraction.md` et le suivi `avancement-moodle.md`.

Ce document est volontairement assaini : il n'indique aucune adresse réelle, aucun identifiant, aucun jeton ni clé. Les exemples utilisent des marqueurs comme `https://MON-MOODLE`, `TOKEN`, `https://MON-ANYTHINGLLM` et `CLE_API`. Les valeurs réelles restent hors dépôt.

Références : documentation web services Moodle 5.x et documentation API AnythingLLM, citées en fin de page.

## 1. Vue d'ensemble du flux

L'extraction suit six étapes, qui correspondent à la feuille de route du suivi :

1. Activer les web services Moodle et obtenir un token limité.
2. Lire la structure du cours et le contenu des activités via REST.
3. Télécharger les fichiers ressources via le point d'accès authentifié.
4. Convertir en Markdown et produire un manifeste et un rapport d'exclusion.
5. Valider humainement.
6. Importer dans AnythingLLM et indexer dans le workspace Learnix.

## 2. Activer les web services Moodle

Procédure d'administration, à faire une seule fois sur le Moodle expérimental.

1. Activer la fonctionnalité : Administration du site, Fonctionnalités avancées, cocher Activer les services web.
2. Activer le protocole REST : Administration du site, Serveur, Services web, Gérer les protocoles, activer REST.
3. Créer un compte technique dédié, par exemple `learnix-export`, sans privilège d'administration.
4. Créer un rôle dédié à l'export web service avec les capacités minimales, puis l'attribuer au compte technique. Capacités utiles :
   - `webservice/rest:use` pour utiliser le protocole REST ;
   - les capacités requises par chaque fonction ajoutée au service, indiquées par Moodle au moment de l'ajout ;
   - la capacité de voir les cours visés, sans capacité touchant aux notes, inscriptions ou comptes.
5. Créer un service externe personnalisé : Administration du site, Serveur, Services web, Services externes, Ajouter. Cocher Activé et Utilisateurs autorisés uniquement.
6. Activer le téléchargement de fichiers sur ce service : bouton Avancé du service, autoriser le téléchargement de fichiers. Indispensable pour récupérer les PDF et DOCX.
7. Ajouter au service uniquement les fonctions nécessaires (section suivante).
8. Autoriser le compte technique comme utilisateur du service. Optionnel mais recommandé : restreindre par adresse IP et fixer une date d'expiration.
9. Générer le token : Administration du site, Serveur, Services web, Gérer les jetons, Ajouter, sélectionner le compte technique et le service. Conserver le token hors dépôt.

Principe de sécurité : un token dédié, révocable, limité à un service minimal, distinct de tout usage administrateur. Le token ne doit jamais être publié ni committé.

## 3. Fonctions REST à utiliser

Toutes les requêtes REST suivent le même format. Exemple d'appel générique renvoyant du JSON :

```bash
curl "https://MON-MOODLE/webservice/rest/server.php" \
  --data-urlencode "wstoken=TOKEN" \
  --data-urlencode "moodlewsrestformat=json" \
  --data-urlencode "wsfunction=core_course_get_categories"
```

Fonctions retenues et rôle de chacune :

- `core_course_get_categories` : arborescence des catégories et sous-catégories. Sert à reconstruire le `category_path`.
- `core_course_get_courses` : liste des cours, avec identifiants, noms court et long, résumé.
- `core_course_get_courses_by_field` : filtrer les cours par catégorie ou par identifiant, utile pour cibler un cours précis.
- `core_course_get_contents` : pour un cours donné, renvoie les sections, les modules de chaque section, et pour les ressources la liste des fichiers avec leur URL de téléchargement dans l'attribut `contents`.
- `mod_page_get_pages_by_courses` : contenu des activités Page, c'est-à-dire le HTML pédagogique rédigé dans Moodle.
- `mod_resource_get_resources_by_courses` : métadonnées des ressources Fichier, en complément des URL de fichiers fournies par `core_course_get_contents`.
- `mod_label_get_labels_by_courses` : texte des étiquettes affichées dans les sections.
- `core_files_get_files` : parcours fin d'une zone de fichiers, seulement si nécessaire.

Limite de couverture confirmée par la recherche : les livres, dossiers, glossaires et wikis n'exposent pas leur contenu réel par ces fonctions standard. Pour le premier corpus, construire le cours test avec des Pages, des Étiquettes et des ressources Fichier. Les autres types seront traités plus tard, par un plugin local en lecture seule, un export manuel, ou une sauvegarde de cours analysée hors ligne.

## 4. Logique de parcours du script

Le script d'extraction enchaîne les appels dans cet ordre :

1. Appeler `core_course_get_categories` et mémoriser, pour chaque catégorie, son identifiant et son chemin hiérarchique complet.
2. Sélectionner les cours visés avec `core_course_get_courses_by_field`, selon la configuration d'extraction.
3. Pour chaque cours, appeler `core_course_get_contents` pour obtenir sections et modules.
4. Selon le type de module : pour une Page, récupérer le contenu via `mod_page_get_pages_by_courses` ; pour une Étiquette, via `mod_label_get_labels_by_courses` ; pour une ressource Fichier, télécharger les fichiers listés dans `contents`.
5. Convertir chaque contenu HTML en Markdown propre, et écrire un fichier par activité.
6. Pour chaque fichier produit, écrire le bloc de métadonnées et l'ajouter au manifeste.
7. Pour chaque élément écarté, écrire une ligne dans le rapport d'exclusion.

Le script reste local, en lecture seule sur Moodle. Il ne crée, ne modifie ni ne supprime rien côté Moodle.

## 5. Télécharger les fichiers ressources

Les URL de fichiers renvoyées par `core_course_get_contents` pointent vers le point d'accès fichier. Pour les récupérer sans session de navigateur, utiliser le point d'accès authentifié par token.

Deux règles à respecter :

- le service doit autoriser le téléchargement de fichiers, activé à l'étape 2 ;
- le paramètre d'authentification s'appelle `token` dans l'URL de fichier, à ne pas confondre avec `wstoken` des appels de fonction.

Exemple de téléchargement :

```bash
curl "https://MON-MOODLE/webservice/pluginfile.php/CONTEXTID/mod_resource/content/0/fichier.pdf?token=TOKEN" \
  --output fichier.pdf
```

Pour les contenus lourds, préférer ce point d'accès fichier plutôt que `core_files_get_files`, car ce dernier encode les fichiers en base64 et consomme beaucoup de mémoire.

## 6. Format de sortie et métadonnées

Le script produit deux familles de sorties : des documents lisibles et un manifeste.

Structure de dossier recommandée :

```text
corpus/moodle-export/
├── manifest.yml
├── categories/
│   └── ingenierie-pedagogique/
│       └── cours-test/
│           ├── 001-objectifs-pedagogiques.md
│           ├── 002-alignement-pedagogique.md
│           └── fichiers/
├── rapports/
│   ├── extraction-log.md
│   ├── exclusions.md
│   └── points-a-verifier.md
└── README.md
```

Chaque document Markdown commence par un bloc de métadonnées reprenant le modèle de `moodle-extraction.md` : source, identifiants de cours et de catégorie, `category_path`, section, module, type, titre, dates, droits, présence de données personnelles, statut de validation. Le champ `category_path` est central : il reconstruit le contexte institutionnel et pédagogique du document.

Les fichiers Markdown sont à privilégier car ils sont lisibles, versionnables et faciles à relire. Les PDF et DOCX sont conservés tels quels quand la conversion dégraderait trop le contenu, accompagnés d'une note de qualité d'extraction.

## 7. Importer dans AnythingLLM

L'import se fait après validation humaine, sur le serveur Learnix. Deux voies possibles.

Voie interface : glisser les documents validés dans le workspace Learnix, puis lancer l'enregistrement et l'indexation. Simple et visuelle, adaptée à de petits volumes.

Voie API développeur : utile pour automatiser un volume plus important. L'API vit sous le préfixe `/api`, s'authentifie avec une clé API en en-tête `Authorization: Bearer CLE_API`, et la documentation interactive est exposée par l'instance sur `/api/docs`. Endpoints utiles :

- `POST /v1/document/upload` : envoyer un fichier en `multipart/form-data`. Le champ `addToWorkspaces` accepte une liste de workspaces séparés par des virgules pour rattacher et indexer automatiquement. Un champ `metadata` accepte titre, auteur, description et source.
- `POST /v1/document/upload/{dossier}` : même chose en rangeant le document dans un dossier nommé, pratique pour isoler le corpus Moodle.
- `POST /v1/document/raw-text` : créer un document directement à partir d'un texte, idéal pour pousser un contenu Markdown extrait d'une Page. Le titre dans `metadata` est obligatoire.
- `GET /v1/documents` : lister les documents et vérifier l'arborescence.

Exemple d'envoi d'un fichier avec rattachement au workspace :

```bash
curl -X POST "https://MON-ANYTHINGLLM/api/v1/document/upload" \
  -H "Authorization: Bearer CLE_API" \
  -F "file=@001-objectifs-pedagogiques.md" \
  -F "addToWorkspaces=learnix"
```

Point de vigilance relevé par la recherche : selon les versions, un document envoyé par l'API peut être indexé sans être rattaché au workspace. Après import, vérifier que les documents apparaissent bien dans le workspace Learnix, et au besoin déclencher le rattachement et l'indexation depuis l'interface.

## 8. Vérification et recette

Après import, contrôler :

- l'augmentation du nombre de vecteurs de la base par rapport à l'état précédent ;
- la présence des documents Moodle dans le workspace Learnix ;
- la qualité des extraits récupérés à la lecture ;
- que Learnix répond à partir des documents extraits ;
- que Learnix refuse, avec la phrase de refus exacte, lorsque les extraits ne contiennent pas la réponse.

Ces contrôles correspondent aux critères de réussite de `moodle-extraction.md`.

## 9. Rappels de sécurité

- Le token Moodle et la clé API AnythingLLM restent hors dépôt, hors navigateur et hors message partagé.
- Le compte technique Moodle n'a que les capacités strictement nécessaires, sans accès aux notes, inscriptions, comptes ni traces.
- Le script est en lecture seule sur Moodle.
- La validation humaine reste obligatoire avant tout import.
- Aucune donnée personnelle d'étudiant ne doit entrer dans Learnix.

## Références

- Moodle, Using web services : https://docs.moodle.org/502/en/Using_web_services
- Moodle, External services et fonctions web service (développeur) : https://moodledev.io/docs/5.0/apis/subsystems/external
- Moodle, File handling, points d'accès upload et pluginfile : https://moodledev.io/docs/5.0/apis/subsystems/external/files
- AnythingLLM, API développeur et endpoints document : documentation interactive exposée par l'instance sur `/api/docs`.
