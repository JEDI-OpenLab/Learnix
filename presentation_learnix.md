

# Présentation du démonstrateur Learnix

## 1. Point de départ

L’objectif de Learnix est de créer un assistant documentaire personnel capable de répondre à des questions d’ingénierie pédagogique à partir d’une base documentaire maîtrisée.

L’idée n’est pas de faire un chatbot généraliste de plus, mais plutôt un outil du type :

> Je pose une question pédagogique, et l’assistant me répond à partir des documents que j’ai sélectionnés, importés et validés.

Le projet s’appuie sur une clé API ILaaS/Mistral fournie dans le cadre de l’expérimentation avec l’AMUE. Cette clé permet d’interroger des modèles de langage distants, sans installer de modèle lourd sur la machine locale.

Architecture générale :

```text
Utilisateur
→ interface de chat
→ AnythingLLM
→ base documentaire / RAG
→ API ILaaS
→ modèle de langage distant
→ réponse
```

Le nom choisi pour le démonstrateur est **Learnix**.

---

## 2. Ce que permet la clé API ILaaS

La clé API ne donne pas directement accès à une interface de chat. Elle donne accès à un service d’inférence, c’est-à-dire à des modèles de langage utilisables par des logiciels compatibles.

La clé fonctionne avec l’endpoint ILaaS :

```text
https://llm.ilaas.fr/v1
```

L’API est compatible avec le format OpenAI, ce qui permet de l’utiliser dans des logiciels configurables comme :

- AnythingLLM ;
- Open WebUI ;
- LibreChat ;
- des scripts Python ;
- des applications maison ;
- des outils compatibles OpenAI API.

La clé a été testée avec la commande :

```bash
curl https://llm.ilaas.fr/v1/models \
  -H "Authorization: Bearer $ILAAS_API_KEY"
```

La commande a retourné la liste des modèles accessibles, notamment :

```text
gemma-4-31b
gpt-oss-120b
llama-3.1-8b
llama-3.3-70b
mistral-medium-250523
mistral-small-3.2-24b
qwen-3.6-35b-instruct
```

Conclusion : la clé fonctionne bien, mais elle doit rester personnelle et sécurisée. Elle ne doit pas être placée dans Moodle ou dans un service collectif non maîtrisé, car elle est liée à un usage, à des droits et potentiellement à des crédits.

---

## 3. Pourquoi AnythingLLM ?

Plusieurs options étaient possibles.

### Open WebUI

Open WebUI est adapté pour créer une interface de chat généraliste, proche de ChatGPT, avec des modèles distants ou locaux. Il peut être pertinent pour un usage institutionnel large, notamment si l’on souhaite proposer un chat IA multi-utilisateurs.

Pour le besoin immédiat, il est toutefois moins directement centré sur la logique documentaire/RAG.

### LibreChat

LibreChat est puissant et se rapproche d’une expérience ChatGPT avancée, avec multi-modèles, agents, fichiers et endpoints personnalisés. C’est une solution intéressante pour une plateforme institutionnelle plus ambitieuse, mais plus lourde à administrer.

### AnythingLLM

AnythingLLM a été choisi pour le démonstrateur parce qu’il est très adapté à l’objectif :

- créer un workspace documentaire ;
- importer des PDF, DOCX et pages web ;
- scraper des sites ;
- indexer les documents ;
- interroger le corpus en langage naturel ;
- connecter un modèle distant via API.

Il permet donc de créer assez rapidement un assistant de type RAG.

---

## 4. Ce qu’est le RAG dans Learnix

RAG signifie **Retrieval-Augmented Generation**, c’est-à-dire génération augmentée par recherche documentaire.

Concrètement, Learnix ne répond pas seulement avec le modèle de langage. Il fonctionne en plusieurs étapes :

```text
1. Des documents sont importés dans AnythingLLM.
2. AnythingLLM extrait leur texte.
3. Il découpe les documents en fragments.
4. Il transforme ces fragments en embeddings.
5. Il les stocke dans une base vectorielle.
6. Quand on pose une question, il cherche les fragments les plus pertinents.
7. Il envoie ces fragments au modèle ILaaS.
8. Le modèle produit une réponse à partir du contexte documentaire fourni.
```

Le modèle distant ne connaît donc pas directement les documents. C’est AnythingLLM qui lui fournit les extraits pertinents au moment de la question.

---

## 5. Installation serveur

Learnix a été installé sur un PC Ubuntu existant.

Machine utilisée :

```text
Ubuntu Studio 24.04
Intel Core i5-6600 3.30 GHz
16 Go de RAM
environ 83 Go libres au moment de l’installation
architecture x86_64
```

Comme le modèle IA tourne à distance via ILaaS, cette machine n’a pas besoin d’être puissante. Elle sert surtout à :

- héberger AnythingLLM ;
- stocker les documents ;
- conserver les index vectoriels ;
- gérer le chatbot ;
- faire le lien avec l’API ILaaS.

On n’installe donc pas de LLM localement : pas besoin de GPU, pas besoin de télécharger un modèle de plusieurs dizaines de Go.

---

## 6. Accès SSH depuis le Mac

Pour administrer le serveur plus facilement, l’accès se fait depuis le Mac en SSH.

Sur Ubuntu, les informations utiles ont été récupérées avec :

```bash
hostname -I && whoami && hostname
```

Puis, depuis le Mac :

```bash
ssh jean@192.168.1.171
```

L’idée est de pouvoir gérer le serveur depuis le terminal du Mac, sans travailler directement sur le PC Ubuntu.

---

## 7. Vérification de l’environnement

L’état du serveur a été vérifié avec :

```bash
df -h / && free -h && uname -m
```

Résultat :

```text
disque : 457 Go au total, 83 Go libres
RAM : 15 Go disponibles environ
architecture : x86_64
```

La machine était donc suffisamment dimensionnée pour faire tourner AnythingLLM.

---

## 8. Installation de Docker

AnythingLLM a été installé via Docker.

Docker n’était pas présent au départ. Il a été installé avec :

```bash
sudo apt install docker.io docker-compose-v2
```

Vérification :

```bash
docker --version
docker compose version
```

L’utilisateur `jean` a ensuite été ajouté au groupe Docker :

```bash
sudo usermod -aG docker $USER
```

Après déconnexion/reconnexion en SSH, Docker a été testé sans `sudo` :

```bash
docker ps
```

La table était vide, ce qui était normal : aucun conteneur n’était encore lancé.

---

## 9. Installation d’AnythingLLM avec Docker Compose

Un dossier dédié a été créé :

```bash
mkdir -p ~/anythingllm
cd ~/anythingllm
```

Puis un fichier `docker-compose.yml` a été créé pour lancer AnythingLLM sur le port 3001 et persister les données localement.

Configuration utilisée :

```yaml
services:
  anythingllm:
    image: mintplexlabs/anythingllm:latest
    container_name: anythingllm
    ports:
      - "3001:3001"
    cap_add:
      - SYS_ADMIN
    volumes:
      - ./storage:/app/server/storage
    environment:
      - STORAGE_DIR=/app/server/storage
    restart: unless-stopped
```

Le conteneur a été lancé avec :

```bash
docker compose up -d
```

Au premier lancement, le conteneur redémarrait en boucle à cause d’un problème d’accès à la base SQLite :

```text
SQLite database error
unable to open database file: ../storage/anythingllm.db
```

Le problème venait des droits du dossier `storage`.

Correction :

```bash
sudo chown -R jean:jean storage
chmod -R 777 storage
```

Puis relance :

```bash
docker compose up -d
```

Le conteneur est ensuite passé en état sain :

```text
Up ... (healthy)
```

AnythingLLM était accessible depuis le Mac à l’adresse :

```text
http://192.168.1.171:3001
```

---

## 10. Persistance des données

Les données d’AnythingLLM sont persistées dans :

```text
/home/jean/anythingllm/storage
```

Le dossier contient notamment :

```text
anythingllm.db
lancedb
vector-cache
models
comkey
push-notifications
```

Cela signifie que les workspaces, documents, paramètres et index vectoriels sont conservés sur le serveur.

Si le serveur Ubuntu redémarre, on ne perd donc pas tout.

Le conteneur est configuré avec :

```yaml
restart: unless-stopped
```

AnythingLLM redémarre donc automatiquement après un reboot du serveur, tant qu’il n’a pas été arrêté volontairement.

---

## 11. Configuration ILaaS dans AnythingLLM

Dans AnythingLLM, le fournisseur LLM a été configuré en mode :

```text
Generic OpenAI
```

Cela fonctionne parce qu’ILaaS expose une API compatible OpenAI.

Configuration utilisée :

```text
Base URL : https://llm.ilaas.fr/v1
API Key : clé API ILaaS
Chat Model Name : mistral-small-3.2-24b ou gpt-oss-120b selon les tests
```

Important : choisir un modèle dans AnythingLLM ne l’installe pas sur le serveur. Cela indique seulement quel modèle distant appeler via l’API ILaaS.

---

## 12. Création du workspace Learnix

Dans AnythingLLM, un workspace appelé **Learnix** a été créé.

Ce workspace est l’espace documentaire principal du démonstrateur.

Des documents pédagogiques ont ensuite été ajoutés :

- PDF ;
- DOCX ;
- articles de sciences de l’éducation ;
- documents sur l’évaluation ;
- documents sur l’alignement pédagogique ;
- documents sur les théories de l’apprentissage ;
- pages web scrapées.

Un dossier côté Ubuntu a aussi été créé :

```text
/home/jean/learnix-documents
```

Mais ce dossier sert seulement à ranger les fichiers originaux. Pour que les documents soient utilisables par Learnix, ils doivent être importés dans AnythingLLM et attachés au workspace.

Point important :

```text
copier un fichier dans /home/jean/learnix-documents
ne suffit pas à le rendre utilisable par Learnix
```

Il faut l’importer/indexer via l’interface AnythingLLM.

---

## 13. Importation et indexation des documents

Dans AnythingLLM, il y a une différence entre :

```text
avoir scrapé ou uploadé un document
et
l’avoir réellement importé/indexé dans le workspace
```

Pour que Learnix l’utilise en RAG, il faut que le document soit ajouté au workspace puis vectorisé.

Les logs Docker permettent de vérifier que l’indexation a fonctionné :

```bash
docker logs --tail=120 anythingllm
```

Lignes attendues :

```text
Snippets created from document
Embedded Chunk Group
Inserting vectorized chunks into LanceDB collection
Adding new vectorized document into namespace ...
workspace_documents_added
```

Cela confirme que :

- le document a été découpé ;
- les fragments ont été transformés en embeddings ;
- les vecteurs ont été insérés dans LanceDB ;
- le document est disponible pour le RAG.

AnythingLLM utilise ici :

```text
NativeEmbedder
Xenova/all-MiniLM-L6-v2
LanceDB
```

Le modèle de chat est donc distant via ILaaS, mais les embeddings peuvent être produits localement par AnythingLLM.

---

## 14. Scraping de sites web

AnythingLLM permet aussi de scraper des sites web. Cette fonctionnalité a été utilisée pour enrichir la base documentaire.

Point de vigilance : après scraping, il faut vérifier que les contenus web sont bien importés dans le workspace.

Sinon, Telegram ou le chat web ne retrouvent pas les informations.

Pour vérifier que le scraping a fonctionné, on peut :

- regarder dans l’interface Documents du workspace ;
- vérifier que les pages sont bien dans Learnix ;
- chercher dans les logs Docker ;
- poser une question très spécifique sur une information présente uniquement sur le site.

On peut aussi chercher dans le stockage avec `grep`, par exemple :

```bash
grep -Rni "mot très spécifique" ~/anythingllm/storage | head -20
```

Les fichiers `.json` créés par AnythingLLM ne sont pas inquiétants. Ils correspondent souvent aux documents transformés ou aux contenus web extraits. Il ne faut pas les supprimer manuellement.

---

## 15. Réglages RAG et comportement documentaire

L’objectif était que Learnix ne soit pas un chatbot généraliste, mais un assistant documentaire strict.

Au départ, il répondait à des questions hors corpus, par exemple :

```text
Qui a gagné la Coupe du monde 1998 ?
```

Il répondait :

```text
La France...
```

Ce comportement montrait qu’il utilisait encore les connaissances générales du modèle.

Les réglages ont donc été modifiés.

### Mode de chat

Le mode utilisé est :

```text
Mode : Requête
```

Ce mode est plus strict que le mode Chat, car il vise à répondre à partir des documents.

### Température

La température a été baissée :

```text
Température : 0 ou 0,1
```

Cela limite la créativité et favorise les réponses fidèles au contexte documentaire.

### Paramètres vectoriels

Réglages testés :

```text
Search Preference : Accuracy Optimized
Nombre maximum de contextes : 8
Seuil de similarité : Moyen ≥ .50
```

Avec un seuil trop bas, le système récupérait parfois des fragments peu pertinents, et le modèle complétait avec ses connaissances générales.

Avec un seuil moyen, il refuse mieux les questions hors corpus.

### Réponse de refus

Phrase de refus définie :

```text
Je ne trouve pas cette information dans les documents de Learnix.
```

Ainsi, si l’information n’est pas dans le corpus, Learnix doit refuser de répondre.

---

## 16. Prompt système de Learnix

Une invite système stricte a été rédigée pour cadrer le comportement de l’assistant.

Version recommandée :

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

---

## 17. Tests de fiabilité

Plusieurs types de tests ont été effectués.

### Test hors corpus

Question :

```text
Qui a gagné la Coupe du monde 1998 ?
```

Réponse attendue :

```text
Je ne trouve pas cette information dans les documents de Learnix.
```

Après réglage, Learnix a bien refusé.

Cela montre qu’il ne répond pas automatiquement à partir des connaissances générales du modèle.

### Test sur document précis

Test avec le document :

```text
basque_1999.pdf
```

Il s’agit d’un texte de Josianne Basque sur l’influence du béhaviorisme, du cognitivisme et du constructivisme sur le design pédagogique.

Learnix a produit une réponse sur l’évaluation constructiviste :

```text
Utiliser des tests dont le contenu est identifié par les étudiant·e·s...
Faire porter les évaluations sur les habiletés intellectuelles de haut niveau...
Évaluer le processus de construction des connaissances...
```

Cette réponse était fidèle au PDF, mais elle résumait seulement une sous-partie du document, notamment la section sur l’évaluation dans le constructivisme.

Diagnostic : le RAG avait récupéré un passage local très pertinent, mais pas une vision globale de tout le document.

Cela a permis de comprendre qu’une requête générale du type :

```text
Résume le document en 5 idées
```

peut produire une synthèse locale si les fragments récupérés ne couvrent qu’une partie du texte.

Pour obtenir une synthèse globale, il vaut mieux demander :

```text
Fais une synthèse globale du document en couvrant obligatoirement :
1. le béhaviorisme
2. le cognitivisme
3. le constructivisme
4. les effets sur le design pédagogique
5. la conclusion de l’autrice
```

---

## 18. Intégration Telegram

Learnix a ensuite été connecté à Telegram.

Principe :

```text
Telegram sur iPhone ou Mac
→ bot Telegram Learnix
→ AnythingLLM sur le serveur Ubuntu
→ workspace Learnix
→ documents indexés
→ API ILaaS
→ réponse dans Telegram
```

Important : Telegram n’héberge pas la clé ILaaS. La clé reste dans AnythingLLM, côté serveur Ubuntu.

Telegram sert seulement d’interface de discussion.

---

## 19. Sécurité du bot Telegram

Le bot a été configuré pour ne pas être ouvert à tout le monde.

Réglages importants :

```text
Restrict bot usage : activé
Allowed users : You
Allow Groups : désactivé
Group Privacy : désactivé
Group Admin Rights : 0/13
Channel Admin Rights : 0/13
```

Conclusion :

- le bot est réservé au compte Telegram autorisé ;
- il ne peut pas être ajouté dans des groupes ;
- il n’a pas de droits d’administration.

Il est donc utilisable depuis l’iPhone et depuis Telegram macOS, à condition d’utiliser le même compte Telegram.

---

## 20. Limite de Telegram

Les réponses dans Telegram sont moins lisibles que dans AnythingLLM.

C’est normal : l’interface web AnythingLLM rend bien les titres, listes, tableaux, sources et blocs Markdown.

Telegram supporte beaucoup moins bien le Markdown complexe.

Le prompt a donc été adapté pour produire des réponses plus simples :

- pas de tableaux ;
- pas de titres Markdown avec `#` ;
- pas de listes imbriquées ;
- pas de blocs de code ;
- puces simples ;
- paragraphes courts ;
- réponses limitées à 6 puces sauf demande contraire.

Conclusion :

```text
AnythingLLM web = usage confortable, réponses longues, consultation approfondie
Telegram = usage rapide, assistant de poche, réponses synthétiques
```

---

## 21. Usage actuel de Learnix

Aujour­d’hui, Learnix sert de démonstrateur personnel :

- assistant documentaire en ingénierie pédagogique ;
- base documentaire importée et maîtrisée ;
- consultable via interface web ;
- consultable via Telegram ;
- connecté à l’API ILaaS ;
- sans LLM installé localement ;
- hébergé sur un PC Ubuntu.

Il peut être utilisé pour :

- retrouver des idées dans des documents pédagogiques ;
- synthétiser des articles ou ressources ;
- préparer une réponse à un enseignant ;
- proposer des pistes d’accompagnement ;
- structurer des conseils pédagogiques ;
- mobiliser rapidement une base de connaissances.

Il ne doit pas être utilisé pour :

- traiter des données étudiantes nominatives ;
- analyser des copies d’étudiants ;
- manipuler des informations RH ;
- traiter des données sensibles ;
- répondre à des questions hors corpus.

---

## 22. Ce que Learnix démontre

### Faisabilité technique

Learnix montre qu’on peut connecter :

- un serveur local ;
- un outil RAG ;
- une clé API ILaaS ;
- une base documentaire ;
- une interface web ;
- une interface Telegram.

Tout cela fonctionne sans installer de modèle local.

### Pertinence pédagogique

Learnix rend une base documentaire plus facilement exploitable. Au lieu de chercher manuellement dans des PDF ou des notes, on peut interroger le corpus en langage naturel.

### Maîtrise documentaire

L’assistant peut être configuré pour répondre uniquement à partir des documents fournis, et refuser les questions hors corpus.

### Sobriété matérielle

Le serveur n’a pas besoin de GPU, car le calcul du modèle se fait côté ILaaS.

### Potentiel de passage à l’échelle

Le démonstrateur personnel peut servir de preuve d’usage pour demander ensuite une infrastructure institutionnelle.

---

## 23. Ce qu’il faudrait pour passer à l’échelle

Le démonstrateur fonctionne pour un usage personnel, mais une ouverture plus large nécessiterait une vraie infrastructure.

Il faudrait prévoir :

- un serveur institutionnel ;
- une clé API de service, pas une clé personnelle ;
- une authentification Centrale Lille ;
- une gestion des droits utilisateurs ;
- une gouvernance documentaire ;
- une politique de confidentialité ;
- une charte d’usage ;
- un suivi des usages ;
- des sauvegardes ;
- une maintenance DSI ;
- une procédure de mise à jour du corpus.

---

## 24. Deux scénarios institutionnels possibles

### Scénario 1 : assistant interne au Centre d’innovation pédagogique

C’est le scénario le plus raisonnable pour commencer.

Public :

- ingénieur pédagogique ;
- collègues du centre innovation pédagogique ;
- équipe restreinte.

Usages :

- préparer des réponses aux enseignants ;
- capitaliser l’expertise du service ;
- retrouver rapidement des références pédagogiques ;
- produire des premières versions de grilles, plans ou conseils ;
- faciliter la veille et la synthèse documentaire.

Avantages :

- risque limité ;
- corpus maîtrisé ;
- peu d’utilisateurs à accompagner ;
- qualité plus facile à contrôler ;
- phase pilote crédible.

### Scénario 2 : chatbot pour tous les enseignants

C’est plus ambitieux.

Public :

- enseignants ;
- enseignants-chercheurs ;
- vacataires ;
- responsables de formation.

Usages :

- questions pédagogiques de premier niveau ;
- aide à l’alignement pédagogique ;
- aide à la conception d’activités ;
- aide à l’évaluation ;
- orientation vers les ressources internes ;
- préparation d’un rendez-vous avec le centre d’innovation pédagogique.

Mais cela impose :

- SSO ;
- droits d’accès ;
- support utilisateur ;
- documentation ;
- monitoring ;
- gouvernance ;
- validation juridique/DSI ;
- cadrage RGPD.

Trajectoire recommandée :

```text
Phase 0 : démonstrateur personnel Learnix
Phase 1 : pilote interne CIP
Phase 2 : bêta avec enseignants volontaires
Phase 3 : service institutionnel plus large
```

---

## 25. Quel outil choisir pour la suite ?

### AnythingLLM

Très bon pour :

- prototype RAG ;
- assistant documentaire ;
- workspace pédagogique ;
- usage interne ;
- démonstrateur rapide.

C’est l’outil actuel de Learnix.

### Open WebUI

Potentiellement plus adapté pour :

- chat IA institutionnel ;
- interface multi-utilisateur ;
- accès à plusieurs modèles ;
- groupes et rôles ;
- expérience plus généraliste.

À étudier pour une ouverture large.

### LibreChat

Très intéressant pour :

- expérience proche de ChatGPT ;
- multi-modèles ;
- agents ;
- fichiers ;
- fonctionnalités avancées.

Mais probablement plus lourd à administrer.

Avis synthétique :

```text
Démonstrateur personnel : AnythingLLM
Pilote CIP : AnythingLLM ou Open WebUI
Service institutionnel enseignants : Open WebUI ou LibreChat à évaluer avec la DSI
```

---

## 26. Message de synthèse

> Learnix est un démonstrateur d’assistant documentaire en ingénierie pédagogique. Il repose sur AnythingLLM installé sur un serveur Ubuntu personnel, connecté à l’API ILaaS/Mistral via une clé API. Les documents pédagogiques sont importés, découpés, vectorisés et interrogés en RAG. L’assistant peut répondre via une interface web ou via un bot Telegram privé. Il a été configuré pour répondre uniquement à partir du corpus documentaire et refuser les questions hors périmètre. L’objectif n’est pas d’en faire immédiatement un service institutionnel, mais de démontrer la faisabilité et l’intérêt d’un futur assistant documentaire pour le Centre d’innovation pédagogique, puis éventuellement pour les enseignants.

---

## 27. Points forts à mettre en avant

- Le modèle n’est pas installé localement.
- La clé API reste côté serveur.
- Les documents sont maîtrisés.
- Le comportement peut être cadré.
- L’assistant peut refuser les questions hors corpus.
- L’outil fonctionne depuis le web et Telegram.
- Le système est léger techniquement.
- Le démonstrateur permet de tester des cas d’usage réels.

---

## 28. Points de vigilance

- La qualité dépend fortement du corpus.
- Le scraping doit être vérifié.
- Un document scrapé ou uploadé n’est utile que s’il est importé/indexé.
- Les requêtes trop générales peuvent produire des synthèses partielles.
- Telegram est pratique mais moins lisible que l’interface web.
- La clé personnelle ne doit pas servir à un service collectif.
- Pas de données sensibles dans le démonstrateur personnel.
- Le passage à l’échelle nécessite la DSI.

---

## 29. Prochaine étape logique

Pour rendre la démarche plus convaincante, il faudrait préparer :

1. une liste propre du corpus intégré ;
2. une grille de tests avec questions/réponses attendues ;
3. trois scénarios de démonstration ;
4. une note d’intention d’une page ;
5. une cartographie des risques ;
6. une proposition de pilote CIP.

Trois scénarios de démo possibles :

```text
1. Question hors corpus → Learnix refuse.
2. Question pédagogique simple → Learnix répond avec les documents.
3. Question complexe → Learnix propose un plan d’accompagnement.
```

C’est ce qui permet de passer de “j’ai bricolé un chatbot sympa” à “j’ai construit une preuve de concept argumentée pour un service pédagogique institutionnel”.