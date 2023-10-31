## Prerequisites

node v12.14

Create a google service account and associate it with Google Drive and Google Sheet services:

https://developers.google.com/workspace/guides/create-credentials?hl=fr#service-account

Place the google credentials file at the root.

Place client and server folders in the same folder and name them "client" and "server".

## Available Scripts

In the project directory, you can run:

### `npm install` : Installation

Runs the installation of all the necessary modules

### `npm run dev` : Launch

Runs the server at the configured port : http://localhost:{port}<br />

### `npm run build` : Deployment

Builds the app for production to the `./server/public` folder.<br />

## Environment variable

### .env (development)
PORT = numéro de port (par ex : 4000)<br />
FRONTEND_URI : app front url<br />
FRONTEND_URL_SECURE : app secured front url<br />
GOOGLE_APPLICATION_CREDENTIALS : google credentials file name (ex: “google-credentials.json”)<br />
SECRET_SESSION : This is the secret used to sign the session ID cookie. This can be either a string for a single secret, or an array of multiple secrets.<br />
SPREADSHEET_MASTER_ID : id of the google sheet hosting the calculation model (https://docs.google.com/spreadsheets/d/{id})<br />

### .env.production (production)
Same with production urls

## Deployment

### `npm run build`


