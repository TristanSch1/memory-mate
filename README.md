# Memory-Mate

Memory-Mate est une application web permettant la création de fiches de mémorisations (flashcards).

Fortement inspiré de [Anki](https://apps.ankiweb.net/), j'ai créé ce projet dans le but de prendre en compétence
sur les technologies suivantes :
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Trpc](https://trpc.io/)
- [Zod](https://zod.dev/)

## Principales fonctionnalités
En tant qu'utilisateur, je peux :
- Créer un compte (via github)
- Créer/Modifier/Supprimer des decks (regroupement de flashcards)
- Créer/Modifier/Supprimer des flashcards
- Réviser un deck
- Créer/Modifier/Supprimer des dossiers (regroupement de decks)
- Rechercher des decks
- Consulter les statistiques de révision d'un deck
- Consulter mes statistiques dans mon profil
- Changer la langue de l'application (Français/Anglais)

## Révision d'un deck
La révision des decks est basée sur le principe de répétition espacée. Après avoir revue une carte, l'utilisateur
doit indiquer via une note comprise entre 0 et 5, la difficulté de la restitution des informations de la carte.
- 0 : "black-out total", impossibilité de se souvenir de l'information.
- 1 : Réponse incorrecte, mais en voyant la bonne réponse, elle m'a semblé familière.
- 2 : Réponse incorrecte, mais après avoir vu la bonne réponse, elle semblait facile à retenir.
- 3 : Réponse correcte, mais nécessitant un effort important pour s'en souvenir.
- 4 : Réponse correcte, après quelques hésitations.
- 5 : réponse correcte avec un rappel parfait.  

En fonction de la note, la carte reviendra plus ou moins rapidement en révision.

[Algorithme SuperMemo 2](https://en.wikipedia.org/wiki/SuperMemo)

