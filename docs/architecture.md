# Architecture

Learnix repose sur une architecture RAG : Retrieval-Augmented Generation, ou génération augmentée par recherche documentaire.

```text
Utilisateur
→ interface de discussion
→ AnythingLLM
→ workspace Learnix
→ documents indexés
→ API distante
→ mistral-small-4-119b
→ réponse documentée
```

## C'est quoi le RAG ?

Un RAG combine deux étapes :

1. **Retrieval** : le système cherche dans une base documentaire les extraits les plus proches de la question.
2. **Generation** : le modèle de langage produit une réponse à partir des extraits transmis.

Dans Learnix, le modèle ne connaît pas directement les documents pédagogiques. AnythingLLM extrait, découpe et indexe les documents dans une base vectorielle. Quand une question est posée, AnythingLLM retrouve des fragments pertinents et les donne au modèle comme contexte de réponse.

L'intérêt pédagogique est important : on ne demande pas seulement au modèle de “savoir”, on l'oblige à travailler à partir d'un corpus choisi, maîtrisé et discutable.

## Choix d'AnythingLLM

AnythingLLM a été retenu pour le démonstrateur parce qu'il permet de :

- créer un workspace documentaire ;
- importer des PDF, DOCX et pages web ;
- indexer les contenus ;
- interroger le corpus en langage naturel ;
- connecter un fournisseur de modèle compatible OpenAI ;
- tester rapidement des réglages RAG.

## Modèle actuel et option locale

Le démonstrateur actuel utilise le modèle `mistral-small-4-119b` via une API distante mise à disposition dans le cadre de l'accord-cadre avec l'AMUE. Ce choix évite d'installer un modèle lourd localement et permet de faire tourner le dispositif sur une machine modeste.

Un modèle local pourrait toutefois être envisagé pour certains usages :

- lorsque la confidentialité impose de limiter les appels externes ;
- lorsque l'institution dispose de l'infrastructure nécessaire ;
- lorsque les performances attendues restent compatibles avec le matériel disponible.

Le choix du modèle n'est donc pas le cœur du projet. Le cœur du projet est la maîtrise documentaire : corpus, prompts, seuils, tests et gouvernance.

## Interfaces

Deux interfaces ont été testées :

- l'interface web AnythingLLM, confortable pour les réponses longues et la consultation approfondie ;
- Telegram, pratique pour un usage personnel rapide, mais moins adapté aux formats riches.

Le bot Telegram reste privé et n'a pas vocation à être ouvert tel quel.
