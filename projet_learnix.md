

# Learnix — Spécification des besoins

## 1. Présentation générale

**Learnix** est un projet de démonstrateur pédagogique consacré aux usages raisonnés de l’intelligence artificielle générative dans l’enseignement supérieur.

Le projet vise à construire un assistant documentaire spécialisé en ingénierie pédagogique, fondé sur un corpus maîtrisé et interrogeable via des interfaces simples. Learnix s’appuie principalement sur **AnythingLLM**, sur l’usage d’une **API** et sur une interface conversationnelle accessible, notamment via **Telegram**.

Learnix n’a pas vocation à être un chatbot généraliste. Il est pensé comme un assistant situé, limité et documenté, capable d’accompagner les enseignants, ingénieurs pédagogiques ou acteurs de la formation dans l’exploration de questions liées à la pédagogie, à l’innovation pédagogique, à l’évaluation, à la scénarisation des enseignements et aux usages de l’IA.

Le projet doit également servir de support à une réflexion plus large sur l’intégration de l’IA dans les enseignements : non pas comme une solution magique ou un effet de mode, mais comme un objet d’ingénierie pédagogique à analyser, concevoir, tester, accompagner et évaluer.

## 2. Contexte du projet

Les usages de l’intelligence artificielle générative se développent rapidement dans l’enseignement supérieur. Ils concernent à la fois les étudiants, les enseignants, les équipes pédagogiques, les ingénieurs pédagogiques et les établissements.

Ces usages soulèvent plusieurs questions :

- comment accompagner les enseignants dans la compréhension de ces outils ?
- comment éviter de réduire l’IA à la seule question de la triche ?
- comment concevoir des usages pédagogiques pertinents, explicites et évaluables ?
- comment garantir un cadre clair pour les étudiants et les enseignants ?
- comment articuler innovation pédagogique, transformation des pratiques et contraintes institutionnelles ?
- comment développer des outils utiles sans perdre la maîtrise des corpus, des données et des finalités pédagogiques ?

Dans ce contexte, Learnix doit permettre de passer d’un discours général sur l’IA à un objet concret, démontrable et discutable.


Le projet s’inscrit dans une démarche d’ingénierie pédagogique : partir des besoins réels, formuler des hypothèses d’usage, construire un prototype, documenter les choix, tester les limites et améliorer progressivement le dispositif.

### 2.1. Positionnement face aux réponses technologiques de surveillance

Learnix ne s’inscrit pas dans une logique de surveillance, de détection automatisée ou d’armement technologique face aux usages de l’IA par les étudiants.

Le projet part d’un autre diagnostic : les usages de l’IA générative ne peuvent pas être traités uniquement par des dispositifs techniques de contrôle. Les questions de surveillance des examens, de détection, de brouillage ou d’interdiction relèvent de cadres juridiques, éthiques, sanitaires, techniques et institutionnels spécifiques. Elles supposent notamment de prendre en compte la protection des données, le rôle du DPO, les obligations liées au RGPD, les risques d’interférence avec certains dispositifs médicaux ou d’assistance, ainsi que l’obsolescence rapide des technologies de contrôle.

Learnix ne vise donc pas à résoudre la question de la fraude par la technologie. Il vise à déplacer la réflexion vers les pratiques pédagogiques : comment concevoir des situations d’apprentissage et d’évaluation dans un contexte où les étudiants disposent déjà d’outils capables de produire rapidement des réponses élaborées ?

La question centrale que le projet souhaite contribuer à travailler est la suivante :

> Quelles compétences restent réellement observables dans un monde où une IA peut produire instantanément une réponse vraisemblablement experte ?

Ce positionnement conduit à privilégier une réponse pédagogique, collective et progressive : clarifier les règles, accompagner les enseignants, expliciter les usages autorisés ou interdits, repenser certaines modalités d’évaluation, documenter les expérimentations et construire une culture commune de l’IA dans l’enseignement supérieur.

## 3. Finalité du projet

La finalité de Learnix est double :

1. **Créer un assistant documentaire spécialisé en ingénierie pédagogique**, capable de répondre à partir d’un corpus sélectionné et de refuser de répondre lorsque les documents ne permettent pas de produire une réponse fiable.

2. **Produire une ressource ouverte de réflexion et d’expérimentation sur les usages pédagogiques de l’IA**, réutilisable par des enseignants, ingénieurs pédagogiques, établissements ou partenaires souhaitant explorer ces questions.

Learnix doit donc être à la fois :

- un démonstrateur technique ;
- un support de médiation ;
- un objet de discussion ;
- une ressource ouverte ;
- un exemple de démarche d’intégration pédagogique de l’IA.

## 4. Objectifs principaux

### 4.1. Objectifs pédagogiques

Learnix doit permettre de :

- accompagner la compréhension des enjeux pédagogiques de l’IA générative ;
- aider à formaliser des scénarios d’usage de l’IA dans l’enseignement ;
- soutenir la conception pédagogique à partir de ressources fiables ;
- encourager des usages critiques, sobres et contextualisés de l’IA ;
- rendre visibles les limites d’un assistant IA ;
- montrer l’intérêt d’un assistant documentaire par rapport à un chatbot généraliste ;
- favoriser une approche réflexive de l’innovation pédagogique.

### 4.2. Objectifs techniques

Learnix doit permettre de :

- constituer un corpus documentaire exploitable dans AnythingLLM ;
- configurer un assistant respectant des règles strictes de réponse ;
- interroger ce corpus via une interface web ;
- connecter l’assistant à Telegram ;
- exploiter l’API d’AnythingLLM pour expérimenter d’autres formes d’accès ;
- documenter l’architecture du dispositif ;
- faciliter la reproductibilité du projet.

### 4.3. Objectifs institutionnels et de médiation

Learnix doit permettre de :

- disposer d’un support concret pour présenter les enjeux de l’IA en pédagogie ;
- ouvrir une discussion avec des collègues, partenaires ou établissements ;
- proposer un exemple transférable dans d’autres contextes ;
- contribuer à la réflexion sur les cadres d’usage de l’IA ;
- soutenir une culture commune autour de l’IA, de l’évaluation et de l’innovation pédagogique.

## 5. Publics cibles

Learnix s’adresse prioritairement à :

- des enseignants de l’enseignement supérieur ;
- des ingénieurs pédagogiques ;
- des responsables de formation ;
- des équipes d’appui à la pédagogie ;
- des collègues souhaitant découvrir les usages pédagogiques de l’IA ;
- des partenaires institutionnels ou internationaux souhaitant explorer ces questions.

Dans un second temps, certains usages pourraient être adaptés à des étudiants, mais le premier périmètre du projet concerne l’accompagnement des enseignants et des acteurs de la formation.

## 6. Périmètre fonctionnel

### 6.1. Fonctionnalités attendues

Learnix doit pouvoir :

- répondre à des questions portant sur l’ingénierie pédagogique ;
- répondre à partir d’un corpus documentaire défini ;
- indiquer lorsqu’une information n’est pas présente dans le corpus ;
- citer ou mentionner les documents utilisés lorsque cela est possible ;
- produire des réponses concises, lisibles et structurées ;
- fonctionner via l’interface d’AnythingLLM ;
- fonctionner via Telegram ;
- être interrogeable via l’API ;
- servir de démonstrateur lors d’une présentation ou d’un atelier ;
- permettre la comparaison entre différents types de questions : question pertinente, question ambiguë, question hors corpus.

### 6.2. Fonctionnalités exclues du périmètre

Le projet ne vise pas à :

- produire un assistant généraliste ;
- remplacer un enseignant ou un ingénieur pédagogique ;
- automatiser des décisions pédagogiques ;
- évaluer automatiquement des étudiants ;
- détecter automatiquement des usages d’IA dans les productions étudiantes ;
- surveiller les étudiants ou les examens ;
- proposer des dispositifs de brouillage, de filtrage ou de contrôle technique ;
- se substituer à un cadre réglementaire, disciplinaire ou institutionnel ;
- traiter des données personnelles sensibles ;
- intégrer des usages relevant de la messagerie personnelle ou professionnelle ;
- devenir un outil institutionnel sans phase préalable de cadrage, de test et d’évaluation.

## 7. Principes de conception

Learnix doit respecter plusieurs principes structurants.

### 7.1. Sobriété

Le projet doit privilégier des usages simples, compréhensibles et soutenables. L’objectif n’est pas de multiplier les fonctionnalités, mais de construire un démonstrateur clair, utile et maîtrisé.

### 7.2. Transparence

Les limites du dispositif doivent être explicites. Learnix doit rendre visibles son périmètre, son corpus, ses règles de réponse et ses conditions d’usage.

### 7.3. Maîtrise documentaire

Learnix doit répondre prioritairement à partir d’un corpus choisi. Le projet doit montrer l’intérêt d’un assistant documentaire spécialisé par rapport à un usage non cadré d’une IA générative généraliste.

### 7.4. Refus utile

Le refus de répondre lorsque l’information n’est pas disponible dans le corpus est une fonctionnalité importante. Il permet d’éviter les réponses inventées et de renforcer la confiance dans le dispositif.

### 7.5. Approche critique

Learnix doit être présenté comme un objet de discussion, pas comme une solution clé en main. Les limites, biais, risques et conditions d’usage doivent être intégrés à la ressource.

### 7.6. Réutilisabilité

Le projet doit être documenté pour pouvoir être compris, adapté, discuté ou repris dans d’autres contextes.

## 8. Méthode de structuration : ADDIE

Le projet Learnix peut être structuré selon le modèle ADDIE afin de conserver une démarche d’ingénierie pédagogique complète.

### 8.1. Analyse

Identifier les besoins, les objectifs d’apprentissage, les contraintes du contexte et les caractéristiques des publics.

Questions à documenter :

- quels besoins pédagogiques Learnix cherche-t-il à couvrir ?
- quels publics sont concernés en priorité ?
- quels problèmes actuels l’assistant peut-il aider à traiter ?
- quelles ressources documentaires sont disponibles ?
- quelles contraintes techniques, institutionnelles, éthiques ou juridiques doivent être prises en compte ?
- quels usages de l’IA sont déjà observés chez les enseignants ou étudiants ?

Livrables possibles :

- fiche d’analyse des besoins ;
- cartographie des publics ;
- inventaire du corpus documentaire ;
- liste des contraintes ;
- premiers scénarios d’usage.

### 8.2. Design

Structurer le dispositif, définir les activités, les modalités d’usage, les supports et les critères d’évaluation.

Questions à documenter :

- quelle place donner à Learnix dans un échange, un atelier ou une formation ?
- quelles questions types doivent être testées ?
- quelles règles de réponse doivent encadrer l’assistant ?
- comment distinguer les usages enseignants, ingénieurs pédagogiques et institutionnels ?
- comment rendre l’expérience lisible dans AnythingLLM et Telegram ?
- quels critères permettront de juger la qualité d’une réponse ?

Livrables possibles :

- scénario de démonstration ;
- consigne système de Learnix ;
- grille de test des réponses ;
- parcours utilisateur ;
- structure du mini-site.

### 8.3. Développement

Produire les ressources, formaliser les séquences, préparer les contenus et outiller le dispositif.

Éléments à produire :

- corpus documentaire ;
- configuration AnythingLLM ;
- connexion Telegram ;
- documentation API ;
- page de présentation du projet ;
- fiche méthode sur les assistants documentaires ;
- exemples de questions ;
- grille d’analyse des usages pédagogiques de l’IA ;
- glossaire ;
- page sur les points de vigilance.

### 8.4. Implémentation

Déployer le dispositif, accompagner sa mise en œuvre et assurer les ajustements nécessaires en situation.

Questions à documenter :

- comment présenter Learnix à un public non spécialiste ?
- comment organiser une démonstration courte et compréhensible ?
- comment recueillir les réactions des utilisateurs ?
- quels problèmes d’usage apparaissent avec Telegram ?
- quelles différences observe-t-on entre l’interface AnythingLLM et Telegram ?
- quels ajustements sont nécessaires sur le corpus, les prompts ou les interfaces ?

Livrables possibles :

- guide de démonstration ;
- protocole de test ;
- fiche de retour utilisateur ;
- journal d’expérimentation ;
- liste des améliorations à prioriser.

### 8.5. Évaluation

Mesurer les effets, recueillir les retours, analyser les écarts et améliorer progressivement le dispositif.

Questions à documenter :

- les réponses sont-elles pertinentes ?
- les limites du dispositif sont-elles compréhensibles ?
- les utilisateurs identifient-ils l’intérêt d’un assistant documentaire ?
- le dispositif aide-t-il à réfléchir aux usages pédagogiques de l’IA ?
- le corpus est-il suffisant ?
- les réponses sont-elles lisibles dans Telegram ?
- les règles de refus sont-elles bien appliquées ?
- quels usages semblent transférables à d’autres contextes ?

Livrables possibles :

- grille d’évaluation des réponses ;
- synthèse des retours ;
- bilan d’expérimentation ;
- feuille de route d’amélioration ;
- version actualisée de la documentation.

## 9. Architecture envisagée du dépôt GitHub

Le projet mérite un dépôt GitHub dédié, distinct du site principal, afin de pouvoir être transformé en mini-site documentaire.

Structure possible :

```text
learnix/
├── README.md
├── docs/
│   ├── index.md
│   ├── contexte.md
│   ├── objectifs.md
│   ├── addie.md
│   ├── demonstrateur.md
│   ├── anythingllm.md
│   ├── telegram.md
│   ├── api.md
│   ├── corpus.md
│   ├── usages-pedagogiques.md
│   ├── vigilance.md
│   ├── evaluation.md
│   └── feuille-de-route.md
├── fiches/
│   ├── fiche-analyse-besoins.md
│   ├── fiche-scenario-usage.md
│   ├── grille-test-reponses.md
│   ├── grille-usages-ia.md
│   └── fiche-retour-experience.md
├── exemples/
│   ├── questions-test.md
│   ├── demo-learnix.md
│   └── cas-assistant-documentaire.md
├── corpus/
│   └── README.md
└── assets/
    └── README.md
```

Le site principal JEDI-OpenLab pourra faire un lien vers ce dépôt, mais le dépôt Learnix doit rester autonome et compréhensible indépendamment.

## 10. Contenus à produire en priorité

Pour disposer rapidement d’une première version exploitable, les contenus prioritaires sont :

1. `README.md` : présentation courte du projet, objectifs, statut, liens utiles.
2. `docs/index.md` : page d’accueil du mini-site.
3. `docs/contexte.md` : contexte IA, enseignement supérieur et ingénierie pédagogique.
4. `docs/addie.md` : structuration du chantier selon Analyse, Design, Développement, Implémentation, Évaluation.
5. `docs/demonstrateur.md` : présentation de Learnix comme assistant documentaire.
6. `docs/anythingllm.md` : rôle d’AnythingLLM dans le dispositif.
7. `docs/telegram.md` : usages, intérêts et limites de l’interface Telegram.
8. `docs/corpus.md` : principes de constitution du corpus.
9. `docs/vigilance.md` : risques, limites, biais, données, hallucinations, dépendances techniques.
10. `fiches/grille-test-reponses.md` : grille simple pour tester la qualité des réponses.

## 11. Positionnement du démonstrateur Learnix

Learnix doit être présenté comme un démonstrateur permettant de discuter plusieurs questions clés :

- qu’est-ce qu’un assistant documentaire pédagogique ?
- comment construire un assistant à partir d’un corpus maîtrisé ?
- que gagne-t-on par rapport à un chatbot généraliste ?
- que perd-on ou que complique-t-on ?
- comment encadrer les réponses ?
- comment tester la fiabilité ?
- comment rendre les limites visibles ?
- comment accompagner les enseignants dans ces usages ?
- comment transférer cette approche dans d’autres contextes institutionnels ou internationaux ?

Le démonstrateur doit permettre de montrer des exemples concrets :

- une question à laquelle Learnix peut répondre ;
- une question ambiguë qui montre la nécessité de préciser le besoin ;
- une question hors corpus qui doit produire un refus ;
- une comparaison entre réponse dans AnythingLLM et réponse via Telegram ;
- une discussion sur la lisibilité, la confiance et la qualité documentaire.

## 12. Corpus documentaire

Le corpus est un élément central du projet.

Il doit être :

- cohérent avec les objectifs de Learnix ;
- limité dans un premier temps ;
- documenté ;
- actualisable ;
- composé de sources fiables ;
- structuré pour faciliter les réponses ;
- compatible avec les contraintes techniques d’AnythingLLM.

Types de documents envisageables :

- ressources internes d’ingénierie pédagogique ;
- fiches méthodes ;
- documents sur l’alignement pédagogique ;
- ressources sur l’évaluation ;
- documents sur l’innovation pédagogique ;
- textes de cadrage sur les usages de l’IA ;
- ressources institutionnelles ;
- ressources scientifiques ou professionnelles sélectionnées.

Le corpus doit être décrit dans le dépôt, même si tous les documents ne peuvent pas être rendus publics.

## 13. Règles de comportement attendues de Learnix

Learnix doit respecter les règles suivantes :

- répondre exclusivement à partir du contexte documentaire fourni ;
- ne pas inventer d’information absente du corpus ;
- signaler clairement lorsqu’une information n’est pas trouvée ;
- produire des réponses concises, structurées et lisibles ;
- éviter les affirmations non sourcées ;
- distinguer ce qui relève du documenté et ce qui relève d’une hypothèse ;
- ne pas se présenter comme une autorité absolue ;
- encourager une posture critique ;
- rester centré sur l’ingénierie pédagogique et les usages pédagogiques de l’IA.

Formule de refus proposée :

> Je ne trouve pas cette information dans les documents de Learnix.

## 14. Points de vigilance

Le projet doit intégrer explicitement les points de vigilance suivants :

- hallucinations possibles ;
- dépendance à la qualité du corpus ;
- obsolescence des documents ;
- erreurs d’interprétation ;
- différences de qualité selon les interfaces ;
- lisibilité parfois dégradée dans Telegram ;
- gestion des données ;
- droit d’auteur ;
- cadre réglementaire des usages de l’IA ;
- articulation avec le RGPD, la CNIL et le rôle du DPO ;
- risques liés aux dispositifs techniques de surveillance ou de détection ;
- effets possibles sur les équipements médicaux ou d’assistance en cas de dispositifs de contrôle ;
- obsolescence rapide des solutions technologiques de contrôle ;
- biais culturels et linguistiques ;
- risque de surconfiance ;
- confusion entre aide, production et substitution ;
- nécessité d’un accompagnement humain.

## 15. Ce que Learnix n’est pas

Pour éviter toute ambiguïté, Learnix n’est pas :

- un outil de surveillance des étudiants ;
- un détecteur de productions générées par IA ;
- un dispositif anti-triche ;
- une solution de contrôle des examens ;
- un outil de sanction ou de décision disciplinaire ;
- un substitut à un règlement des études ou à une politique institutionnelle ;
- une réponse purement technique à un problème pédagogique, juridique et culturel.

Learnix ne cherche pas à automatiser la défiance. Il cherche au contraire à outiller la compréhension, la discussion et la conception pédagogique.

## 16. Ce que Learnix est vraiment

Learnix est :

- un assistant documentaire spécialisé en ingénierie pédagogique ;
- un démonstrateur d’usage raisonné de l’IA générative ;
- un support pour explorer les usages pédagogiques de l’IA ;
- un outil de médiation pour discuter avec des enseignants, collègues ou partenaires ;
- un exemple de démarche fondée sur un corpus maîtrisé ;
- un projet ouvert, documenté et améliorable ;
- une manière de poser la question de l’IA par les compétences, les activités et les évaluations plutôt que par la seule fraude.

Learnix doit permettre d’ouvrir une discussion de fond : lorsque l’IA devient disponible dans l’environnement ordinaire des étudiants, que veut-on réellement observer, former, accompagner et évaluer ?

## 17. Critères de réussite

Une première version de Learnix sera considérée comme satisfaisante si :

- le dépôt GitHub est compréhensible sans explication orale ;
- le mini-site peut servir de support à une présentation ;
- Learnix répond correctement à des questions simples liées au corpus ;
- Learnix refuse les questions hors corpus ;
- les limites du dispositif sont clairement documentées ;
- la démonstration AnythingLLM / Telegram est reproductible ;
- les enjeux pédagogiques sont plus visibles que la seule performance technique ;
- le projet ouvre une discussion sur les usages de l’IA dans l’enseignement ;
- la démarche ADDIE permet de structurer la suite du chantier.

## 18. Feuille de route initiale

### Étape 1 — Cadrage

- formaliser les objectifs du projet ;
- définir le périmètre ;
- identifier les publics ;
- choisir les premiers cas d’usage ;
- établir les règles de réponse de Learnix.

### Étape 2 — Corpus

- sélectionner les premiers documents ;
- nettoyer et organiser les fichiers ;
- documenter le corpus ;
- tester les réponses produites à partir du corpus.

### Étape 3 — Démonstrateur

- configurer AnythingLLM ;
- paramétrer Learnix ;
- connecter Telegram ;
- tester l’API ;
- préparer une séquence de démonstration.

### Étape 4 — Documentation

- rédiger les pages principales du dépôt ;
- produire les fiches méthode ;
- documenter les limites ;
- préparer une page de présentation publique.

### Étape 5 — Évaluation et amélioration

- collecter les retours ;
- analyser les réponses problématiques ;
- améliorer le corpus ;
- ajuster les consignes ;
- enrichir la documentation ;
- prioriser les développements futurs.

## 19. Ressource ouverte et diffusion

Le dépôt Learnix doit être pensé comme une ressource ouverte.

Cela implique :

- une documentation claire ;
- une licence explicite ;
- une structure facilement navigable ;
- des exemples concrets ;
- des limites assumées ;
- une possibilité de reprise ou d’adaptation ;
- un lien depuis le site principal JEDI-OpenLab.

L’objectif n’est pas de livrer un produit fini, mais de rendre visible une démarche : analyser, concevoir, développer, implémenter, évaluer et améliorer un usage pédagogique de l’IA.

## 20. Synthèse

Learnix est un démonstrateur d’assistant documentaire pédagogique construit avec AnythingLLM, une API et une interface Telegram.

Il vise à explorer les usages pédagogiques de l’IA générative dans l’enseignement supérieur, en partant d’une démarche d’ingénierie pédagogique plutôt que d’une logique purement technologique.

Le projet doit permettre de montrer concrètement comment un assistant IA peut être conçu, cadré, testé et discuté à partir d’un corpus documentaire choisi.

Sa valeur principale n’est pas seulement dans l’outil produit, mais dans la réflexion qu’il rend possible : comment intégrer l’IA de manière utile, critique, sobre, documentée et transférable dans les pratiques d’enseignement et d’accompagnement pédagogique.