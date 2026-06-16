# Trajectoire institutionnelle

Learnix est aujourd'hui un démonstrateur personnel. Il peut servir de preuve d'usage pour discuter une trajectoire plus large.

## Phase 0 : démonstrateur personnel

Objectif : montrer la faisabilité.

- installation locale ;
- workspace documentaire ;
- API distante ou modèle local ;
- tests de refus ;
- bot privé ;
- documentation de la démarche.

## Phase 0 bis : extraction Moodle expérimentale

Objectif : tester en local et en privé si un Moodle expérimental peut devenir une source documentaire structurée pour Learnix.

Cette phase ne correspond pas à un passage à l'échelle. Elle sert à vérifier qu'il est possible d'extraire des contenus pédagogiques depuis Moodle, avec leur catégorie, leurs sous-catégories, leur cours, leur section et leur type d'activité, sans importer de données personnelles ni de traces d'apprentissage.

Principes :

- utiliser les web services Moodle plutôt qu'une lecture directe de la base SQL ;
- limiter l'extraction à des cours ou catégories explicitement choisis ;
- exclure par défaut notes, rendus étudiants, journaux, comptes et messages ;
- produire des documents lisibles hors Moodle ;
- produire un manifeste de corpus avec métadonnées ;
- valider humainement les documents avant import dans AnythingLLM ;
- conserver un rapport des contenus exclus.

Livrables attendus :

- script d'extraction local ;
- configuration des catégories ou cours à extraire ;
- dossier de documents Markdown ou fichiers convertis ;
- manifeste `manifest.yml` ;
- rapport d'exclusion ;
- procédure d'import dans AnythingLLM ;
- grille de test spécifique au corpus Moodle.

Voir la note dédiée : [Extraction Moodle expérimentale](moodle-extraction.md), le suivi du chantier dans [Avancement — Extraction Moodle vers Learnix](avancement-moodle.md) et le [playbook technique d'extraction Moodle](extraction-technique-moodle.md).

## Phase 1 : pilote interne CIP

Objectif : tester l'intérêt pour une équipe restreinte.

Public possible :

- ingénieurs pédagogiques ;
- équipe d'appui à la pédagogie ;
- quelques collègues impliqués dans la veille ou l'accompagnement.

Usages possibles :

- retrouver des références ;
- préparer des réponses aux enseignants ;
- capitaliser une base documentaire commune ;
- tester la qualité du corpus ;
- identifier les limites avant toute ouverture.

## Phase 2 : bêta enseignants volontaires

Objectif : tester des usages réels avec un public accompagné.

Conditions minimales :

- corpus stabilisé ;
- charte d'usage ;
- authentification ;
- support identifié ;
- collecte de retours ;
- évaluation des risques.

## Phase 3 : service institutionnel

Objectif : envisager un service plus large, uniquement si les phases précédentes justifient le passage à l'échelle.

Cette phase nécessite une infrastructure institutionnelle, une gouvernance documentaire, un cadrage RGPD, une maintenance et une validation DSI.
