// // Initialize Map with Default View
// var map = L.map('map').setView([28.6139, 77.2090], 10); // Default: Delhi

// // Define Tile Layers
// var standardView = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '© OpenStreetMap contributors'
// }).addTo(map);

// var satelliteView = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//     attribution: '© Esri & OpenStreetMap contributors'
// });

// // Add layers for view switching
// var baseMaps = {
//     "Standard View": standardView,
//     "Satellite View": satelliteView
// };

// L.control.layers(baseMaps).addTo(map);

// // Initialize Speech Recognition
// const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
// recognition.lang = 'en-US';
// recognition.continuous = false;
// recognition.interimResults = false;

// document.getElementById("start-voice").addEventListener("click", () => {
//     recognition.start();
//     console.log("Voice recognition started...");
// });

// recognition.onresult = function(event) {
//     let command = event.results[0][0].transcript.toLowerCase().trim();
//     console.log("Recognized Command:", command);
//     processVoiceCommand(command);
// };

// recognition.onerror = function(event) {
//     console.error("Speech recognition error:", event.error);
//     alert("Speech recognition error: " + event.error);
// };

// // Process Voice Commands
// function processVoiceCommand(command) {
//     if (command.includes("zoom in")) {
//         map.zoomIn();
//     } else if (command.includes("zoom out")) {
//         map.zoomOut();
//     } else if (command.startsWith("go to")) {
//         let location = command.replace("go to", "").trim();
//         geocodeLocation(location, true);
//     } else if (command.includes("zoom into")) {
//         let location = command.replace("zoom into", "").trim();
//         geocodeLocation(location, true, 17); // Force zoom level 17
//     } else if (command.startsWith("find hospitals near me")) {
//         findNearbyHospitals();
//     } else if (command.includes("street view")) {
//         enableStreetView();
//     } else if (command.includes("reset map")) {
//         resetMap();
//     } else if (command.includes("where am i")) {
//         getCurrentLocation();
//     } else if (command.includes("satellite view")) {
//         map.removeLayer(standardView);
//         map.addLayer(satelliteView);
//         console.log("Switched to Satellite View");
//     } else if (command.includes("standard view")) {
//         map.removeLayer(satelliteView);
//         map.addLayer(standardView);
//         console.log("Switched to Standard View");
//     } else {
//         alert("Unknown command: " + command);
//     }
// }

// // Geocode and Zoom Function
// function geocodeLocation(location, zoomIn = false, zoomLevel = 15) {
//     fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
//     .then(response => response.json())
//     .then(data => {
//         if (data.length > 0) {
//             let { lat, lon } = data[0];
//             console.log("Location found:", lat, lon);
//             map.setView([lat, lon], zoomIn ? zoomLevel : 12);
//             L.marker([lat, lon]).addTo(map).bindPopup(`📍 ${location}`).openPopup();
//             enableStreetView(lat, lon); // Automatically enable Street View
//         } else {
//             alert("Location not found! Try another place.");
//         }
//     })
//     .catch(error => {
//         console.error("Geocoding Error:", error);
//         alert("Error fetching location data.");
//     });
// }

// // Enable Street View (Google API)
// function enableStreetView(lat, lon) {
//     if (!lat || !lon) {
//         let center = map.getCenter();
//         lat = center.lat;
//         lon = center.lng;
//     }

//     let streetViewUrl = `https://www.google.com/maps/embed?pb=!4v1548873182278!6m8!1m7!1sCAoSLEFGMVFpcE1uMVNHRktHMWxyREwxMEJWV1pfVjNtZWYzdjdsa3pzNVlFcUVt!2m2!1d${lat}!2d${lon}!3f0!4f0!5f0.7820865974627469`;

//     let popupContent = `<iframe width="300" height="200" src="${streetViewUrl}" frameborder="0" allowfullscreen></iframe>`;
//     L.popup().setLatLng([lat, lon]).setContent(popupContent).openOn(map);

//     console.log(`Street View enabled at ${lat}, ${lon}`);
// }

// // Find Nearby Hospitals (Using Overpass API)
// function findNearbyHospitals() {
//     let { lat, lng } = map.getCenter();
//     let query = `[out:json];node(around:5000,${lat},${lng})["amenity"="hospital"];out;`;
//     let apiUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

//     fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//         if (data.elements.length > 0) {
//             data.elements.forEach((place, index) => {
//                 let { lat, lon, tags } = place;
//                 let name = tags.name || "Unnamed Hospital";
//                 console.log(`Found: ${name}`);
//                 L.marker([lat, lon]).addTo(map).bindPopup(`🏥 ${name}`).openPopup();
//                 if (index === 0) map.setView([lat, lon], 14); // Move to the first found hospital
//             });
//         } else {
//             alert("No hospitals found near you.");
//         }
//     })
//     .catch(error => {
//         console.error("Find Hospital Error:", error);
//         alert("Error searching for hospitals.");
//     });
// }

// // Reset the map to the default view
// function resetMap() {
//     map.setView([28.6139, 77.2090], 10); // Reset to Delhi
//     console.log("Map reset to default.");
// }

// // Get User's Current Location
// function getCurrentLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             let lat = position.coords.latitude;
//             let lon = position.coords.longitude;
//             map.setView([lat, lon], 14);
//             L.marker([lat, lon]).addTo(map).bindPopup("📍 You are here!").openPopup();
//             console.log("User Location:", lat, lon);
//         }, error => {
//             alert("Geolocation error: " + error.message);
//         });
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }
// Initialize Leaflet Map
var map = L.map('map').setView([28.6139, 77.2090], 10); // Default to Delhi

// Define Tile Layers
var standardView = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var satelliteView = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri & OpenStreetMap contributors'
});

// Add View Switching
L.control.layers({ "Standard View": standardView, "Satellite View": satelliteView }).addTo(map);

// Speech Recognition Setup
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

// Handle Voice Commands
function processVoiceCommand(command) {
    if (command.includes("zoom in")) {
        map.zoomIn();
    } else if (command.includes("zoom out")) {
        map.zoomOut();
    } else if (command.startsWith("go to")) {
        let location = command.replace("go to", "").trim();
        geocodeLocation(location, true);
    } else if (command.includes("zoom into")) {
        let location = command.replace("zoom into", "").trim();
        geocodeLocation(location, true, 17);
    } else if (command.startsWith("find hospitals near me")) {
        findNearbyHospitals();
    } else if (command.includes("street view")) {
        enableStreetView();
    } else if (command.includes("reset map")) {
        resetMap();
    } else if (command.includes("where am i")) {
        getCurrentLocation();
    } else if (command.includes("satellite view")) {
        map.removeLayer(standardView);
        map.addLayer(satelliteView);
    } else if (command.includes("standard view")) {
        map.removeLayer(satelliteView);
        map.addLayer(standardView);
    } else if (command.includes("show traffic")) {
        enableTrafficLayer();
    } else if (command.includes("show metro routes")) {
        enableMetroLayer();
    } else {
        alert("Unknown command: " + command);
    }
}

// Geocode Location & Move Map
function geocodeLocation(location, zoomIn = false, zoomLevel = 15) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            let { lat, lon } = data[0];
            map.setView([lat, lon], zoomIn ? zoomLevel : 12);
            L.marker([lat, lon]).addTo(map).bindPopup(`📍 ${location}`).openPopup();
            enableStreetView(lat, lon);
        } else {
            alert("Location not found! Try another place.");
        }
    })
    .catch(error => {
        alert("Error fetching location data.");
    });
}

// Enable Google Street View
function enableStreetView(lat, lon) {
    if (!lat || !lon) {
        let center = map.getCenter();
        lat = center.lat;
        lon = center.lng;
    }

    let streetViewUrl = `https://www.google.com/maps/embed?pb=!4v1548873182278!6m8!1m7!1sCAoSLEFGMVFpcE1uMVNHRktHMWxyREwxMEJWV1pfVjNtZWYzdjdsa3pzNVlFcUVt!2m2!1d${lat}!2d${lon}!3f0!4f0!5f0.7820865974627469`;

    let popupContent = `<iframe width="400" height="300" src="${streetViewUrl}" frameborder="0" allowfullscreen></iframe>`;
    L.popup().setLatLng([lat, lon]).setContent(popupContent).openOn(map);
}

// Find Nearby Hospitals
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
                L.marker([lat, lon]).addTo(map).bindPopup(`🏥 ${name}`).openPopup();
                if (index === 0) map.setView([lat, lon], 14);
            });
        } else {
            alert("No hospitals found near you.");
        }
    })
    .catch(error => {
        alert("Error searching for hospitals.");
    });
}

// Reset the Map
function resetMap() {
    map.setView([28.6139, 77.2090], 10);
}

// Get User Location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            map.setView([lat, lon], 14);
            L.marker([lat, lon]).addTo(map).bindPopup("📍 You are here!").openPopup();
        }, error => {
            alert("Geolocation error: " + error.message);
        });
    } else {
        alert("Geolocation is not supported.");
    }
}

// Enable Live Traffic Layer
function enableTrafficLayer() {
    let center = map.getCenter();
    let trafficUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY
                      &center=${center.lat},${center.lng}&zoom=12&maptype=roadmap&layer=traffic`;

    let popupContent = `<iframe width="400" height="300" src="${trafficUrl}" frameborder="0" allowfullscreen></iframe>`;
    L.popup().setLatLng([center.lat, center.lng]).setContent(popupContent).openOn(map);
}

// Enable Metro Route Tracking
function enableMetroLayer() {
    let center = map.getCenter();
    let metroUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY
                    &origin=${center.lat},${center.lng}&destination=nearest-metro&mode=transit`;

    let popupContent = `<iframe width="400" height="300" src="${metroUrl}" frameborder="0" allowfullscreen></iframe>`;
    L.popup().setLatLng([center.lat, center.lng]).setContent(popupContent).openOn(map);
}

