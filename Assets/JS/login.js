/* Fle JS per la funzione di login al portale */

const formLogin = document.getElementById("login-form");

// Inizializzazione variabili demo
const demoClient = {
    username: "cliente",
    password: "Zw#T8LiXC$Obr$&N",
    email: "cliente@cliente.it",
    role: "cliente"
}

const demoRistoratore = {
    username: "ristoratore",
    password: "W@SPYigXx%vQCS46",
    email: "ristoratore@ristoratore.it",
    role: "admin"
}

// Utente passato da sessionStorage
const registeredUser = JSON.parse(sessionStorage.getItem("registeredUser"));

// Funzione di login
formLogin.addEventListener("submit", function(event) {
    event.preventDefault();
    const availableUsers = [demoClient, demoRistoratore]; // Array di utenti disponibili costruiti con quielli sopra hardcoded

    // Push di registeredClient passato dalla pagina di registrazione (se presente l'utenza aggiunta dalla registrazione) nell'array di availableUsers. Se non presente, non viene aggiunto nulla
    if(registeredUser) {
        availableUsers.push(registeredUser);
    }

    console.log(availableUsers);

    // Variabili del formLogin
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    console.log(`Username inserito: ${username.value}`);
    console.log(`Password inserita: ${password.value}`);
    // Variabile utente trovato
    let foundUser = null;

    // Ciclo per trovare l'utente
    for (const user of availableUsers) {
        if (user.username === username.value.trim() && user.password === password.value.trim()) {
            foundUser = user;
            console.log(foundUser);
            break;
        }
    }
    // Se le credenziali non sono corrette, allora mostro un messaggio all'utente
    if(!foundUser) {
        alert("Username o password errati. Si prega di riprovare.");
        return;
    }

    // Mostra modale di conferma login con successo
    function showSuccessModal() {
        const successModal = document.getElementById("success-modal");
        const successModalText = successModal.querySelector("p");
        const closeModalButton = successModal.querySelector("button");

        // Salvataggio dati utente loggato. Verrano usati in seguito, soprattuto per pagina cliente
        sessionStorage.setItem("loggedUser", JSON.stringify(foundUser)); 

        // Verifica ruolo utente loggato
        if(foundUser.role === "cliente") {
            successModalText.textContent = `Login avvenuto con successo per l'utente ${foundUser.username}. Premi il tasto "Chiudi" per accedere alla tua dashboard.`;
            successModal.showModal();
            closeModalButton.addEventListener("click", () => {
                successModal.close();
                window.location.href = "./Assets/HTML/Cliente/cliente-dashboard.html";
            }, {once: true});
        }else {
            successModalText.textContent = `Login avvenuto con successo per l'utente ${foundUser.username}. Premi il tasto "Chiudi" per accedere alla tua dashboard.`;
            successModal.showModal();
            closeModalButton.addEventListener("click", () => {
                successModal.close();
                window.location.href = "./Assets/HTML/Ristoratore/ristoratore-dashboard.html";
            }, {once: true});
        }
    }
    showSuccessModal();
});