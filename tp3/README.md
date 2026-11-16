# TP3 – Bootstrap et validation de formulaire en JavaScript

**Étudiante :** OUTLIOUA Zakia  
**Formation :** Master 2 M3IR – Parcours Réseaux  
**Établissement :** Université Sorbonne Paris Nord – Institut Galilée

## 1. Introduction

Ce troisième TP du module Applications Web consiste à créer un formulaire en utilisant le framework Bootstrap 5.1.3 et à gérer la validation des données saisies avec JavaScript.

Contrairement au TP2, qui utilise la validation native HTML5 et une seconde page pour afficher les résultats, ce TP repose sur une validation personnalisée en JavaScript et sur l'utilisation de fenêtres modales Bootstrap.

## 2. Objectifs du TP

- Découvrir et intégrer le framework Bootstrap.
- Créer un formulaire horizontal avec le système de grille Bootstrap.
- Intercepter la soumission d'un formulaire en JavaScript.
- Vérifier la validité des champs de saisie.
- Utiliser une expression régulière pour valider une adresse email.
- Manipuler les dates en JavaScript.
- Afficher dynamiquement des fenêtres modales.
- Générer un lien vers Google Maps.

## 3. Environnement de développement

| Technologie / Outil | Utilisation |
|---|---|
| Visual Studio Code | Éditeur de code |
| HTML5 | Structure du formulaire |
| Bootstrap 5.1.3 | Mise en forme et composants graphiques |
| JavaScript | Validation et manipulation du DOM |
| Google Chrome | Exécution et tests |
| GitHub | Hébergement du code source |

## 4. Structure du projet

```text
tp3/
├── index.html
├── README.md
├── css/
│   └── bootstrap.css
└── js/
    ├── bootstrap.bundle.js
    └── form-validation.js
```

- `index.html` : formulaire et structure de la fenêtre modale.
- `bootstrap.css` : feuille de style du framework Bootstrap.
- `bootstrap.bundle.js` : bibliothèque JavaScript de Bootstrap.
- `form-validation.js` : logique de validation et affichage des résultats.
- `README.md` : compte rendu du TP.

## 5. Réalisation du TP

### 5.1. Intégration de Bootstrap

La version 5.1.3 de Bootstrap a été téléchargée et intégrée localement dans le projet.

Les fichiers CSS et JavaScript sont importés dans la page HTML :

```html
<link rel="stylesheet" href="css/bootstrap.css">

<script src="js/bootstrap.bundle.js"></script>
<script src="js/form-validation.js"></script>
```

Cette intégration permet d'utiliser les composants Bootstrap sans écrire une feuille de style supplémentaire.

### 5.2. Création du formulaire

Le formulaire contient cinq champs :

- Nom.
- Prénom.
- Date de naissance.
- Adresse postale.
- Adresse email.

Le système de grille Bootstrap permet d'aligner horizontalement les labels et les champs de saisie.

Exemple pour le champ nom :

```html
<div class="row mb-3">
    <label for="name" class="col-sm-2 col-form-label">
        Nom
    </label>
    <div class="col-sm-10">
        <input type="text" class="form-control"
               id="name" name="name">
    </div>
</div>
```

Les principales classes Bootstrap utilisées sont :

| Classe | Fonction |
|---|---|
| `container` | Organiser le contenu de la page |
| `row` | Créer une ligne |
| `col-sm-2` | Occuper 2 colonnes sur 12 |
| `col-sm-10` | Occuper 10 colonnes sur 12 |
| `form-control` | Personnaliser les champs |
| `col-form-label` | Aligner les labels |
| `mb-3` | Ajouter une marge inférieure |
| `btn btn-primary` | Personnaliser le bouton de soumission |

L'attribut `novalidate` est utilisé pour désactiver la validation native du navigateur afin de gérer la validation en JavaScript.

```html
<form novalidate>
```

### 5.3. Interception de la soumission

Le traitement JavaScript est exécuté après le chargement de la page grâce à `window.onload`.

La soumission du formulaire est interceptée avec un écouteur d'événement :

```javascript
document.querySelector("form")
    .addEventListener("submit", function (event) {

        event.preventDefault();

    });
```

La méthode `preventDefault()` empêche la soumission automatique du formulaire et permet d'effectuer les vérifications avant d'afficher le résultat.

### 5.4. Validation des champs texte

Les champs nom, prénom et adresse postale doivent contenir au minimum cinq caractères.

Les valeurs sont récupérées avec `querySelector()` et la propriété `value`.

```javascript
const name = document.querySelector("#name").value.trim();
```

La méthode `trim()` supprime les espaces inutiles au début et à la fin de la chaîne.

Exemple de validation :

```javascript
if (name.length < 5) {
    showError("Le nom doit contenir au moins 5 caractères.");
    return;
}
```

L'instruction `return` permet d'interrompre le traitement lorsqu'une erreur est détectée.

### 5.5. Validation de l'adresse email

Une fonction `validateEmail()` utilisant une expression régulière a été implémentée.

La méthode `test()` permet de vérifier si l'adresse saisie respecte le format défini par cette expression régulière.

```javascript
if (!validateEmail(email)) {
    showError("L'adresse email est invalide.");
    return;
}
```

Cette vérification permet notamment de détecter les adresses sans arobase ou sans extension de domaine conforme à l'expression régulière.

### 5.6. Validation de la date de naissance

La date de naissance ne doit pas être vide ni située dans le futur.

La valeur saisie est convertie en objet `Date`, puis en timestamp afin de la comparer à la date actuelle.

```javascript
const birthdayDate = new Date(birthday);
const birthdayTimestamp = birthdayDate.getTime();
const nowTimestamp = Date.now();

if (birthday === "" || birthdayTimestamp > nowTimestamp) {
    showError("La date de naissance est invalide.");
    return;
}
```

Un timestamp représente ici le nombre de millisecondes écoulées depuis le 1er janvier 1970 à minuit UTC.

### 5.7. Création de la fenêtre modale Bootstrap

Une fenêtre modale a été intégrée dans le fichier `index.html`.

Elle est composée des éléments suivants :

- `modal` : conteneur principal.
- `modal-dialog` : structure de la fenêtre.
- `modal-content` : contenu de la fenêtre.
- `modal-header` : en-tête.
- `modal-title` : titre.
- `modal-body` : message affiché.
- `modal-footer` : zone contenant le bouton de fermeture.

La fenêtre modale est initialisée en JavaScript :

```javascript
const myModal = new bootstrap.Modal(
    document.getElementById("myModal")
);
```

### 5.8. Affichage des erreurs

Une fonction `showError()` a été créée pour centraliser l'affichage des messages d'erreur et éviter la répétition du code.

```javascript
function showError(message) {

    document.querySelector(".modal-title").textContent =
        "Erreur de validation";

    document.querySelector(".modal-body").textContent =
        message;

    myModal.show();
}
```

La propriété `textContent` permet de modifier le contenu textuel de la fenêtre modale.

La méthode `show()` permet de l'afficher.

### 5.9. Affichage du résultat valide

Lorsque tous les champs sont valides, la même fenêtre modale est utilisée pour afficher un message de confirmation personnalisé.

```javascript
document.querySelector(".modal-title").textContent =
    "Formulaire valide";

const modalBody = document.querySelector(".modal-body");

modalBody.textContent =
    `Bonjour ${firstname} ${name}, vous habitez à `;
```

Les Template Literals permettent d'intégrer directement les valeurs des variables dans une chaîne de caractères.

### 5.10. Génération du lien Google Maps

Un lien hypertexte est créé dynamiquement à partir de l'adresse postale saisie.

```javascript
const link = document.createElement("a");

link.textContent = address;

link.href =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

link.target = "_blank";
link.rel = "noopener noreferrer";

modalBody.appendChild(link);

myModal.show();
```

Les méthodes et propriétés utilisées sont :

- `createElement()` : crée un nouvel élément HTML.
- `textContent` : définit son contenu textuel.
- `href` : définit la destination du lien.
- `encodeURIComponent()` : encode les caractères spéciaux de l'adresse.
- `appendChild()` : ajoute l'élément créé dans le DOM.

Conformément aux dernières indications de l'énoncé, seule une adresse cliquable vers Google Maps est intégrée, sans image statique.

## 6. Architecture de l'application

```text
Formulaire HTML / Bootstrap
            |
            v
Interception de la soumission
            |
            v
Validation JavaScript
            |
      +-----+------+
      |            |
   Invalide      Valide
      |            |
      v            v
   Modale       Modale de
   d'erreur     confirmation
                   |
                   v
               Google Maps
```

L'ensemble du traitement est effectué côté client dans le navigateur, sans serveur applicatif ni base de données.

## 7. Tests fonctionnels

| Cas de test | Résultat attendu |
|---|---|
| Formulaire vide | Affichage d'une modale d'erreur |
| Nom inférieur à 5 caractères | Message d'erreur |
| Prénom inférieur à 5 caractères | Message d'erreur |
| Adresse inférieure à 5 caractères | Message d'erreur |
| Email invalide | Message d'erreur |
| Date de naissance future | Message d'erreur |
| Date de naissance vide | Message d'erreur |
| Tous les champs valides | Modale de confirmation |
| Clic sur l'adresse postale | Ouverture de Google Maps |
| Clic sur le bouton OK | Fermeture de la modale |

## 8. Comparaison entre le TP2 et le TP3

| Fonctionnalité | TP2 | TP3 |
|---|---|---|
| Design | CSS personnalisé | Bootstrap |
| Validation | HTML5 | JavaScript |
| Affichage du résultat | Page HTML secondaire | Fenêtre modale |
| Transmission des données | Méthode GET | Traitement direct dans la page |
| Validation email | Type HTML email | Expression régulière |
| Contrôle de la date future | Non implémenté | Implémenté |
| Manipulation du DOM | JavaScript | JavaScript |

## 9. Conclusion

Ce TP m'a permis de découvrir le framework Bootstrap et ses principaux composants graphiques, notamment le système de grille, les formulaires et les fenêtres modales.

J'ai également approfondi mes connaissances en JavaScript à travers la gestion des événements, les expressions régulières, la manipulation des dates et la modification dynamique du DOM.

L'application réalisée permet de vérifier les données saisies et d'afficher des messages adaptés à leur validité, tout en proposant une interface graphique uniforme grâce à Bootstrap.

## 10. Références techniques

- [Bootstrap 5.1 – Documentation](https://getbootstrap.com/docs/5.1/)
- [Bootstrap – Formulaires](https://getbootstrap.com/docs/5.1/forms/overview/)
- [Bootstrap – Modal](https://getbootstrap.com/docs/5.1/components/modal/)
- [MDN – JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- [Énoncé du TP3](https://github.com/bilelz/aw3ir.readme/blob/main/tp3/readme.md)