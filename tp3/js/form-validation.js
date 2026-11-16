
// Fonction de validation de l'email
function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
}

window.onload = function () {

    console.log("DOM ready!");

    // Initialisation de la fenêtre modale
    const myModal = new bootstrap.Modal(
        document.getElementById("myModal")
    );

    // Fonction d'affichage des erreurs
    function showError(message) {

        document.querySelector(".modal-title").textContent =
            "Erreur de validation";

        document.querySelector(".modal-body").textContent =
            message;

        myModal.show();
    }

    // Interception de la soumission du formulaire
    document.querySelector("form")
        .addEventListener("submit", function (event) {

        event.preventDefault();

        // Récupération des valeurs saisies
        const name = document.querySelector("#name").value.trim();
        const firstname = document.querySelector("#firstname").value.trim();
        const address = document.querySelector("#address").value.trim();
        const email = document.querySelector("#email").value.trim();
        const birthday = document.querySelector("#birthday").value;

        // Conversion de la date en timestamp
        const birthdayDate = new Date(birthday);
        const birthdayTimestamp = birthdayDate.getTime();
        const nowTimestamp = Date.now();

        // Validation du nom
        if (name.length < 5) {
            showError("Le nom doit contenir au moins 5 caractères.");
            return;
        }

        // Validation du prénom
        if (firstname.length < 5) {
            showError("Le prénom doit contenir au moins 5 caractères.");
            return;
        }

        // Validation de l'adresse postale
        if (address.length < 5) {
            showError("L'adresse doit contenir au moins 5 caractères.");
            return;
        }

        // Validation de l'email
        if (!validateEmail(email)) {
            showError("L'adresse email est invalide.");
            return;
        }

        // Validation de la date de naissance
        if (birthday === "" || birthdayTimestamp > nowTimestamp) {
            showError("La date de naissance est invalide.");
            return;
        }

        // Tous les champs sont valides
        document.querySelector(".modal-title").textContent =
            "Formulaire valide";

        const modalBody = document.querySelector(".modal-body");

        modalBody.textContent =
            `Bonjour ${firstname} ${name}, vous habitez à `;

        // Création du lien Google Maps
        const link = document.createElement("a");

        link.textContent = address;

        link.href =
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

        link.target = "_blank";
        link.rel = "noopener noreferrer";

        modalBody.appendChild(link);

        // Affichage de la fenêtre modale
        myModal.show();

    });
};
