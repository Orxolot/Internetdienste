const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Parser für Anforderungen mit Content-Type "application/x-www-form-urlencoded"
app.use(bodyParser.urlencoded({ extended: false }));

// Parser für Anforderungen mit Content-Type "application/xml"
app.use(bodyParser.text({ type: 'application/xml' }));

// Endpunkt für das Verarbeiten des Kontaktformulars
app.post('/kontakt', (req, res) => {
  const xmlData = req.body;
  const email = req.body.email; // Annahme: Das Feld "email" enthält die E-Mail-Adresse

  // Erstellen Sie den Dateinamen basierend auf der E-Mail-Adresse
  const fileName = email.replace(/[^a-z0-9]/gi, '_') + '.xml';

  // Speichern Sie das XML auf dem Server
  const filePath = '\\\\SRV01\\contact\\' + fileName; // Beachten Sie die doppelten Backslashes

  fs.writeFile(filePath, xmlData, (err) => {
    if (err) {
      console.error('Fehler beim Speichern des Kontakt-XML.', err);
      res.status(500).send('Fehler beim Speichern des Kontakt-XML.');
    } else {
      console.log('Kontakt-XML erfolgreich gespeichert.');
      res.status(200).send('Kontakt-XML erfolgreich gespeichert.');
    }
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
