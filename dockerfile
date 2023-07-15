# Stage 1: Node.js-Build-Container
FROM node:14-alpine as build

WORKDIR /app

# Abhängigkeiten installieren
COPY package.json package-lock.json ./
RUN npm install

# Quellcode kopieren
COPY server.js ./

# Stage 2: NGINX-Container
FROM nginx:alpine

# NGINX-Konfiguration anpassen
COPY default.conf /etc/nginx/conf.d/default.conf

# Statische Dateien kopieren
COPY public /usr/share/nginx/html

# Port freigeben
EXPOSE 80

# Server starten
CMD ["nginx", "-g", "daemon off;"]
