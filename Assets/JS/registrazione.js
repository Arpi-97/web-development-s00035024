/* File JS per la registrazione di un nuovo utente. Una volta compilati i compi, viene mostrato un altert di conferma */

/* Inizializzazione variabili */
const formRegister = document.getElementById("register-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("confirm-password");

// Controllo dei campi password e passwordConfirm per verifica di loro uguaglianza. Viene esguito fuori dalla funzione di submit
const passwordChecks = () => {
     if (password.value !== passwordConfirm.value) {
         passwordConfirm.setCustomValidity("Le password non corrispondono");
     } else {
         passwordConfirm.setCustomValidity("");
     }
     formRegister.reportValidity();
 };

/* Funzione per la registrazione */
formRegister.addEventListener("submit", function(event) {
    event.preventDefault();
    // Richiamo della funzione di controllo password. Una volta almeno viene eseguita, poi viene eseguita costantemente per ogni input
    passwordChecks();
    passwordConfirm.addEventListener("input", passwordChecks);

    // Funzione per costante controllo di validita del formRegister. Se vera, non viene eseguita sennò mostra errore
    if(!formRegister.checkValidity()) {
        return;
    }

    // Oggetto nuovo utente che verrà salvato
    const newUser = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        role: "cliente"
    };

    // Salvataggio dati su sessionStorage per richiamo su altre pagine
    sessionStorage.setItem("registeredUser", JSON.stringify(newUser));

    // Mostra modale di conferma registrazione
    function showSuccessModal() {
        const successModal = document.getElementById("success-modal");
        const successModalText = successModal.querySelector("p");
        const closeModalButton = successModal.querySelector("button");
        successModalText.textContent = `Registrazione avvenuta con successo per l'utente ${newUser.username}. Premi il tasto chiudi per ritornare alla pagina di login.`;
        successModal.showModal();
        closeModalButton.addEventListener("click", () => {
            successModal.close();
            window.location.href = "../../index.html";  // Rimando a pagina di login dopo chiusura modale
        });
    }
    showSuccessModal();

});