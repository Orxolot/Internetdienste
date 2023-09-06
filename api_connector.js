document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('kontakt-formular');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const vorname = form.querySelector('[name="vorname"]').value;
        const nachname = form.querySelector('[name="nachname"]').value;
        const email = form.querySelector('[name="email"]').value;
        const nachricht = form.querySelector('[name="nachricht"]').value;

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
            } else {
                console.error('Fehler beim Erstellen des Benutzers');
            }
        } catch (error) {
            console.error('Fehler beim Kommunizieren mit dem Server:', error);
        }
    });
});
