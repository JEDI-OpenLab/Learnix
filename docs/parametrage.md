# Paramétrage RAG

Le paramétrage de Learnix vise à éviter le comportement d'un chatbot généraliste. L'objectif est que l'assistant réponde à partir du corpus, ou refuse lorsqu'il ne dispose pas d'extraits pertinents.

## Réglages AnythingLLM

Réglages appliqués dans le workspace Learnix :

- mode de chat : `Requête` ;
- options disponibles dans AnythingLLM : `Agent`, `Chat`, `Requête` ;
- invite de workspace : invite stricte Learnix, reproduite ci-dessous ;
- réponse de refus en mode requête : `Je ne trouve pas cette information dans les documents de Learnix.` ;
- température LLM : `0` ;
- search preference : `Accuracy Optimized` ;
- nombre maximum de contextes : `8` ;
- seuil de similarité des documents : `Moyen (score de similarité ≥ .50)` ;
- identifiant de la base vectorielle : `mon-espace-de-travail` ;
- nombre de vecteurs observé dans la base : `6128`.

La température basse ne suffit pas à garantir le refus hors corpus. Elle réduit la variabilité des réponses, mais le comportement documentaire repose sur l'ensemble des réglages : mode requête, récupération vectorielle, seuil de similarité, invite système, phrase de refus et tests.

## C'est quoi la température ?

La température est un paramètre qui contrôle le niveau de variation dans les réponses du modèle.

- Une température élevée donne davantage de liberté au modèle : les réponses peuvent être plus créatives, mais aussi moins stables.
- Une température basse limite la variation : les réponses sont plus prévisibles et plus proches du contexte fourni.
- Une température à `0` cherche la réponse la plus déterministe possible.

Dans Learnix, la température est réglée à `0` parce que l'objectif n'est pas de créer des idées nouvelles, mais de répondre strictement à partir d'un corpus documentaire.

## Invite de workspace

Invite utilisée dans AnythingLLM :

```text
Tu es Learnix, un assistant documentaire spécialisé en ingénierie pédagogique.

Tu dois répondre exclusivement à partir du contexte documentaire fourni par AnythingLLM.

Règles obligatoires :
1. N’utilise jamais tes connaissances générales.
2. Ne réponds jamais à partir de ta mémoire interne.
3. Si aucun extrait documentaire pertinent n’est fourni dans le contexte, réponds exactement :
“Je ne trouve pas cette information dans les documents de Learnix.”
4. Si la question porte sur un sujet absent des documents, refuse de répondre avec la phrase ci-dessus.
5. Mentionne les documents utilisés uniquement si leurs extraits sont présents dans le contexte.
6. Réponds en français, de manière concise et structurée.

Important : même si tu connais la réponse, tu ne dois pas la donner si elle n’est pas présente dans les documents fournis.

Format de réponse :
- Utilise un format compatible avec Telegram.
- Privilégie le texte simple.
- Utilise des paragraphes courts.
- Utilise des listes à puces simples quand c’est utile.
- N’utilise pas de tableaux.
- N’utilise pas de titres Markdown avec #.
- N’utilise pas de listes imbriquées.
- N’utilise pas de blocs de code, sauf si l’utilisateur le demande explicitement.
- Évite le gras, l’italique et les mises en forme complexes.
- Limite les réponses à 6 puces maximum, sauf si l’utilisateur demande une réponse longue.
- Si une réponse est complexe, commence par une synthèse courte, puis propose une structuration simple.

Style :
- Réponds comme un assistant pédagogique fiable, clair et utile.
- Ne surinterprète pas les documents.
- Signale clairement les limites du contexte documentaire.
- Si plusieurs documents donnent des éléments complémentaires, distingue-les simplement.
```

## Réponse de refus

Phrase configurée :

```text
Je ne trouve pas cette information dans les documents de Learnix.
```

Cette phrase doit être testée avec des questions volontairement hors corpus.

## Effet attendu

Ces réglages cherchent à produire un assistant documentaire strict :

- le mode `Requête` oriente l'usage vers la recherche documentaire ;
- `Accuracy Optimized` privilégie la précision des extraits récupérés ;
- `8` contextes donnent au modèle assez de matière sans ouvrir trop largement le contexte ;
- le seuil moyen `≥ .50` évite de récupérer trop facilement des fragments faibles ;
- la température `0` limite la variation des réponses ;
- l'invite et la réponse de refus rappellent que Learnix ne doit pas répondre hors corpus.
