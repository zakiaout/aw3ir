# TP4 – HTML5 : géolocalisation, compteur de caractères et stockage local

**Étudiante :** OUTLIOUA Zakia  
**Formation :** Master 2 M3IR – Parcours Réseaux  
**Établissement :** Université Sorbonne Paris Nord – Institut Galilée

## 1. Introduction

Ce quatrième TP du module Applications Web consiste à enrichir le formulaire Bootstrap du TP3 avec plusieurs fonctionnalités HTML5 et JavaScript : la géolocalisation, le comptage des caractères saisis, l'enregistrement de contacts dans le navigateur et l'affichage de ces contacts dans un tableau.

L'application fonctionne côté client : elle ne nécessite ni serveur applicatif ni base de données distante.

## 2. Objectifs du TP

- Réutiliser le formulaire Bootstrap et sa validation JavaScript.
- Récupérer la position de l'utilisateur avec l'API Geolocation, après autorisation.
- Afficher la position sur une carte OpenStreetMap intégrée dans la page.
- Mettre à jour le nombre de caractères saisis dans chaque champ.
- Enregistrer les contacts en JSON dans `localStorage`.
- Afficher les contacts enregistrés dans un tableau HTML.
- Créer des liens cliquables vers Google Maps et la messagerie.
- Réinitialiser la liste des contacts avec un bouton Reset.

## 3. Environnement de développement

| Outil / Technologie | Utilisation |
|---|---|
| Visual Studio Code | Édition du code source |
| HTML5 | Structure du formulaire et du tableau |
| Bootstrap 5.1.3 | Mise en forme, grille, boutons et fenêtres modales |
| JavaScript | Gestion des événements et manipulation du DOM |
| Geolocation API | Récupération de la position géographique |
| OpenStreetMap | Affichage de la carte |
| JSON et localStorage | Enregistrement persistant des contacts dans le navigateur |
| Google Chrome | Exécution et débogage |
| GitHub Pages | Publication du site |

## 4. Structure du projet

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

- `index.html` : formulaire, bouton GPS, compteurs, tableau des contacts et fenêtre modale.
- `bootstrap.css` et `bootstrap.bundle.js` : fichiers locaux de Bootstrap 5.1.3.
- `gps.js` : récupération de la position et affichage de la carte OpenStreetMap.
- `store.js` : sauvegarde, lecture et suppression des contacts.
- `form-validation.js` : validation, affichage des messages, comptage des caractères et mise à jour du tableau.

## 5. Réalisation du TP

### 5.1. Réutilisation du formulaire Bootstrap

Le formulaire contient les cinq champs du TP3 : nom, prénom, date de naissance, adresse postale et email. Il conserve une présentation horizontale grâce à la grille Bootstrap.

Le formulaire utilise `novalidate` pour permettre à JavaScript de gérer la validation et les messages d'erreur :

```html
<form id="contact-form" class="bg-white shadow-sm rounded p-4" novalidate>
```

La validation impose au moins cinq caractères pour le nom, le prénom et l'adresse, vérifie le format de l'email et interdit une date de naissance vide, invalide ou future.

### 5.2. Intégration des scripts JavaScript

Les fichiers sont chargés depuis le dossier `js` :

```html
<script src="js/bootstrap.bundle.js" defer></script>
<script src="js/gps.js" defer></script>
<script src="js/store.js" defer></script>
<script src="js/form-validation.js" defer></script>
```

L'attribut `defer` permet d'exécuter les scripts après l'analyse du document HTML, dans leur ordre de chargement.

### 5.3. Géolocalisation HTML5

Un bouton GPS est ajouté à côté du champ Adresse postale :

```html
<button id="gps-btn" type="button" class="btn btn-outline-primary">📍 GPS</button>
<div id="map" class="mt-2" aria-live="polite"></div>
```

Dans `gps.js`, la fonction `getLocation()` demande une position au navigateur :

```javascript
navigator.geolocation.getCurrentPosition(showPosition, showGpsError, {
  enableHighAccuracy: false,
  timeout: 15000,
  maximumAge: 60000
});
```

Après autorisation, `showPosition()` lit les coordonnées avec `position.coords.latitude` et `position.coords.longitude`, construit une URL OpenStreetMap, puis insère une balise `<iframe>` dans `#map`.

La fonction `showGpsError()` affiche un message adapté si la permission est refusée, si la position est indisponible ou si la recherche dépasse le délai prévu.

**Remarque :** la géolocalisation dépend des autorisations du navigateur et d'un contexte sécurisé, par exemple `localhost` ou GitHub Pages en HTTPS. La position n'est pas enregistrée dans la liste des contacts.

### 5.4. Compteur de caractères en temps réel

Chaque champ appelle `calcNbChar()` lors de l'événement `input`. Exemple :

```html
<input id="name" name="name" type="text"
       class="form-control" oninput="calcNbChar(this.id)">
<div class="col-sm-1 counter" data-count="name">0 car.</div>
```

La fonction JavaScript actualise le compteur correspondant :

```javascript
function calcNbChar(id) {
  const input = document.getElementById(id);
  const counter = document.querySelector(`[data-count="${id}"]`);
  if (input && counter) counter.textContent = `${input.value.length} car.`;
}
```

L'événement `input` détecte notamment la saisie au clavier, le collage et la modification d'un champ de date. Pour la date, le compteur correspond à la longueur de sa valeur au format `YYYY-MM-DD`.

### 5.5. Enregistrement JSON avec localStorage

Le fichier `store.js` contient un objet `contactStore` chargé de gérer la liste des contacts. Chaque contact comporte les propriétés `name`, `firstname`, `date`, `adress` et `mail`.

L'enregistrement utilise `JSON.stringify()` :

```javascript
const updated = [...contactList, contact];
localStorage.setItem("contactList", JSON.stringify(updated));
```

Au chargement du script, les données sont relues avec `JSON.parse()` :

```javascript
const stored = JSON.parse(localStorage.getItem("contactList") || "[]");
```

`localStorage` conserve les données après actualisation de la page, dans le même navigateur et pour la même origine. Aucune donnée n'est envoyée à une base de données distante.

### 5.6. Validation et ajout d'un contact

Le fichier `form-validation.js` intercepte la soumission du formulaire :

```javascript
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();
  // Lecture des champs et contrôles de validation
});
```

Si une valeur ne respecte pas les contraintes, une fenêtre modale Bootstrap affiche un message d'erreur. Lorsque toutes les données sont valides, le contact est ajouté avec `contactStore.add(...)`, la liste affichée est actualisée et une modale de confirmation apparaît.

La date est notamment comparée à la date locale du jour au format `YYYY-MM-DD` afin de rejeter les dates futures.

### 5.7. Affichage des contacts dans un tableau HTML

Le tableau comporte les colonnes Nom, Prénom, Date de naissance, Adresse et Email :

```html
<table id="contacts-table" class="table table-striped table-bordered bg-white">
  <thead class="table-dark">
    <tr>
      <th>Nom</th><th>Prénom</th><th>Date de naissance</th>
      <th>Adresse (Maps)</th><th>Email</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
```

La fonction `displayContactList()` lit `contactStore.getList()` puis crée les lignes du tableau avec `document.createElement()` et `appendChild()`. La propriété `textContent` est utilisée pour afficher les valeurs saisies sans les interpréter comme du HTML.

L'adresse devient un lien vers Google Maps :

```javascript
mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.adress)}`;
```

L'email devient un lien de messagerie :

```javascript
mailLink.href = `mailto:${contact.mail}`;
```

Le tableau est également reconstruit au chargement de la page pour afficher les contacts déjà enregistrés.

### 5.8. Réinitialisation de la liste

Le bouton Reset permet de supprimer les contacts enregistrés :

```html
<button type="button" id="reset-btn" class="btn btn-outline-danger ms-2">Reset</button>
```

Dans `store.js`, la méthode de suppression utilise :

```javascript
localStorage.removeItem("contactList");
contactList = [];
```

Le gestionnaire de clic appelle ensuite `displayContactList()` afin de vider immédiatement le tableau, puis affiche une confirmation dans une fenêtre modale Bootstrap.

### 5.9. Fenêtres modales Bootstrap

Les mêmes composants modaux sont utilisés pour signaler les erreurs de validation, confirmer l'ajout d'un contact, indiquer un problème de stockage ou confirmer la suppression de la liste.

```javascript
const modal = new bootstrap.Modal(document.getElementById("myModal"));
```

La méthode `modal.show()` affiche la fenêtre après mise à jour de son titre et de son contenu.

## 6. Architecture de l'application

```text
index.html (formulaire Bootstrap)
          |
          +-- Clic GPS ----------> gps.js --> Geolocation API --> OpenStreetMap
          |
          +-- Saisie ------------> calcNbChar() --> compteurs
          |
          +-- Soumission --------> form-validation.js
          |                              |
          |                       validation des champs
          |                              |
          |                         contactStore.add()
          |                              |
          |                           store.js
          |                              |
          |                       JSON / localStorage
          |                              |
          +<---------------- displayContactList()
          |
          +-- Reset -------------> contactStore.reset() --> tableau vidé
```

Toutes ces opérations sont exécutées côté client. Seules la carte OpenStreetMap et les destinations des liens utilisent des services externes.

## 7. Tests fonctionnels à effectuer

| Test | Résultat attendu |
|---|---|
| Nom, prénom ou adresse de moins de 5 caractères | Modale d'erreur |
| Email de format incorrect | Modale d'erreur |
| Date de naissance vide ou future | Modale d'erreur |
| Saisie ou collage dans un champ | Compteur mis à jour |
| Clic sur GPS et autorisation accordée | Carte OpenStreetMap affichée |
| GPS refusé ou position indisponible | Message explicatif affiché |
| Ajout d'un contact valide | Nouvelle ligne dans le tableau et confirmation |
| Actualisation de la page | Contacts conservés et réaffichés |
| Clic sur une adresse | Ouverture de Google Maps |
| Clic sur un email | Ouverture du gestionnaire `mailto:` configuré |
| Clic sur Reset | Suppression des contacts et tableau vidé |

Ces résultats sont les comportements attendus du code. Le fonctionnement du GPS et des liens `mailto:` dépend également des autorisations et de la configuration du navigateur.

## 8. Difficultés et points d'attention

Le bouton GPS était initialement visible sans afficher de carte. Un test avec `alert()` a permis de vérifier que l'événement de clic fonctionnait. La suite du diagnostic porte sur les autorisations de géolocalisation et le contexte d'exécution, car un clic fonctionnel ne garantit pas l'accès à la position.

Le recours à `localStorage` évite de développer un Backend pour ce TP, mais les contacts restent enregistrés localement dans le navigateur. Pour les essais dans un dépôt public, il est préférable d'utiliser des données fictives.

## 9. Conclusion

Ce TP m'a permis d'approfondir la programmation Web côté client en ajoutant au formulaire Bootstrap du TP3 des fonctionnalités HTML5 et JavaScript.

J'ai mis en pratique l'API Geolocation, la mise à jour du DOM lors de la saisie, la sérialisation JSON, le stockage local persistant et la génération dynamique d'un tableau de contacts. J'ai également réutilisé les validations et les fenêtres modales Bootstrap.

Le projet constitue une petite application de gestion de contacts exécutée entièrement dans le navigateur, avec géolocalisation et stockage local.

## 10. Références techniques

- [Énoncé du TP4](https://github.com/bilelz/aw3ir.readme/tree/main/tp4)
- [Bootstrap 5.1 – Documentation](https://getbootstrap.com/docs/5.1/)
- [MDN – Geolocation API](https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API)
- [MDN – localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)
- [MDN – JSON](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [MDN – Événement input](https://developer.mozilla.org/fr/docs/Web/API/Element/input_event)
