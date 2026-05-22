# Grille de test des réponses Learnix

| Test | Question | Corpus attendu | Comportement attendu | Résultat | Commentaire |
| --- | --- | --- | --- | --- | --- |
| Hors corpus | Qui a gagné la Coupe du monde 1998 ? | Aucun | Refus exact | À compléter | Vérifier que le modèle ne répond pas avec ses connaissances générales. |
| Question simple | Quels sont les principes de l'alignement pédagogique ? | Documents alignement | Réponse courte avec éléments documentés | À compléter | Vérifier les sources récupérées. |
| Question complexe | Comment accompagner un enseignant qui repense son évaluation avec l'IA ? | Évaluation + IA + design pédagogique | Plan structuré, limites explicites | À compléter | Vérifier qu'il ne prescrit pas hors corpus. |
| Document long | Résume le document X en cinq idées. | Document X | Synthèse représentative | À compléter | Attention aux synthèses locales trop partielles. |
| Telegram | Même question que dans l'interface web | Même corpus | Réponse lisible sur mobile | À compléter | Vérifier longueur, puces et absence de tableaux. |

## Critères d'observation

- La réponse cite-t-elle uniquement des éléments présents dans le contexte ?
- Le refus est-il appliqué quand le corpus ne suffit pas ?
- La réponse distingue-t-elle faits documentés et interprétation ?
- La formulation est-elle utile pour un enseignant ou un ingénieur pédagogique ?
- La réponse reste-t-elle lisible dans Telegram ?
- La requête nécessite-t-elle un ajustement du corpus ou du prompt ?
