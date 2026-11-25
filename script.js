console.log("script is running");
const API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

const map = L.map("map").setView([20, 0], 2);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: "© OpenStreetMap" }).addTo(map);
let allQuakes = [];
const markers = L.layerGroup().addTo(map);
function showQuakes(quakes) {
    const list = document.getElementById("quake-list");
    list.innerHTML = "";
markers.clearLayers();

 quakes.forEach(function (quake) {
    const card = document.createElement("p");
    card.textContent = "M " + quake.properties.mag + " - " + quake.properties.place;
    list.appendChild(card);
    L.circleMarker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], { radius: Math.max(quake.properties.mag * 3, 2), color: "orange"}).addTo(markers);
 });
}

function applyFilters() {
  const text = document.getElementById("search").value.toLowerCase();
  const minMag = Number(document.getElementById("min-mag").value);
  
  const result = allQuakes.filter(function (quake) {
    const place = (quake.properties.place || "").toLowerCase();
    return place.includes(text) && quake.properties.mag >= minMag;
  });

  showQuakes(result);
}

async function loadEarthquakes() {
  const status = document.getElementById("status");

  try {
  
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();
    allQuakes = data.features;
    applyFilters();

    status.textContent = data.features.length + " earthquakes in the last 24 hours";
  } catch (error) {
    console.log("The real error is:", error);
    status.textContent = "Could not load earthquakes. Please try again later.";
  }
}
loadEarthquakes();
document.getElementById("search").addEventListener("input", applyFilters);
document.getElementById("min-mag").addEventListener("change", applyFilters);