# Web Development Project - Riccardo Padoan

The project focuses on creating a Web App for a restaturant called "San Martino" in which users, through a login page, can create new reservations and check their statuses actively.

## Features

### Client pages

- A dashboard for the client in which this user can create new reservations;
- A section to OpenWeather that shows the user the weather conditions near the restaurant;
- A profile that shows the user its username and password. In this page the user can change its password;

### Restaurant owner pages

- A dashboard for the restaurant owner that let's him accept or reject the users' reservations;

### Other features

- A login page with two demo users: one for the user and one for the admin (restaurant owner);
- A registration page, that create a new user that can next login through the portal;
- A simple password security check with a HTML pattern with:
  - Minimum password lenght of 8;
  - Maximum password lenght of 16;
  - A se of minimum characters which are:
    - At least 1 uppercase letter;
    - At least 1 lowecase letter;
    - At least 1 number;
    - At least 1 special number;
- The use of sessionStorage through the pages that saves data in the browser. This data is used for the current logged user and the current saved bookings so only the current logged user can view its reservations and not the others;

## Project Structure

```
Project/
    ├── Assets/
    │   ├── CSS/
    │   │   └── style.css              # CSS style used globally on all HTML files
    │   ├── HTML/
    │   │   ├── Cliente/
    │   │   │   ├── cliente-dashboard.html.  # Client dashboard
    │   │   │   └── cliente-profile.html.    # Client profile page
    │   │   ├── Ristoratore/
    │   │   │   └── ristorante-dashboard.html # Restaurant owner dashboard
    │   │   └── registrazione.html  # New user registration page
    │   ├── JS/
    │   │   ├── Cliente/
    │   │   │   ├── cliente-dashboard.js. # Logic for the client dashboard (weather conditions, new reservation)
    │   │   │   └── cliente-profile.js  # Logic for the client profile (change current password)
    │   │   ├── Ristoratore/
    │   │   │   └── ristorante-dashboard.js  # Logic for the restaurant owner dashboard (accept or reject user reservations)
    │   │   ├── registrazione.js  # Logic for the registration page (create new client user)
    │   │   └── login.js   # Login logic for the index page
    │   └── MD/
    │       └── README.md
    └── index.html  # User landing page (login)
```

## User flow

### Login in and registering

1. The user lands at the index.html page and logs in the portal by inserting the demo credentials written below the form and then by clicking the button "**Accedi**";
    1. If the user wants to create a new user, it can create a new user by clicking the approriate link with the text "**creazione account**" which is underlined;
    2. By clicking this link, the user will bre redirected to the new registration form page;
    3. The user must compile all of the labels by asserting the rules to create a correct password and by abiding to the terms (clicking the checkbox);
    4. After all the fields are inserted, the user can click the "**Registrati**" button which saves the new credentials and redirects the user to the landing page;
    5. Now the user can login to the portal with the new credentials.

### Check the restaurant weather conditions

 1. After the login, the user is redirected to its dashboard;
 2. Within this page, it can check the weather condtions of the restauran (temperature/general description/humidity percentage) by viewing the appropriate section (which is named "**Meteo del ristorante**").

### Check the current created reservations and create new ones

1. In the the same dashboard page, the user can view its current created reservations (section named "**Le tue prenotazioni**"). If no reservations is present, no reservation will be displayed;
2. If the user wants to create a new reservation it has to click the button named "**Nuova prenotazione**" (in the section named liked the button);
3. After the click, the user has to insert data in the given form;
4. When everyhing is inserted, the user clicks the "**Conferma prenotazione**" button to create the new rervation.

### Change the user password

1. By clicking the link in the navbar called "**Il mio Profilo**" the users can access its profile page;
2. In this page the user can see (but not modify) its username and its email;
3. In the page there is a button called "**Modifica la tua password**" that let's the user modify the password by creating a new one. The user **MUST** follow the guidelines to create a new password;
4. Wehn both the password and confirm password fields are correct, the user clicks the button "**Conferma modifica password**" to save the new password;
5. After the new password has been set, the user is been redirected to the login landing page and has to relogin again with the new password.

## Restaurant owner flow

### Accepting or rejecting reservations

1. After logging with the credentials, the restaurant owner can decide to accept or reject the clients' reservations (they are visible in the section named "**Prenotazioni ricevute dai clienti**"). In the reservations section, it's visible the client username which created the reservation itself;
2. If rejected, the restaurant owner will be prompted to insert a motivation for the rejection. By pushing the conferm button within the pop up form, the note will be inserted inside the appropriate section of the client reservation (which is visible for the client too);
3. After confirming or rejecting the reservation, the buttons for choosing the reservation will not be visible anymore.
