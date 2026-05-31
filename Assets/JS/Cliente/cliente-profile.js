/* JS per stampa dati del cliente e  modifica password */

// Inizializzazione variabili
const username = document.getElementById("username");
const email = document.getElementById("email");
const formChangePassword = document.getElementById("form-change-password");
const btnChangePassword = document.getElementById("change-password");
const modalConfirmPassword = document.getElementById("new-password");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// Utenza di default del cliente
const demoClient = {
    username: "cliente",
    password: "Zw#T8LiXC$Obr$&N",
    email: "cliente@cliente.it",
    role: "cliente"
};

// Vengono passati i dati del cliente regisytrato dalla registrazione oppure quelle di default in base a chi si è loggato
let registeredUser = JSON.parse(sessionStorage.getItem("registeredUser")) || demoClient;  

// Vengono passati anche i dati dell'utenza che si è attualmente loggata
const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

// Stampa dati utente
username.value = loggedUser.username;
username.style.color = "gray";
email.value = loggedUser.email;
email.style.color = "gray";

// Controllo dei campi password e confirmPassword per verifica di loro uguaglianza. Viene esguito fuori dalla funzione di submit
const passwordChecks = () => {
     if (password.value !== confirmPassword.value) {
         confirmPassword.setCustomValidity("Le password non corrispondono");
     } else {
         confirmPassword.setCustomValidity("");
     }
     formChangePassword.reportValidity();
 };

 // Apetura modale di conferma
btnChangePassword.addEventListener("click", (event) => {
    event.preventDefault();
    modalConfirmPassword.showModal();
});

// Elabora il salvataggio della nuova password
formChangePassword.addEventListener("submit", (event) => {
    // Richiamo delle funzioni di check password constanemente
    passwordChecks();
    confirmPassword.addEventListener("input", passwordChecks);
    // Funzione per costante controllo di validita del formChangePassword. Se vera, non viene eseguita sennò mostra errore
    if(!formChangePassword.checkValidity()) {
        return;
    }
    event.preventDefault();
    // Salva la nuova password
    registeredUser.password = confirmPassword.value.trim();
    sessionStorage.setItem("registeredUser", JSON.stringify(registeredUser));
    alert("Password modificata con successo per la propria utenza. Ora si verrà reindirizzati nuovamente alla pagina di login.");
    modalConfirmPassword.close();
    window.location.href = "../../../index.html";
});