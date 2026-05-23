# Telegram

Telegram est utilisé comme interface privée pour interroger Learnix rapidement depuis un téléphone ou un ordinateur.

Le bot Telegram ne contient pas la clé API et n'héberge pas les documents. Il sert seulement de point d'entrée conversationnel :

```text
Telegram
→ bot privé
→ AnythingLLM
→ workspace Learnix
→ corpus indexé
→ modèle via API ou modèle local
→ réponse dans Telegram
```

## Pourquoi Telegram ?

Telegram a été retenu pour le démonstrateur personnel parce qu'il permet :

- d'interroger Learnix depuis un téléphone ;
- de tester un usage “assistant de poche” ;
- de vérifier la lisibilité des réponses courtes ;
- de garder le chatbot privé ;
- de ne pas exposer directement l'interface AnythingLLM ;
- de montrer qu'un même workspace peut être interrogé par plusieurs interfaces.

Ce choix est adapté à une preuve de concept personnelle. Il ne suffit pas pour ouvrir un service institutionnel.

## Configuration du bot

Étapes de configuration :

1. Créer un bot Telegram avec `BotFather`.
2. Récupérer le token du bot.
3. Renseigner le token dans l'intégration Telegram d'AnythingLLM.
4. Scanner le QR code affiché par AnythingLLM pour l'appairage Telegram.
5. Associer le bot au workspace `Learnix`.
6. Activer la restriction d'usage du bot.
7. Autoriser uniquement le compte Telegram personnel.
8. Désactiver l'usage en groupes.
9. Éviter tout droit d'administration inutile.

## Réglages de sécurité

Réglages attendus pour un démonstrateur privé :

- usage du bot restreint ;
- utilisateur autorisé limité au compte personnel ;
- groupes désactivés ;
- aucun droit d'administration ;
- pas de données étudiantes nominatives ;
- pas de données sensibles ;
- pas de diffusion publique du bot.

## Limites de Telegram

Telegram est pratique, mais moins lisible que l'interface web AnythingLLM.

Pour cette raison, l'invite Learnix demande :

- du texte simple ;
- des paragraphes courts ;
- des listes à puces simples ;
- pas de tableaux ;
- pas de titres Markdown avec `#` ;
- pas de listes imbriquées ;
- pas de blocs de code sauf demande explicite ;
- des réponses courtes sauf demande contraire.

## Point de vigilance

Le bot Telegram actuel est une interface personnelle. Pour un pilote institutionnel, il faudrait réexaminer l'interface, l'authentification, la confidentialité, le support et la gouvernance.
