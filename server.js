const nodemailer = require('nodemailer');
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
  const { vorname, nachname, email, nachricht } = req.body;

  // E-Mail-Konfiguration
  const transporter = nodemailer.createTransport({
    service: 'GMX', // Ändern Sie den E-Mail-Dienst entsprechend Ihrer Konfiguration
    auth: {
      user: 'tolu_lknet@gmx.ch', // Ihre E-Mail-Adresse
      pass: 'fasdG-ERa43-51gs' // Ihr E-Mail-Passwort
    }
  });

  // E-Mail-Inhalt
  const mailOptions = {
    from: 'tolu_lknet@gmx.ch', // Absender-E-Mail-Adresse
    to: 'tolu@lknet.ch', // Empfänger-E-Mail-Adresse
    subject: 'Kontaktanfrage von LKNet', // Betreff der E-Mail
    text: `
      Vorname: ${vorname}
      Nachname: ${nachname}
      E-Mail: ${email}
      
      Nachricht:
      ${nachricht}
    `
  };

  // E-Mail senden
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Fehler beim Senden der Kontakt-E-Mail.', error);
      res.status(500).send('Fehler beim Senden der Kontakt-E-Mail.');
    } else {
      console.log('Kontakt-E-Mail erfolgreich gesendet.');
      res.status(200).send('Kontakt-E-Mail erfolgreich gesendet.');
    }
  });
});

// Endpunkt für das Speichern des Bestellformulars
app.post('/bestellung', (req, res) => {
  const xmlData = req.body;

  // Speichern Sie das XML auf dem Server
  fs.writeFile('pfad/zur/bestellung.xml', xmlData, (err) => {
    if (err) {
      console.error('Fehler beim Speichern der Bestellungs-XML.', err);
      res.status(500).send('Fehler beim Speichern der Bestellungs-XML.');
    } else {
      console.log('Bestellungs-XML erfolgreich gespeichert.');
      res.status(200).send('Bestellungs-XML erfolgreich gespeichert.');
    }
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
