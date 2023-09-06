const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Verbindung zur MongoDB-Datenbank herstellen
mongoose.connect("mongodb://root:example@mongo_container:27017/?authMechanism=DEFAULT", {
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
    // Restlicher Code hier...
});

// Restlicher Code hier...

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
