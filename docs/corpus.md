# Corpus documentaire

Le corpus est le cœur de Learnix. Sans corpus propre, l'assistant documentaire perd son intérêt.

## Principes

Un corpus Learnix doit être :

- limité dans un premier temps ;
- cohérent avec les usages visés ;
- composé de sources identifiées ;
- nettoyé autant que possible ;
- documenté ;
- testable ;
- actualisable.

## Types de documents

Le corpus peut contenir :

- ressources d'ingénierie pédagogique ;
- documents sur l'alignement pédagogique ;
- textes sur l'évaluation ;
- références sur les théories de l'apprentissage ;
- ressources sur l'innovation pédagogique ;
- documents de cadrage sur les usages de l'IA ;
- ressources institutionnelles ou professionnelles sélectionnées.

## Ce qui doit être documenté

Pour chaque document, il est utile de conserver :

- titre ;
- auteur ou organisme ;
- année ;
- type de document ;
- statut public ou privé ;
- licence ou condition de réutilisation ;
- thème principal ;
- raison de son inclusion ;
- date d'import dans AnythingLLM ;
- remarques sur la qualité d'extraction.

Un modèle de manifeste est proposé dans `fiches/corpus-manifest.example.yml`.

## Point important

Copier un fichier dans un dossier de stockage ne suffit pas. Pour que Learnix l'utilise, le document doit être importé dans AnythingLLM, attaché au workspace puis indexé.
