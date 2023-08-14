const express = require("express");
const app = express();
const fs = require("fs");
const yaml = require("js-yaml");
const PORT = process.env.PORT || 3000;

app.use(express.json());

const usersFilePath = "users.yaml";

// Dummy-Datenbank für Benutzer
let users = [];

// Lade Benutzerdaten aus der YAML-Datei
try {
    const fileContents = fs.readFileSync(usersFilePath, "utf8");
    users = yaml.safeLoad(fileContents);
} catch (error) {
    console.error("Fehler beim Laden der Benutzerdaten:", error);
}

// Abfrage aller Benutzer
app.get("/users", (req, res) => {
    res.json(users);
});

// Zeige einzelnen Benutzer
app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "Benutzer nicht gefunden" });
    }
});

// Hinzufügen eines neuen Benutzers
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        message: req.body.message
    };

    users.push(newUser);

    // Speichere Benutzerdaten in der YAML-Datei
    try {
        fs.writeFileSync(usersFilePath, yaml.safeDump(users), "utf8");
    } catch (error) {
        console.error("Fehler beim Speichern der Benutzerdaten:", error);
    }

    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
