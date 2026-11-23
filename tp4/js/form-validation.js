function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Mise à jour du compteur sur chaque modification (clavier, collage, date).
function calcNbChar(id) {
  const input = document.getElementById(id);
  const counter = document.querySelector(`[data-count="${id}"]`);
  if (input && counter) counter.textContent = `${input.value.length} car.`;
}

// Affichage du tableau sans injecter de HTML fourni par l'utilisateur.
function displayContactList() {
  const tbody = document.querySelector("#contacts-table tbody");
  tbody.replaceChildren();
  const contacts = contactStore.getList();

  for (const contact of contacts) {
    const row = document.createElement("tr");
    for (const value of [contact.name, contact.firstname, contact.date]) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    }

    const addressCell = document.createElement("td");
    const mapsLink = document.createElement("a");
    mapsLink.textContent = contact.adress;
    mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.adress)}`;
    mapsLink.target = "_blank";
    mapsLink.rel = "noopener noreferrer";
    addressCell.appendChild(mapsLink);
    row.appendChild(addressCell);

    const mailCell = document.createElement("td");
    const mailLink = document.createElement("a");
    mailLink.textContent = contact.mail;
    mailLink.href = `mailto:${contact.mail}`;
    mailCell.appendChild(mailLink);
    row.appendChild(mailCell);
    tbody.appendChild(row);
  }
  document.getElementById("empty-message").hidden = contacts.length > 0;
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = new bootstrap.Modal(document.getElementById("myModal"));

  function showMessage(title, message) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalBody").textContent = message;
    modal.show();
  }

  displayContactList();
  document.getElementById("gps-btn").addEventListener("click", getLocation);

  document.getElementById("reset-btn").addEventListener("click", function () {
    try {
      contactStore.reset();
      displayContactList();
      showMessage("Contacts supprimés", "La liste des contacts a été réinitialisée.");
    } catch (error) {
      showMessage("Erreur", "Impossible de supprimer les contacts du stockage local.");
    }
  });

  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const birthday = document.getElementById("birthday").value;
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name.length < 5) return showMessage("Erreur", "Le nom doit contenir au moins 5 caractères.");
    if (firstname.length < 5) return showMessage("Erreur", "Le prénom doit contenir au moins 5 caractères.");
    if (address.length < 5) return showMessage("Erreur", "L'adresse doit contenir au moins 5 caractères.");
    if (!validateEmail(email)) return showMessage("Erreur", "L'adresse email est invalide.");

    // Le format ISO YYYY-MM-DD permet une comparaison fiable sur les dates calendaires.
    const today = new Date();
    const localToday = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
    const parsed = new Date(`${birthday}T12:00:00`);
    if (!birthday || Number.isNaN(parsed.getTime()) || birthday > localToday || parsed.getFullYear() !== Number(birthday.slice(0, 4)) || parsed.getMonth() + 1 !== Number(birthday.slice(5, 7)) || parsed.getDate() !== Number(birthday.slice(8, 10))) {
      return showMessage("Erreur", "La date de naissance est invalide ou dans le futur.");
    }

    try {
      contactStore.add(name, firstname, birthday, address, email);
      displayContactList();
      showMessage("Contact ajouté", `Bravo ! Le contact ${firstname} ${name} a été sauvegardé.`);
      this.reset();
      for (const id of ["name", "firstname", "birthday", "address", "email"]) calcNbChar(id);
    } catch (error) {
      showMessage("Erreur de stockage", "Le navigateur n'a pas pu enregistrer le contact dans localStorage.");
    }
  });
});
