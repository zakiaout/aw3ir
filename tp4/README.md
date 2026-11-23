# TP4 – HTML5, GPS et stockage de contacts

TP Applications Web — Master 3IR, Université Sorbonne Paris Nord.

## Fonctionnalités

- Formulaire Bootstrap avec validation JavaScript : nom, prénom et adresse de 5 caractères minimum, email au bon format, date de naissance valide et non future.
- Géolocalisation HTML5 sur autorisation, affichage de la position dans une iframe OpenStreetMap.
- Compteur de caractères en temps réel pour chaque champ.
- Ajout des contacts à une liste JSON stockée dans `localStorage`.
- Affichage persistant des contacts dans un tableau, avec adresse Google Maps et email cliquables.
- Bouton Reset supprimant la liste et mettant immédiatement à jour le tableau.
- Fenêtres modales Bootstrap pour les erreurs et confirmations.

## Structure

```text
tp4/
├── index.html
├── README.md
├── css/
│   └── bootstrap.css
└── js/
    ├── bootstrap.bundle.js
    ├── gps.js
    ├── store.js
    └── form-validation.js
```

**Important :** Copier `bootstrap.css` et `bootstrap.bundle.js` (version **5.1.3**) depuis le TP3 dans les dossiers indiqués. Ces deux fichiers distribués par Bootstrap ne sont pas inclus dans cette archive de sources.

## Test

Ouvrir `index.html` avec Live Server dans VS Code pour bénéficier de `localhost`, ou tester la page publiée avec GitHub Pages en HTTPS. Autoriser la géolocalisation dans le navigateur pour tester le GPS. Ajouter un contact valide, actualiser pour vérifier qu'il reste affiché, puis tester Reset.

Les contacts restent uniquement dans le navigateur utilisé : aucune base de données distante n'est utilisée.

[Énoncé du professeur](https://github.com/bilelz/aw3ir.readme/tree/main/tp4)
