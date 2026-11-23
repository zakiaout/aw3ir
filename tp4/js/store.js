// Gestion modulaire des contacts JSON sauvegardés dans localStorage.
const contactStore = (function () {
  const KEY = "contactList";
  let contactList = [];
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || "[]");
    contactList = Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.warn("Impossible de lire la liste enregistrée", error);
  }

  return {
    add: function (_name, _firstname, _date, _address, _mail) {
      const contact = {
        name: _name,
        firstname: _firstname,
        date: _date,
        adress: _address,
        mail: _mail
      };
      // Ne modifier la liste en mémoire qu'après une écriture réussie.
      const updated = [...contactList, contact];
      localStorage.setItem(KEY, JSON.stringify(updated));
      contactList = updated;
      return contactList;
    },
    getList: function () {
      return [...contactList];
    },
    reset: function () {
      localStorage.removeItem(KEY);
      contactList = [];
      return contactList;
    }
  };
})();
