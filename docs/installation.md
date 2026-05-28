# Installation et méthode

Cette fiche décrit la méthode suivie pour installer le démonstrateur Learnix. Elle ne publie ni clé API, ni bot privé, ni configuration personnelle sensible.

L'intérêt de cette fiche est de rendre la démarche reproductible : on comprend quels logiciels ont été retenus, quels réglages structurent le comportement de Learnix et où se situent les points de vigilance.

## 1. Choisir un outil RAG

Learnix a été construit avec AnythingLLM parce que l'outil permet de :

- créer un workspace documentaire ;
- importer et indexer un corpus ;
- connecter le modèle `mistral-small-4-119b` via clé API ;
- régler le comportement de recherche ;
- exposer une interface web ;
- connecter Telegram pour un usage privé.

Ce choix n'est pas exclusif. D'autres solutions peuvent être envisagées selon les besoins, par exemple Dify, Open WebUI, Flowise, LangChain ou LlamaIndex. Pour Learnix, AnythingLLM a surtout servi à obtenir rapidement une chaîne RAG lisible, testable et présentable.

## 2. Installer AnythingLLM

L'installation consiste à mettre en place AnythingLLM sur la machine ou le serveur retenu pour le démonstrateur.

Principes retenus :

- garder l'administration privée ;
- ne pas publier l'instance ;
- ne pas exposer la clé API ;
- ne pas publier les documents non diffusables ;
- vérifier que l'espace disque et la machine suffisent pour l'indexation.

## 3. Connecter le modèle

Le démonstrateur actuel utilise le modèle `mistral-small-4-119b` via une API distante mise à disposition dans le cadre de l'accord-cadre avec l'AMUE.

Étapes de principe :

- créer ou récupérer la clé API autorisée ;
- renseigner la clé dans les réglages modèle d'AnythingLLM ;
- sélectionner `mistral-small-4-119b` comme modèle appelé par Learnix ;
- vérifier que le fournisseur répond correctement ;
- ne jamais copier la clé dans le dépôt GitHub ;
- documenter seulement le principe d'usage, pas la valeur de la clé.

Un modèle local pourrait être étudié dans une phase ultérieure. Cela ne signifie pas nécessairement entraîner un modèle sur le corpus : dans une approche RAG, le modèle peut rester général tandis que le corpus est local, indexé et strictement maîtrisé.

## 4. Créer le workspace Learnix

Dans AnythingLLM, un workspace dédié est créé pour Learnix.

Étapes de principe :

- créer l'espace de travail Learnix ;
- importer les documents sélectionnés ;
- vérifier que les fichiers sont bien lisibles ;
- rattacher les documents au workspace ;
- lancer ou vérifier l'indexation ;
- contrôler le nombre de vecteurs et la qualité des extraits récupérés.

Dans l'état observé du démonstrateur, la base vectorielle indiquait :

- identifiant : `mon-espace-de-travail` ;
- nombre de vecteurs : `6128`.

## 5. Configurer le comportement documentaire

Les réglages appliqués visent à empêcher Learnix de répondre comme une IA généraliste.

Réglages documentés :

- mode de chat : `Requête` ;
- options disponibles : `Agent`, `Chat`, `Requête` ;
- modèle : `mistral-small-4-119b` ;
- réponse de refus : `Je ne trouve pas cette information dans les documents de Learnix.` ;
- température LLM : `0` ;
- search preference : `Accuracy Optimized` ;
- nombre maximum de contextes : `8` ;
- seuil de similarité : `Moyen (score de similarité ≥ .50)`.

La température `0` réduit la variation des réponses, mais elle ne suffit pas seule. Le comportement dépend aussi du mode requête, du corpus, du seuil de similarité, de l'invite et des tests.

## 6. Configurer Telegram

Telegram est utilisé comme interface privée pour interroger Learnix rapidement depuis un téléphone ou un ordinateur.

Étapes de principe :

- créer ou utiliser un compte Telegram ;
- créer un bot avec `BotFather` ;
- récupérer le token du bot ;
- renseigner le token dans l'intégration Telegram d'AnythingLLM ;
- scanner le QR code affiché par AnythingLLM pour l'appairage Telegram ;
- associer le bot au workspace Learnix ;
- restreindre l'usage au compte personnel ;
- désactiver l'usage en groupes et éviter les droits d'administration inutiles.

Le bot Telegram ne contient pas la clé API et n'héberge pas le corpus. Il sert seulement d'interface vers AnythingLLM.

## 7. Tester avant de présenter

Avant toute présentation, il faut tester :

- une question dont la réponse est dans le corpus ;
- une question hors corpus qui doit produire le refus exact ;
- une question ambiguë ;
- une question longue ou complexe ;
- la lisibilité de la réponse dans Telegram ;
- l'absence de données sensibles dans les documents importés.

Cette étape transforme Learnix en démonstrateur pédagogique : on ne montre pas seulement que le bot répond, on montre comment il est cadré et où il atteint ses limites.
