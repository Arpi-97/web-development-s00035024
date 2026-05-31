/* JS per la dashboard del ristoratore */

const receivedBookingList = document.getElementById("received-booking-list");

const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

// Check di sicurezza sia su presenza di login effettuata che ruolo dell'utente
if(!loggedUser) {
    alert("Nessun utente loggato. Effettua nuovamente il login dalla pagina apposita.");
    window.location.href = "../../../index.html";
}

if(loggedUser.role !== "admin") {
    alert("Non sei un ristoratore. Effettua nuovamente il login dalla pagina apposita.");
    window.location.href = "../../../index.html";
}

// Prenotazioni demo di fallback se assenza di prentoazioni aggiuntive
const defaultBookings = [
    {
        ownerUsername: "cliente",
        ownerEmail: "cliente@cliente.it",
        date: "2026-05-18",
        time: "20:30",
        guests: "4",
        extraRequests: "No prodotti contenenti lattosio",
        status: "Confermata",
        adminNote: ""
    },
    {
        ownerUsername: "cliente",
        ownerEmail: "cliente@cliente.it",
        date: "2026-05-25",
        time: "21:00",
        guests: "2",
        extraRequests: "Un lume di candela ed una rosa rossa",
        status: "In attesa",
        adminNote: ""
    }
];

let allBookings = JSON.parse(sessionStorage.getItem("clientBookings")) || defaultBookings;

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

// Render di singola prenotazione
function renderBookingCard(booking, index) {
    const article = document.createElement("article");
    article.classList.add("booking-card");

    const status = getStatusClass(booking.status);
    article.classList.add(status);
    if (status) {
        article.classList.add(status);
    }

    // Bottoni di accettazione o rifiuto prenotazione
    let bookingButtonsHTML = "";
    if(booking.status === "In attesa") {
        bookingButtonsHTML = `
            <button type="button" class="accept-booking-btn">Accetta</button>
            <button type="button" class="reject-booking-btn">Rifiuta</button>
        `;
    }

    article.innerHTML = `
        <h3>Prenotazione #${index + 1}</h3>
        <p>Utente: ${booking.ownerUsername}</p>
        <p>Data: ${formatDataITA(booking.date)}</p>
        <p>Ora: ${booking.time}</p>
        <p>Persone: ${booking.guests}</p>
        <p>Richieste aggiuntive: ${booking.extraRequests || "Nessuna"}</p>
        <p>Stato: ${booking.status}</p>
        <p>Nota del ristorante: ${booking.adminNote || "Nessuna"}</p>
        
        ${bookingButtonsHTML} <!-- Innesto dei bottoni SOLO se lo stato è "In attesa" -->

        <dialog id="booking-modal-${index}">
            <h3>Aggiungi nota per la prenotazione #${index + 1}</h3>
            <form class="note-form">
                <label for="note-textarea-${index}">Aggiungi una nota</label>
                <textarea id="note-textarea-${index}" name="note-textarea" cols="50" rows="9" required></textarea>
                <section class="dialog-actions">
                    <button type="button" class="close-dialog-btn">Annulla</button>
                    <button type="submit">Conferma</button>
                </section>
            </form>
        </dialog>
    `;

    // Ottenimento variabili innestate
    const acceptBtn = article.querySelector(".accept-booking-btn");
    const rejectBtn = article.querySelector(".reject-booking-btn");
    const bookingModal = article.querySelector(`#booking-modal-${index}`);
    const closeDialogBtn = bookingModal.querySelector(".close-dialog-btn");
    const noteForm = bookingModal.querySelector(".note-form");
    const noteInput = noteForm.querySelector(`#note-textarea-${index}`);

    // Se esistono i bottoni, allora i loro eventi sono eseguiti
    if (acceptBtn && rejectBtn) {
        acceptBtn.addEventListener("click", () => {
            alert("Prenotazione confermata con successo. Ora sara visibile anche al cliente con l'indicazione della conferma della prenotazione.");
            allBookings[index].status = "Confermata"; // Imposto lo stato come "Confermata" solo alla prenotazione cliccata
            sessionStorage.setItem("clientBookings", JSON.stringify(allBookings));
            renderAllBookings();
        });

    // Rifiuto prenotazione
        rejectBtn.addEventListener("click", () => {
            bookingModal.showModal();
        });
    }

    // Bottone per semplice chiusura di modale
    closeDialogBtn.addEventListener("click", () => {
        bookingModal.close();
    });

    // Form di inseritmento nota
    noteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const notaInserita = noteInput.value;

        allBookings[index].status = "Rifiutata";
        allBookings[index].adminNote = notaInserita;
        sessionStorage.setItem("clientBookings", JSON.stringify(allBookings));
        alert("Nota inserita con successo. Ora sarà visibile anche al cliente con l'indicazione del rifiuto della prenotazione.");
        noteForm.reset();
        bookingModal.close();

        renderAllBookings();
    })

    receivedBookingList.appendChild(article);
}

// Render di tutte le prenotazioni
function renderAllBookings() {
    receivedBookingList.innerHTML = "";

    if(allBookings.length === 0) {
        receivedBookingList.innerHTML = "Nessuna prenotazione presente.";
        return;
    }

    allBookings.forEach((booking, index) => {
        renderBookingCard(booking, index);
    });
}

renderAllBookings();