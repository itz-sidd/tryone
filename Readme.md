<!-- // Initialize Map with Default View
var map = L.map('map').setView([28.6139, 77.2090], 10); // Default: Delhi

// Define Tile Layers
var standardView = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var satelliteView = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri & OpenStreetMap contributors'
});

// Layer Control for Switching Views
var baseMaps = {
    "Standard View": standardView,
    "Satellite View": satelliteView
};

L.control.layers(baseMaps).addTo(map);

// Initialize Speech Recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.continuous = false;
recognition.interimResults = false;

document.getElementById("start-voice").addEventListener("click", () => {
    recognition.start();
    console.log("Voice recognition started...");
});

recognition.onresult = function(event) {
    let command = event.results[0][0].transcript.toLowerCase().trim();
    console.log("Recognized Command:", command);
    processVoiceCommand(command);
};

recognition.onerror = function(event) {
    console.error("Speech recognition error:", event.error);
    alert("Speech recognition error: " + event.error);
};

// Process Voice Commands
function processVoiceCommand(command) {
    if (command.includes("zoom in")) {
        map.zoomIn();
    } else if (command.includes("zoom out")) {
        map.zoomOut();
    } else if (command.startsWith("go to") || command.startsWith("zoom into")) {
        let location = command.replace(/go to|zoom into/, "").trim();
        if (location.length > 0) {
            console.log("Searching for:", location);
            geocodeLocation(location, true);
        } else {
            alert("Please say a city, town, or street name.");
        }
    } else if (command.startsWith("find hospitals near me")) {
        findNearbyHospitals();
    } else if (command.includes("reset map")) {
        resetMap();
    } else if (command.includes("where am i")) {
        getCurrentLocation();
    } else if (command.includes("satellite view")) {
        map.removeLayer(standardView);
        map.addLayer(satelliteView);
        console.log("Switched to Satellite View");
    } else if (command.includes("standard view")) {
        map.removeLayer(satelliteView);
        map.addLayer(standardView);
        console.log("Switched to Standard View");
    } else {
        alert("Unknown command: " + command);
    }
}

// Geocode and Zoom Function
function geocodeLocation(location, zoomIn = false) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            let { lat, lon, type } = data[0];
            console.log("Location found:", lat, lon);
            let zoomLevel = (type === "city" || type === "state") ? 12 : 15; // Cities zoom out more, streets zoom in
            if (zoomIn) zoomLevel = 17; // Force zoom in if explicitly requested
            map.setView([lat, lon], zoomLevel);
            L.marker([lat, lon]).addTo(map).bindPopup(`📍 ${location}`).openPopup();
        } else {
            alert("Location not found! Try another place.");
        }
    })
    .catch(error => {
        console.error("Geocoding Error:", error);
        alert("Error fetching location data.");
    });
}

// Find Nearby Hospitals (Using Overpass API)
function findNearbyHospitals() {
    let { lat, lng } = map.getCenter();
    let query = `[out:json];node(around:5000,${lat},${lng})["amenity"="hospital"];out;`;
    let apiUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.elements.length > 0) {
            data.elements.forEach((place, index) => {
                let { lat, lon, tags } = place;
                let name = tags.name || "Unnamed Hospital";
                console.log(`Found: ${name}`);
                L.marker([lat, lon]).addTo(map).bindPopup(`🏥 ${name}`).openPopup();
                if (index === 0) map.setView([lat, lon], 14); // Move to the first found hospital
            });
        } else {
            alert("No hospitals found near you.");
        }
    })
    .catch(error => {
        console.error("Find Hospital Error:", error);
        alert("Error searching for hospitals.");
    });
}

// Reset the map to the default view
function resetMap() {
    map.setView([28.6139, 77.2090], 10); // Reset to Delhi
    console.log("Map reset to default.");
}

// Get User's Current Location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            map.setView([lat, lon], 14);
            L.marker([lat, lon]).addTo(map).bindPopup("📍 You are here!").openPopup();
            console.log("User Location:", lat, lon);
        }, error => {
            alert("Geolocation error: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
} -->
