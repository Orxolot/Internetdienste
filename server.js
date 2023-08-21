const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Verbindung zur MongoDB-Datenbank herstellen
mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Verbindungsfehler:"));
db.once("open", () => {
  console.log("Verbindung zur MongoDB hergestellt");
});

// Mongoose-Schema für Benutzerdaten definieren
const userSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  message: String,
});

const User = mongoose.model("User", userSchema);

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Fehler beim Abrufen der Benutzer:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await User.findOne({ id: userId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Benutzer nicht gefunden" });
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des Benutzers:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

app.post("/users", async (req, res) => {
  const newUser = new User({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    message: req.body.message,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Fehler beim Speichern des Benutzers:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
