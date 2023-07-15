const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Statische Dateien ausliefern
app.use(express.static(path.join(__dirname, 'public')));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// POST-Anfragen für jedes Formular abfangen
app.post('/kontakt', (req, res) => {
  const { vorname, nachname, email, nachricht } = req.body;

  // Speichern der Daten in einer Datei
  const data = `Vorname: ${vorname}\nNachname: ${nachname}\nE-Mail: ${email}\nNachricht: ${nachricht}\n\n`;
  fs.appendFile(path.join(__dirname, 'data/kontakt.txt'), data, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.post('/bestellung', (req, res) => {
  const { vorname, nachname, email, username, passwort, url } = req.body;

  // Speichern der Daten in einer Datei
  const data = `Vorname: ${vorname}\nNachname: ${nachname}\nE-Mail: ${email}\nUsername: ${username}\nPasswort: ${passwort}\nURL: ${url}\n\n`;
  fs.appendFile(path.join(__dirname, 'data/bestellung.txt'), data, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Starten des Servers
app.listen(port, () => {
  console.log(`Server gestartet auf Port ${port}`);
});
