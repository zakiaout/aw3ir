# TP2 – HTML & JavaScript : Validation de formulaire et lecture des données

**Étudiante :** OUTLIOUA Zakia  
**Formation :** Master 2 M3IR – Parcours Réseaux  
**Établissement :** Université Sorbonne Paris Nord – Institut Galilée

## 1. Introduction

Ce deuxième TP du module Applications Web consiste à réaliser un formulaire HTML, à contrôler la validité des données saisies et à récupérer ces données dans une seconde page à l'aide de JavaScript.

L'objectif est de mettre en pratique la validation native des formulaires HTML5, les pseudo-classes CSS ainsi que la manipulation dynamique des éléments HTML avec JavaScript.

## 2. Objectifs du TP

- Créer un formulaire HTML avec des contraintes de saisie.
- Utiliser la validation intégrée à HTML5.
- Personnaliser l'apparence du formulaire avec CSS.
- Utiliser les pseudo-classes `:valid` et `:invalid`.
- Transmettre les données d'un formulaire avec la méthode GET.
- Extraire les paramètres d'une URL avec JavaScript.
- Manipuler les éléments du DOM.
- Générer dynamiquement des liens vers Google Maps et une messagerie électronique.

## 3. Environnement de développement

| Outil / Technologie | Utilisation |
|---|---|
| Visual Studio Code | Éditeur de code |
| HTML5 | Structure du formulaire et validation |
| CSS3 | Mise en forme et validation visuelle |
| JavaScript | Extraction et affichage des données |
| Google Chrome | Exécution et débogage |
| Git et GitHub | Gestion de versions et publication |

## 4. Structure du projet

```text
tp2/
├── index.html
├── style.css
├── action.html
├── action.js
└── README.md
```

- `index.html` : formulaire de saisie.
- `style.css` : feuille de style commune aux deux pages HTML.
- `action.html` : page d'affichage des résultats.
- `action.js` : traitement des données transmises par le formulaire.
- `README.md` : compte rendu du TP.

## 5. Réalisation du TP

### 5.1. Création du formulaire HTML

Le formulaire est créé dans le fichier `index.html`. Il transmet les données saisies vers la page `action.html` en utilisant la méthode GET.

```html
<form action="action.html" method="get">
```

Les cinq champs de saisie respectent les contraintes suivantes :

| Champ | Type | Attribut name | Minimum | Maximum |
|---|---|---|---|---|
| Nom | text | name | 2 | 20 |
| Prénom | text | firstname | 2 | 20 |
| Date de naissance | date | birthday | — | — |
| Adresse postale | text | address | 5 | 50 |
| Email | email | email | 5 | 30 |

Tous les champs sont obligatoires grâce à l'attribut `required`.

Chaque champ possède également un label associé et un symbole de validation.

Exemple pour le champ prénom :

```html
<p>
    <label for="firstname">Prénom :</label>
    <input type="text" id="firstname" name="firstname"
           minlength="2" maxlength="20" required>
    <span class="icon-ok">✔</span>
</p>
```

Les attributs `minlength` et `maxlength` permettent de contrôler la longueur des données saisies.

Le bouton de soumission est défini de la manière suivante :

```html
<input type="submit" value="Envoyer" class="btn-primary">
```

### 5.2. Validation du formulaire en HTML5

La validation des données est directement assurée par le navigateur, sans nécessiter de code JavaScript supplémentaire.

Les contraintes utilisées sont :

- `required` : rend la saisie obligatoire.
- `minlength` : impose un nombre minimum de caractères.
- `maxlength` : limite le nombre maximum de caractères.
- `type="email"` : vérifie la syntaxe de l'adresse électronique.
- `type="date"` : permet la sélection d'une date.

Lorsqu'un champ est invalide, le navigateur empêche la soumission du formulaire et affiche un message d'erreur.

### 5.3. Mise en forme du formulaire avec CSS

Une feuille de style externe `style.css` est créée et associée aux deux pages HTML.

```html
<link rel="stylesheet" href="style.css">
```

Le formulaire possède un fond blanc, des coins arrondis, un espacement intérieur et une ombre portée.

```css
form {
    background-color: white;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 2px 1px -1px #0003,
                0 1px 1px #00000024,
                0 1px 3px #0000001f;
}
```

Les labels et les champs de saisie sont alignés grâce aux propriétés suivantes :

```css
label {
    width: 150px;
    display: inline-block;
}

input {
    width: 250px;
    padding: 6px 12px;
    border-radius: 5px;
    border: 1px solid gray;
    font-size: 1em;
    box-sizing: border-box;
}
```

La propriété `box-sizing: border-box` permet d'inclure les bordures et le padding dans la largeur définie pour les champs.

La classe `btn-primary` permet de personnaliser le bouton de soumission et le lien de retour au formulaire.

```css
.btn-primary {
    border-radius: 5px;
    padding: 6px 12px;
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
}
```

### 5.4. Gestion visuelle des champs valides et invalides

Les pseudo-classes CSS `:valid` et `:invalid` permettent de modifier dynamiquement l'apparence du formulaire selon la validité des données saisies.

**Cas du formulaire non valide :**

```css
form:invalid input[type="submit"] {
    background-color: gray;
}
```

Le bouton Envoyer reste gris tant qu'au moins un champ est invalide. Il retrouve sa couleur bleue lorsque toutes les contraintes sont respectées.

**Cas d'un champ non valide :**

```css
input:invalid {
    border-color: red;
}

input:invalid + .icon-ok {
    display: none;
}
```

Les champs invalides possèdent une bordure rouge et leur symbole de validation est masqué.

**Cas d'un champ valide :**

```css
input:valid + .icon-ok {
    display: inline-block;
    color: green;
}
```

Lorsque le champ devient valide, une coche verte apparaît.

Le sélecteur CSS `+` permet de cibler l'élément frère situé immédiatement après le champ de saisie.

### 5.5. Création de la page de résultat

Le fichier `action.html` permet d'afficher les informations transmises par le formulaire.

Les éléments HTML possèdent des identifiants correspondant aux attributs `name` des champs de saisie.

```html
<p>
    Bonjour <span id="name"></span>
    <span id="firstname"></span>,
</p>

<p>
    Vous êtes né(e) le <span id="birthday"></span>
    et habitez à
    <a href="" id="address" target="_blank"></a>.
</p>

<p>
    Mail :
    <a href="" id="email"></a>
</p>
```

Le fichier JavaScript est intégré dans la page grâce à la balise suivante :

```html
<script type="text/javascript" src="action.js"></script>
```

Un lien permet également de revenir à la page du formulaire :

```html
<a href="index.html" class="btn-primary">
    ⬅️ Retour au formulaire
</a>
```

### 5.6. Transmission des données avec la méthode GET

Lors de la soumission du formulaire, les données sont transmises dans l'URL sous forme de couples clé-valeur.

Exemple :

```text
action.html?name=Dupont&firstname=Marie&birthday=2000-01-01&address=Paris&email=marie%40example.com
```

Les paramètres sont séparés par le caractère `&`, tandis que le caractère `=` permet d'associer chaque clé à sa valeur.

Le caractère `@` est encodé sous la forme `%40`.

La méthode GET rend les données visibles dans l'URL. Elle ne doit donc pas être utilisée pour transmettre des informations sensibles telles que des mots de passe.

### 5.7. Extraction des données avec JavaScript

Le traitement des données est réalisé dans le fichier `action.js`.

La propriété suivante permet de récupérer les paramètres présents dans l'URL :

```javascript
const paramsString = document.location.search;
```

L'objet `URLSearchParams` permet ensuite d'extraire les différents couples clé-valeur.

```javascript
const searchParams = new URLSearchParams(paramsString);
```

Une boucle `for...of` permet de parcourir les paramètres :

```javascript
for (const param of searchParams) {

    console.log(param);

    const elementId = param[0];
    const elementValue = param[1];

    const element = document.getElementById(elementId);

    if (element !== null) {
        element.textContent = elementValue;
    }
}
```

Pour chaque paramètre :

- `param[0]` représente la clé.
- `param[1]` représente la valeur.
- `document.getElementById()` recherche l'élément HTML correspondant.
- `textContent` modifie le contenu textuel de cet élément.
- `console.log()` permet de vérifier les données récupérées dans la console du navigateur.

La condition `element !== null` permet de vérifier l'existence de l'élément HTML avant de le modifier.

Le traitement complet est placé dans `window.onload` afin de garantir que la page est chargée avant la manipulation de ses éléments.

### 5.8. Génération dynamique du lien Google Maps

L'adresse postale saisie dans le formulaire est transformée en lien hypertexte vers Google Maps.

```javascript
if (elementId === "address") {
    element.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(elementValue)}`;
}
```

La propriété `href` permet de modifier dynamiquement la destination du lien.

La fonction `encodeURIComponent()` a également été utilisée pour encoder correctement les caractères spéciaux présents dans l'adresse postale.

### 5.9. Génération dynamique du lien de courriel

L'adresse électronique est transformée en lien utilisant le protocole `mailto:`.

```javascript
else if (elementId === "email") {
    element.href = `mailto:${elementValue}?subject=Hello!&body=What's up?`;
}
```

Ce lien permet d'ouvrir l'application de messagerie configurée avec les informations suivantes :

- Destinataire : adresse électronique saisie.
- Objet : Hello!
- Corps du message : What's up?

Les liens Google Maps et email sont construits grâce aux Template Literals de JavaScript, qui permettent d'insérer directement des variables dans une chaîne de caractères avec la syntaxe `${variable}`.

## 6. Architecture de l'application

Le fonctionnement de l'application peut être représenté de la manière suivante :

```text
index.html
    |
    | Saisie et validation HTML5
    |
    | Transmission des données via GET
    v
action.html
    |
    | Exécution de action.js
    |
    | Extraction des paramètres de l'URL
    | Manipulation du DOM
    | Génération des liens
    v
Affichage des résultats
```

L'ensemble du traitement est réalisé côté client, directement dans le navigateur.

Cette application ne nécessite ni Backend, ni API, ni base de données.

## 7. Tests et résultats

Plusieurs tests ont été réalisés durant le développement du TP.

| Test | Résultat attendu |
|---|---|
| Soumission avec des champs vides | Envoi bloqué par HTML5 |
| Saisie d'un nom trop court | Message de validation |
| Adresse email invalide | Envoi bloqué |
| Champ invalide | Bordure rouge et coche masquée |
| Champ valide | Apparition d'une coche verte |
| Formulaire invalide | Bouton gris |
| Formulaire valide | Bouton bleu |
| Soumission du formulaire | Transmission des données dans l'URL |
| Extraction JavaScript | Affichage des informations saisies |
| Clic sur l'adresse postale | Ouverture de Google Maps |
| Clic sur l'adresse email | Ouverture de la messagerie configurée |
| Clic sur le lien de retour | Redirection vers le formulaire |

Les différentes étapes ont permis de vérifier le fonctionnement du formulaire, de sa validation, de l'extraction des données et de la génération dynamique des liens.

## 8. Difficultés rencontrées et solutions

Deux difficultés principales ont été rencontrées durant la réalisation du TP :

**Chargement de la feuille de style CSS :**

Au départ, les modifications CSS n'apparaissaient pas dans le navigateur. La vérification de la référence vers `style.css`, de l'organisation des fichiers et de leur enregistrement a permis de résoudre le problème.

**Vérification du lien email :**

Le lien de courriel ne fonctionnait pas initialement. La console JavaScript a été utilisée pour vérifier les paramètres de l'URL et la valeur de l'attribut `href` :

```javascript
document.location.search

document.getElementById("email").href
```

Après avoir relancé le formulaire et vérifié la transmission des données, le lien a fonctionné correctement.

Ces difficultés m'ont permis de mieux comprendre l'utilisation des outils de développement du navigateur pour identifier et résoudre les problèmes.

## 9. Conclusion

Ce TP m'a permis d'approfondir mes connaissances en HTML5, CSS3 et JavaScript.

J'ai appris à créer et valider un formulaire, à personnaliser son apparence en fonction de la validité des champs, à transmettre des données avec la méthode GET et à les récupérer dynamiquement en JavaScript.

J'ai également mis en pratique la manipulation du DOM, l'utilisation de `URLSearchParams` et la génération dynamique de liens hypertextes.

Le résultat obtenu respecte les fonctionnalités demandées dans l'énoncé du TP et constitue une application Web fonctionnant entièrement côté client.

## 10. Références techniques

- [W3Schools – JavaScript](https://www.w3schools.com/js/)
- [MDN – Formulaires HTML](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form)
- [MDN – URLSearchParams](https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams)
- [MDN – Pseudo-classe :valid](https://developer.mozilla.org/fr/docs/Web/CSS/:valid)
- [MDN – Pseudo-classe :invalid](https://developer.mozilla.org/fr/docs/Web/CSS/:invalid)
