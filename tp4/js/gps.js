// Géolocalisation HTML5 et carte OpenStreetMap.
function getLocation() {
  const map = document.getElementById("map");
  if (!navigator.geolocation) {
    map.textContent = "La géolocalisation n'est pas prise en charge par ce navigateur.";
    return;
  }
  map.textContent = "Recherche de votre position…";
  navigator.geolocation.getCurrentPosition(showPosition, showGpsError, {
    enableHighAccuracy: false,
    timeout: 15000,
    maximumAge: 60000
  });
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const delta = 0.02;
  const bbox = [longitude - delta, latitude - delta,
                longitude + delta, latitude + delta].join(",");
  const url = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.title = "Carte OpenStreetMap centrée sur votre position";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer";
  document.getElementById("map").replaceChildren(iframe);
}

function showGpsError(error) {
  const messages = {
    1: "Accès à la position refusé. Vérifiez les autorisations du navigateur.",
    2: "La position est indisponible.",
    3: "Délai de géolocalisation dépassé."
  };
  document.getElementById("map").textContent =
    messages[error.code] || "Impossible de récupérer votre position.";
}
