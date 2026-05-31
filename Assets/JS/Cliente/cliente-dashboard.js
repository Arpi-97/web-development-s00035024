/* JS per la gestione delle prenotazioni */

// Inizializzazione variabili
const newBookingBtn  = document.getElementById("new-booking-btn");
const bookingDialog  = document.getElementById("booking-dialog");
const closeDialogBtn = document.getElementById("close-dialog-btn");
const bookingForm    = document.getElementById("booking-form");
const bookingsList   = document.getElementById("bookings-list");
const weatherStatus  = document.getElementById("weather-status");
const weatherLocation = document.getElementById("weather-location");
const weatherIcon = document.getElementById("weather-icon");

// Creazione array di prenotazioni di default demo già presenti
const defaultBookings = [
    {
        ownerUsername: "cliente",
        ownerMail: "cliente@cliente.it",
        date: "2026-05-18",
        time: "20:30",
        guests: "4",
        extraRequests: "No prodotti contenenti lattosio",
        status: "Confermata",
        adminNote: "Nessuna"
    },
    {
        ownerUsername: "cliente",
        ownerMail: "cliente@cliente.it",
        date: "2026-05-25",
        time: "21:00",
        guests: "2",
        extraRequests: "Un lume di candela ed una rosa rossa",
        status: "In attesa",
        adminNote: "Nessuna"
    }
];

// Ritorno utente loggato
const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
// Check di sicurezza se l'utente ha eseguito il login o meno
if(!loggedUser) {
    alert("Non sei loggato. Effettua il login per accedere alla tua dashboard.");
    window.location.href = "../../../index.html";
}
// Array di prenotazioni. SOLO per l'utente demo ci saranno valori iniziali
let allBookings = JSON.parse(sessionStorage.getItem("clientBookings")) || defaultBookings;

newBookingBtn.addEventListener("click", () => {
    bookingDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
    bookingDialog.close();
});

// Funzione asincrona con richiamo alle API di OpenWeatherMap
async function loadWeather() {
    const apiKey = "4e69bc2cf08a9abc92c73ee83c5f4f00";
    const latitude = "45.624062";
    const longitude = "12.324007";
    
    const OpenWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=it`;

    try {
        const response = await fetch(OpenWeatherUrl);

        // Gestione errore
        if (!response.ok) {
            throw new Error("Errore nel recupero del meteo");
        }

    const data = await response.json();

    const weatherLocationName = data.name;
    const weatherTemperature = Math.round(data.main.temp);
    const weatherDescription = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    const weatherIconCode = data.weather[0].icon;
    const weatherHumidity = data.main.humidity;

    // Icone descrizione meteo
    const weatherIconURL = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

    // Valorizzazione del HTML con i dati ottenuti dalla API
    weatherLocation.textContent = weatherLocationName;
    weatherStatus.innerHTML = `
        Temperatura: ${weatherTemperature}°C, 
        Condizioni meteo: ${weatherDescription} <img src="${weatherIconURL}" alt="${weatherDescription}" style="vertical-align: middle; display: inline-block; width: 35px; margin-top: -4px;">, 
        Umidità: ${weatherHumidity}%`;
    // Cattura dell'errore con sua stampa su console.log
    } catch (error) {
        weatherStatus.textContent = "Impossibile caricare il meteo in questo momento.";
        console.log(error);
    }

}

// Funzione per formattazione data in italiano (DD-MM-YYYY)
function formatDataITA(date) {
    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString("it-IT", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });
}

// Classe per colorare una piccola banda vicina alla prenotazioni
function getStatusClass(status) {
    if (status === "In attesa") {
        return "pending";
    }
    if (status === "Confermata") {
        return "confirmed";
    }
    if (status === "Rifiutata") {
        return "rejected";
    }
    return "";
}

// Funzione per la visualizzazione delle prenotazioni, con annesso inserimento (richiamato nel redner totale)
function renderBookingCard(booking, index) {
    const article = document.createElement("article");
    article.classList.add("booking-card");

    const status = getStatusClass(booking.status);
    if (status) {
        article.classList.add(status);
    }

    article.innerHTML = `
        <h3>Prenotazione #${index + 1}</h3>
        <p>Data: ${formatDataITA(booking.date)}</p>
        <p>Ora: ${booking.time}</p>
        <p>Persone: ${booking.guests}</p>
        <p>Richieste aggiuntive: ${booking.extraRequests || "Nessuna"}</p>
        <p>Stato: ${booking.status}</p>
        <p>Nota del ristorante: ${booking.adminNote || "Nessuna"}</p>
    `;

    bookingsList.appendChild(article);
}

// Puro rendering delle prenotazioni per l'utente loggato
function renderAllBookings() {
    bookingsList.innerHTML = "";

    // Nuovo array con le prenotazioni SOLO dell'utente attualmente loggato
    const userBookings = allBookings.filter(booking => booking.ownerUsername === loggedUser.username);

    // Visualizzazione delle prenotazioni dell'utente, scorrendo la singola prenotazione
    userBookings.forEach((booking, index) => {
        renderBookingCard(booking, index);
    });
}

// Aggiunta prenotazioni da form dentro modale
bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const date = document.getElementById("booking-date").value;
    const time = document.getElementById("booking-time").value;
    const guests = document.getElementById("booking-guests").value;
    const extraRequests = document.getElementById("extra-requests").value.trim();

    // Comprazione di data ed ora per non permettere creazione di prenotazioni passate
    const bookingDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    if (bookingDateTime <= now) {
        alert("La data e l'ora inserite non possono essere in passato.");
        return;
    }

    allBookings.push({
        ownerUsername: loggedUser.username,
        ownerMail: loggedUser.email,
        date,
        time,
        guests,
        extraRequests,
        status: "In attesa"
    });

    // Salvataggio prenotazioni in modo persistente. Verranno poi viste dalla dashboard del ristoratore
    sessionStorage.setItem("clientBookings", JSON.stringify(allBookings));

    renderAllBookings();
    bookingForm.reset();
    bookingDialog.close();
});

loadWeather(); // Caricamento meteo
renderAllBookings(); // Rendrizzazione iniziale