// api_connector.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('kontakt-formular');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const vorname = form.vorname.value;
        const nachname = form.nachname.value;
        const email = form.email.value;
        const nachricht = form.nachricht.value;
        
        const userData = {
            firstName: vorname,
            lastName: nachname,
            email: email,
            message: nachricht,
        };
        
        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                const newUser = await response.json();
                console.log('Neuer Benutzer erstellt:', newUser);
                // Hier kannst du weitere Aktionen ausführen, z.B. eine Erfolgsmeldung anzeigen
            } else {
                console.error('Fehler beim Erstellen des Benutzers');
                // Hier kannst du eine Fehlermeldung anzeigen
            }
        } catch (error) {
            console.error('Fehler beim Kommunizieren mit dem Server:', error);
            // Hier kannst du eine Fehlermeldung anzeigen
        }
    });
});
