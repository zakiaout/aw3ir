
window.onload = () => {

    // Récupérer les données envoyées dans l'URL
    const paramsString = document.location.search;

    // Extraire les paramètres de l'URL
    const searchParams = new URLSearchParams(paramsString);

    // Parcourir les paramètres
    for (const param of searchParams) {

        console.log(param);

        const elementId = param[0];
        const elementValue = param[1];

        // Rechercher l'élément HTML correspondant
        const element = document.getElementById(elementId);

        if (element !== null) {

            // Afficher la valeur dans la page HTML
            element.textContent = elementValue;

            // Créer le lien Google Maps
            if (elementId === "address") {
                element.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(elementValue)}`;
            }

            // Créer le lien de courriel
            else if (elementId === "email") {
                element.href = `mailto:${elementValue}?subject=Hello!&body=What's up?`;
            }
        }
    }
};
