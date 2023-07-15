# Offizielles Node.js-Image als Basis
FROM node:latest

# Arbeitsverzeichnis im Container
WORKDIR /var/www/html

# Kopiert die package.json und package-lock.json in den Container
COPY package*.json ./

# Installiert die Abhängigkeiten
RUN apt-get update && \
    apt-get install -y nginx && \
    npm install -g fs body-parser

# Manuelle Installation von 'express'
RUN npm install express

# Kopiert den Rest des Codes in den Container
COPY . /var/www/html

# Setzt den Port, den die Anwendung im Container öffnet
EXPOSE 3000
EXPOSE 80

# Starte die Anwendung beim Start des Containers
CMD ["sh", "-c", "service nginx start && node server.js"]
