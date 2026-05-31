# Web Development Project - Riccardo Padoan (s00035024)

The project focuses on creating a Web App for a restaurant called "San Martino" in which users, through a login page, can create new reservations and check their statuses actively.

## Features

### Client pages

- A dashboard for the client where the user can create new reservations;
- A section connected to OpenWeather that shows the user the weather conditions near the restaurant;
- A profile that shows the user their username and password. On this page, the user can change their password;

### Restaurant owner pages

- A dashboard for the restaurant owner that lets them accept or reject the users' reservations;

### Other features

- A login page with two demo users: one for the client and one for the admin (restaurant owner);
- A registration page that creates a new user who can log in through the portal;
- A simple password security check using an HTML pattern with:
  - Minimum password length of 8;
  - Maximum password length of 16;
  - A set of minimum characters which are:
    - At least 1 uppercase letter;
    - At least 1 lowercase letter;
    - At least 1 number;
    - At least 1 special character;
- The use of sessionStorage throughout the pages to save data in the browser. This data is used for the currently logged-in user, the registered user, and the currently saved bookings, so only the logged-in user can view their reservations and not those of others;

## Project Structure

```
PROJECT/
├── Assets/
│   ├── CSS/
│   ├── HTML/
│   │   ├── Cliente/
│   │   │   ├── cliente-dashboard.html   # Client dashboard
│   │   │   └── cliente-profile.html     # Client profile page
│   │   ├── Ristoratore/                 # Contains restaurant owner pages
│   │   └── registrazione.html           # New user registration page
│   └── JS/
│       ├── Cliente/
│       │   ├── cliente-dashboard.js     # Logic for the client dashboard (weather conditions, new reservation)
│       │   └── cliente-profile.js       # Logic for the client profile (change current password)
│       ├── Ristoratore/                 # Contains restaurant owner logic
│       ├── login.js                     # Login logic for the index page
│       └── registrazione.js             # Logic for the registration page (create new client user)
├── index.html                           # User landing page (login)
└── README.md                            # Project documentation
```

## How to run it locally with Five Server

1. Download the whole project locally;
2. Open it with VS Code and position yourself within the folder "project" (like in the schema above) as its root folder;
3. Open index.html with the Five Server extension and test it using the below flows.

## User flow

### Logging in and registering

1. The user lands on the index.html page and logs into the portal by inserting the demo credentials written below the form and then by clicking the button "**Accedi**";
    1. If the user wants to create a new account, they can do so by clicking the appropriate link with the underlined text "creazione account";
    2. By clicking this link, the user will be redirected to the new registration form page;
    3. The user must fill out all the fields, adhering to the rules for creating a correct password and agreeing to the terms (by clicking the checkbox);
    4. After all the fields are inserted, the user can click the "**Registrati**" button, which saves the new credentials and redirects the user to the landing page;
    5. Now the user can log in to the portal with the new credentials.

### Check the restaurant weather conditions

 1. After the login, the user is redirected to their dashboard;
 2. Within this page, they can check the weather conditions of the restaurant (temperature/general description with an image/humidity percentage) by viewing the appropriate section (which is named "**Meteo del ristorante**").

### Check the current created reservations and create new ones

1. On the dashboard page, the user can view their currently created reservations (in the section named "Le tue prenotazioni"). If no reservations are present, none will be displayed;
2. If the user wants to create a new reservation, they must click the button named "Nuova prenotazione" (in the section with the same name);
3. After clicking, the user has to insert data into the given form;
4. When everything is inserted, the user clicks the "**Conferma prenotazione**" button to create the new reservation.

### Change the user password

1. By clicking the link in the navbar called **Il mio Profilo**, the user can access their profile page;
2. On this page, the user can see (but not modify) their username and email;
3. On this page, there is a button called "Modifica la tua password" that lets the user modify their password by creating a new one. The user MUST follow the guidelines to create a new password;
4. When both the password and confirm password fields are correct, the user clicks the button "**Conferma modifica password**" to save the new password;
5. After the new password has been set, the user is redirected to the login landing page and has to log in again with the new password.

## Restaurant owner flow

### Accepting or rejecting reservations

1. After logging in with their credentials, the restaurant owner can decide to accept or reject the clients' reservations (they are visible in the section named "**Prenotazioni ricevute dai clienti**"). In the reservations section, the username of the client who created the reservation itself is visible;
2. If rejected, the restaurant owner will be prompted to insert a reason for the rejection. By pushing the confirm button within the pop-up form, the note will be inserted inside the appropriate section of the client reservation (which is visible for the client too);
3. After confirming or rejecting the reservation, the buttons to accept or reject the reservation will not be visible anymore.
