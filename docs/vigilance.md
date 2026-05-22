# Points de vigilance

Learnix fonctionne comme démonstrateur personnel, mais plusieurs points doivent rester visibles.

## Limites des IA grand public

Une IA grand public, même configurée sous forme de GPT, de Gem ou d'assistant dédié, ne suffit pas forcément pour un assistant documentaire pédagogique.

Les limites principales sont :

- réponses plausibles mais non documentées ;
- mobilisation de connaissances générales non vérifiables ;
- mélange possible entre corpus fourni et savoir du modèle ;
- sources absentes, floues ou reconstituées ;
- difficulté à garantir un refus hors corpus ;
- perte de maîtrise sur les documents réellement utilisés ;
- risque de surconfiance.

Learnix cherche donc à travailler sur un corpus documentaire absolument maîtrisé, avec un périmètre explicite et sans débordement.

## Données

Ne pas utiliser le démonstrateur personnel pour :

- données étudiantes nominatives ;
- copies d'étudiants ;
- données RH ;
- données sensibles ;
- informations confidentielles ;
- demandes relevant d'une décision institutionnelle ou disciplinaire.

## Clés et accès

Une clé API personnelle ne doit pas devenir la clé d'un service collectif. Pour un pilote institutionnel, il faudrait une clé de service, une gouvernance d'accès et une validation par les acteurs concernés.

## Impact, API et modèle local

Le démonstrateur utilise une API mise à disposition dans le cadre de l'accord-cadre avec l'AMUE. Cette solution est adaptée pour prouver rapidement un usage, mais elle ne doit pas être présentée comme sobre par principe. Elle pose plusieurs questions :

- dépendance à un service distant ;
- visibilité limitée sur l'empreinte réelle des appels ;
- changement d'échelle si les usages se multiplient ;
- gouvernance des accès et des coûts ;
- articulation avec une politique numérique responsable.

À terme, un modèle local ou une infrastructure institutionnelle maîtrisée pourrait être étudié. Cela ne signifie pas nécessairement entraîner entièrement un modèle sur le corpus : dans une approche RAG, le corpus peut rester local, indexé et maîtrisé, tandis que le modèle sert à formuler les réponses à partir des extraits récupérés.

Un entraînement spécifique ou un fine-tuning constituerait un autre changement d'échelle, plus coûteux, à discuter sur les plans pédagogique, technique, financier et écologique.

## Corpus

La qualité des réponses dépend fortement :

- de la qualité des documents ;
- de la qualité d'extraction ;
- de l'indexation effective dans le workspace ;
- du seuil de similarité ;
- de la formulation des questions.

## Telegram

Telegram est utile pour un usage personnel rapide, mais il dégrade la lisibilité des réponses complexes. L'interface web AnythingLLM reste plus adaptée aux réponses longues, aux sources et aux formats structurés.

## Passage à l'échelle

Ouvrir Learnix à un public plus large suppose :

- authentification ;
- droits utilisateurs ;
- politique de confidentialité ;
- charte d'usage ;
- support ;
- sauvegardes ;
- maintenance ;
- procédure de mise à jour du corpus ;
- cadrage juridique et RGPD ;
- implication de la DSI.
