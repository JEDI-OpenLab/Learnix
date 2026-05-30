# Learnix

**Assistant documentaire et démonstrateur pédagogique pour explorer les usages raisonnés de l'IA générative dans l'enseignement supérieur.**

Learnix est une preuve de concept personnelle : un assistant documentaire spécialisé en ingénierie pédagogique, construit avec AnythingLLM, une base documentaire maîtrisée et le modèle `mistral-small-4-119b` interrogé via API distante.

Le chatbot n'est pas mis à disposition du public. Le dépôt sert à documenter la démarche : choix techniques, constitution du corpus, paramétrage RAG, tests de fiabilité, limites et scénarios de passage à l'échelle.

## Objectif

Learnix cherche à montrer qu'un assistant IA pédagogique peut être conçu comme un objet documenté, limité et discutable :

- il répond à partir d'un corpus choisi ;
- il refuse les questions hors corpus ;
- il explicite ses limites ;
- il s'appuie sur une démarche d'ingénierie pédagogique ADDIE ;
- il sert de support de médiation sur les usages de l'IA générative ;
- il ouvre une discussion sur les conditions d'un futur pilote institutionnel.

## Statut

Le démonstrateur existe et fonctionne en usage personnel :

- AnythingLLM est installé sur un serveur local ;
- un workspace Learnix contient des documents pédagogiques sélectionnés ;
- l'assistant utilise le modèle `mistral-small-4-119b` via API distante ;
- une interface web AnythingLLM et un bot Telegram privé permettent de l'interroger ;
- les réglages cherchent à limiter les réponses hors corpus.

Ce dépôt présente la démarche sans publier le chatbot, les clés, les données d'installation personnelles ou les documents non diffusables.

## Webapp

La webapp statique se trouve dans `index.html`.

Elle peut être ouverte directement dans un navigateur ou publiée via GitHub Pages.

```text
learnix/
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── img/
├── docs/
├── fiches/
├── corpus/
├── README.md
└── LICENSE.md
```

## Documentation

- [Démarche](docs/demarche.md)
- [Architecture](docs/architecture.md)
- [Installation](docs/installation.md) : choix d'AnythingLLM, clé API, workspace, corpus et bot Telegram privé.
- [Corpus documentaire](docs/corpus.md)
- [Paramétrage RAG](docs/parametrage.md) : mode `Requête`, invite exacte, refus, température `0`, base vectorielle.
- [Telegram](docs/telegram.md) : rôle du bot privé, configuration et limites.
- [Tests et évaluation](docs/tests.md)
- [Points de vigilance](docs/vigilance.md) : limites des IA grand public, corpus maîtrisé, impact et passage à l'échelle.
- [Trajectoire institutionnelle](docs/trajectoire.md)

## Fiches réutilisables

- [Scénarios de démonstration](fiches/scenarios-demo.md)
- [Grille de test des réponses](fiches/grille-tests.md)
- [Note d'intention](fiches/note-intention.md)
- [Modèle de manifeste de corpus](fiches/corpus-manifest.example.yml)

## Licence

Learnix est une ressource éducative libre (REL) au sens de la Recommandation UNESCO de 2019. Sauf mention contraire, les contenus originaux sont placés sous [Creative Commons Attribution 4.0 International — CC BY 4.0](LICENSE.md).

Les contenus tiers, logiciels, services, corpus importés et ressources citées conservent leurs droits et licences propres.
