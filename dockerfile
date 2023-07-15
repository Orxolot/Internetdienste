# Basisimage
FROM httpd:latest

# Kopiere die Webseite in das Apache-Dokumentenverzeichnis
COPY . /usr/local/apache2/htdocs/

# Kopiere das JavaScript-Script in das Apache-Konfigurationsverzeichnis
COPY server.js /usr/local/apache2/conf/

# Aktiviere das JavaScript-Modul in der Apache-Konfiguration
RUN echo "LoadModule jss_module /usr/local/apache2/conf/server.js" >> /usr/local/apache2/conf/httpd.conf
