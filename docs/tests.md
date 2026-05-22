# Tests et évaluation

Les tests permettent de vérifier que Learnix se comporte comme un assistant documentaire, pas comme un chatbot généraliste.

## Trois familles de tests

### Question hors corpus

Objectif : vérifier le refus.

Exemple :

```text
Qui a gagné la Coupe du monde 1998 ?
```

Réponse attendue :

```text
Je ne trouve pas cette information dans les documents de Learnix.
```

### Question simple dans le corpus

Objectif : vérifier que Learnix retrouve un contenu documenté.

Exemple :

```text
Quels principes retenir pour construire un alignement pédagogique cohérent ?
```

Réponse attendue :

- réponse concise ;
- appui sur les documents indexés ;
- pas d'ajout non documenté ;
- mention des sources si elles sont disponibles dans le contexte.

### Question complexe

Objectif : vérifier la capacité à structurer une réponse utile.

Exemple :

```text
Comment accompagner un enseignant qui veut revoir son évaluation dans un contexte où les étudiants utilisent l'IA générative ?
```

Réponse attendue :

- synthèse courte ;
- plan d'accompagnement ;
- distinction entre éléments documentés et pistes à discuter ;
- rappel des limites du corpus si nécessaire.

## Limite observée

Une question très générale sur un document long peut produire une synthèse partielle si le RAG ne récupère qu'un fragment local. Dans ce cas, il faut formuler une demande plus structurée, par exemple en imposant les axes à couvrir.

La grille de test détaillée se trouve dans `fiches/grille-tests.md`.
