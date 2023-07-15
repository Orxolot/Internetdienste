const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parser für Anforderungen mit Content-Type "application/x-www-form-urlencoded"
app.use(bodyParser.urlencoded({ extended: false }));

// Endpunkt für das Verarbeiten des Formulars
app.post('/senden', (req, res) => {
  const { vorname, nachname, email, nachricht } = req.body;

  // E-Mail-Konfiguration
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Ändern Sie den E-Mail-Dienst entsprechend Ihrer Konfiguration
    auth: {
      user: 'ihre-email@gmail.com', // Ihre E-Mail-Adresse
      pass: 'ihr-email-passwort' // Ihr E-Mail-Passwort
    }
  });

  // E-Mail-Inhalt
  const mailOptions = {
    from: 'ihre-email@gmail.com', // Absender-E-Mail-Adresse
    to: 'ziel-email@example.com', // Empfänger-E-Mail-Adresse
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
      console.error('Fehler beim Senden der E-Mail.', error);
      res.status(500).send('Fehler beim Senden der E-Mail.');
    } else {
      console.log('E-Mail erfolgreich gesendet.');
      res.status(200).send('E-Mail erfolgreich gesendet.');
    }
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
