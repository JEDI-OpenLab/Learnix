# Démarche

Learnix part d'une question simple : comment rendre une base documentaire pédagogique interrogeable sans transformer l'IA en oracle généraliste ?

Le projet ne cherche pas à mettre un chatbot public entre les mains de tous. Il documente une preuve de concept personnelle qui permet de discuter :

- la constitution d'un corpus fiable ;
- les limites d'un assistant documentaire ;
- les réglages nécessaires pour limiter les réponses hors corpus ;
- l'intérêt pédagogique d'un RAG pour un centre d'innovation pédagogique ;
- les conditions d'un passage à l'échelle institutionnel.

## Positionnement

Learnix est un assistant documentaire et un démonstrateur de médiation. Sa valeur ne vient pas seulement du fait qu'il fonctionne, mais du fait qu'il rend visibles les choix de conception :

- quel corpus choisir ;
- quelles questions autoriser ;
- comment refuser utilement ;
- comment évaluer la qualité des réponses ;
- quelles données ne jamais traiter ;
- à quelles conditions un outil personnel peut devenir un pilote collectif.

## Démarche ADDIE

Learnix est alimenté par une démarche d'ingénierie pédagogique de type ADDIE.

### Analyse

Identifier les besoins, les publics, les contraintes, les documents disponibles et les questions pédagogiques auxquelles Learnix pourrait aider à répondre.

### Design

Définir les scénarios d'usage, les règles de réponse, la place de Learnix dans une médiation, les tests de qualité et les critères d'acceptabilité.

### Développement

Constituer le corpus, préparer les documents, configurer AnythingLLM, rédiger l'invite, paramétrer le mode requête et préparer les scénarios de démonstration.

### Implémentation

Installer le démonstrateur, l'utiliser dans un cadre privé, tester l'interface web et Telegram, observer les problèmes d'usage et documenter les limites.

### Évaluation

Vérifier les réponses, les refus hors corpus, la lisibilité, les erreurs, les risques de surinterprétation et les conditions d'un éventuel pilote collectif.

## Ce que Learnix n'est pas

Learnix n'est pas :

- un chatbot généraliste ;
- un détecteur de textes produits par IA ;
- un outil de surveillance ;
- une solution anti-triche ;
- un service institutionnel prêt à ouvrir ;
- un substitut au travail d'accompagnement pédagogique.

## Ce que Learnix cherche à montrer

Learnix montre qu'il est possible de construire un assistant documentaire limité et utile, à condition de traiter l'IA comme un objet d'ingénierie pédagogique : analyse des besoins, conception, développement, implémentation, évaluation.

La sobriété n'est pas déclarée comme acquise : elle doit être travaillée, documentée et évaluée, notamment lorsque l'on compare une API distante, un modèle local, un usage individuel et un passage à l'échelle institutionnel.
